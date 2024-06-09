import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const accessToken = token.accessToken as string;

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);
    headers.append('Accept', 'application/json');

    // Fetch the list of email message IDs
    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=50', { headers });
    const data = await response.json();

    if (!data.messages) {
      return NextResponse.json([], { status: 204 });
    }

    // Fetch details for each email using the IDs
    const emailPromises = data.messages.map((message: { id: string }) =>
      fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`, { headers })
        .then((res) => res.json())
    );

    const emails = await Promise.all(emailPromises);
    
    return NextResponse.json(emails, { status: 200 });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
