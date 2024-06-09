import { getSession } from "next-auth/react";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req:NextRequest, res:NextResponse) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }
    console.log(token);
    
    const accessToken = token.accessToken;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 50,
    });

    const emails = await Promise.all(
      response.data.messages.map(async (message) => {
        const msg = await gmail.users.messages.get({ userId: "me", id: message.id });
        return msg.data;
      })
    );

    return new NextResponse(JSON.stringify(emails), { status: 200 });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
