import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = (userMessage) => `
    You are a flaschard creator. 
    you want to create a flashcard about ${userMessage}. 
    Please provide the question and answer for the flashcard.

    Return in the following JSON format:
    {
        "flashcard": [{
            "front": str,
            "back": str
            
        }
    }
`;

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("API key is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, generation_config={"response_mime_type": "application/json"});

export async function POST(req) {
  try {
    const data = await req.json();
    const { message: userMessage } = data;

    if (!userMessage) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const prompt = systemPrompt(userMessage);

    const result = await model.generateContent(prompt);
    const response = await result.response.json();
    const flashcards = JSON.parse(response.message.flashcard);
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
}
}