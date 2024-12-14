
// Using Gemini
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = (userMessage) => `
    You are a flashcard creator. 
    you want to create a flashcard about ${userMessage}. 
    Please provide the question and answer for the flashcard.
    Create only 10 flashcards

     Return the result strictly in JSON format, without any markdown, backticks, or additional formatting:
    {
        "flashcards": [{
            "front": "Question text here",
            "back": "Answer text here"
        }]
    }
`;

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("API key is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    // Log prompt for debugging
    console.log("Generated prompt:", prompt);

    const result = await model.generateContent(prompt);

    // Log raw result for debugging
    console.log("Raw model result:", result);

    // Ensure result is properly parsed
    const responseText = await result.response.text();

    // Log the response text
    console.log("Response text:", responseText);

    // Attempt to parse JSON if the API returns a JSON string
    let flashcards;
    try {
      flashcards = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing response text:", parseError);
      return NextResponse.json(
        { error: "Failed to parse flashcard response" },
        { status: 500 }
      );
    }

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}


