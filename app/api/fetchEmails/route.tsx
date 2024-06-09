import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const accessToken = token.accessToken as string;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 50,
    });

    if (!response.data.messages) {
      return NextResponse.json([], { status: 200 });
    }

    const emails = await Promise.all(
      response.data.messages.map(async (message) => {
        const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
        return msg.data;
      })
    );

    return NextResponse.json(emails, { status: 200 });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
