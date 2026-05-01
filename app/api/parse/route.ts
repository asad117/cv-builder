import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Explicitly setting the API version to 'v1'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text" }, { status: 400 });

const model = genAI.getGenerativeModel({
model: "gemini-3-flash-preview" 
});
const prompt = `
  Extract resume data into this JSON schema:
  {
    "personalInfo": { "fullName": "", "role": "", "email": "", "phone": "", "location": "", "link": "" },
    "summary": "Full professional summary paragraph here",
    "experience": [{ "company": "", "role": "", "date": "", "description": [] }],
    "education": [{ "school": "", "degree": "", "year": "" }],
    "skills": []
  }
  Text: ${text}
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text().trim();
    
    // REGEX: Find the first '{' and last '}' to strip any AI conversation
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON structure");
    
    const cleanJson = JSON.parse(jsonMatch[0]);
    
    return NextResponse.json(cleanJson);
  } catch (error: any) {
    console.error("SDK ERROR:", error);
    // If 1.5 Flash keeps failing, the fallback to 'gemini-pro' is usually the fix
    return NextResponse.json({ error: "Model Access Error: " + error.message }, { status: 500 });
  }
}