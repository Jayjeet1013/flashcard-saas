// Using Gemini
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = (userMessage) => `
    You are a flashcard creator. 
    Create flashcards about: ${userMessage}
    Create exactly 10 flashcards.

    CRITICAL: Return ONLY valid JSON without any markdown formatting, code blocks, backticks, or explanatory text.
    
    Required format:
    {"flashcards":[{"front":"Question text here","back":"Answer text here"}]}
`;

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("API key is missing");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
});

// Function to extract JSON from response
function extractJsonFromResponse(responseText) {
  let cleanedText = responseText.trim();

  // Remove various markdown patterns
  cleanedText = cleanedText.replace(/^```json\s*/i, "");
  cleanedText = cleanedText.replace(/^```\s*/, "");
  cleanedText = cleanedText.replace(/\s*```$/, "");

  // Find JSON object boundaries
  const jsonStart = cleanedText.indexOf("{");
  const jsonEnd = cleanedText.lastIndexOf("}");

  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
  }

  return cleanedText.trim();
}

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
    console.log("Generated prompt:", prompt);

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    console.log("Raw response:", responseText);

    // Extract and clean JSON
    const cleanedResponseText = extractJsonFromResponse(responseText);
    console.log("Cleaned response:", cleanedResponseText);

    // Parse JSON
    let flashcards;
    try {
      flashcards = JSON.parse(cleanedResponseText);

      // Validate the structure
      if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
        throw new Error("Invalid flashcard structure");
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Failed text:", cleanedResponseText);

      return NextResponse.json(
        { error: "Failed to parse flashcard response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Error generating response. Please try again." },
      { status: 500 }
    );
  }
}

