import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log("Loading...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI || "");
    const body = await req.json();
    const email = body.email;

    if (email) {
      const modelName = process.env.GENERATIVE_AI_MODEL || "gemini-pro"; // Use environment variable or default to "gemini-pro"
      const model = genAI.getGenerativeModel({ model: modelName });

    //   const chatHistory = [
    //     {
    //       role: "user",
    //       parts: ["you are an emails categorizer and categorize my emails based on email subject and strictly give me its category. Here are some samples: These are the categories: Important: Emails that are personal or work-related and require immediate attention. Promotions: Emails related to sales, discounts, and marketing campaigns. Social: Emails from social networks, friends, and family. Marketing: Emails related to marketing, newsletters, and notifications. Spam: Unwanted or unsolicited emails. General: If none of the above are matched, use General"],
    //     },
    //     {
    //       role: "model",
    //       parts: ["okay, I will give you only category"],
    //     },
    //   ];
      
    //   const chat = model.startChat({
    //     history: chatHistory,
    //     generationConfig: {
    //       maxOutputTokens: 100,
    //     },
    //   });
      
        const request = "you are an emails categorizer and categorize my emails based on email subject and strictly tell me only its category fir example 1:marketing. These are the categories: Important: Emails that are personal or work-related and require immediate attention. Promotions: Emails related to sales, discounts, and marketing campaigns. Social: Emails from social networks, friends, and family. Marketing: Emails related to marketing, newsletters, and notifications. Spam: Unwanted or unsolicited emails. General: If none of the above are matched, use General so next are my emails" + email
      const result = await model.generateContent(request);
      const text =  result.response.text();
      console.log("Generated text:", text);

      return NextResponse.json({ data: text }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
