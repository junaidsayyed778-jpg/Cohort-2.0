import { generateAiContent } from "@/lib/gemini";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { resumeText } = body;

    if (!resumeText)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
   const prompt = `
You are an expert Applicant Tracking System (ATS), senior technical recruiter, and resume reviewer.

Analyze the following resume text and evaluate it as if it were being screened by a modern ATS.

Resume Text:
${resumeText}

Instructions:

1. Assign an overall ATS score from 0 to 100.
2. Evaluate the resume in the following categories:
   - Formatting & Readability
   - Relevant Keywords
   - Skills Match
   - Work Experience
   - Projects
   - Education
   - Grammar & Writing
   - Overall Professionalism

3. For each category:
   - Give a score out of 100.
   - Provide a short explanation (1-2 sentences).

4. Identify:
   - Missing technical keywords
   - Missing resume sections (if any)
   - Weak or vague content
   - Grammar or readability issues
   - Repetitive content
   - ATS compatibility issues

5. Provide:
   - 5 actionable suggestions to improve the resume.
   - The top 10 keywords that should be added (if relevant).
   - The resume's strongest strengths.

Rules:
- Base your analysis ONLY on the provided resume.
- Do NOT invent skills, projects, work experience, education, or achievements.
- Be honest and objective.
- Return ONLY valid JSON.
- Do NOT include markdown or explanations.

Return the response in exactly this format:

{
  "overallScore": 86,
  "categoryScores": {
    "formatting": {
      "score": 90,
      "feedback": ""
    },
    "keywords": {
      "score": 82,
      "feedback": ""
    },
    "skills": {
      "score": 88,
      "feedback": ""
    },
    "workExperience": {
      "score": 84,
      "feedback": ""
    },
    "projects": {
      "score": 90,
      "feedback": ""
    },
    "education": {
      "score": 95,
      "feedback": ""
    },
    "grammar": {
      "score": 92,
      "feedback": ""
    },
    "professionalism": {
      "score": 89,
      "feedback": ""
    }
  },
  "strengths": [
    "",
    "",
    ""
  ],
  "missingKeywords": [
    ""
  ],
  "missingSections": [
    ""
  ],
  "issues": [
    ""
  ],
  "suggestions": [
    "",
    "",
    "",
    "",
    ""
  ]
}
`;
    const result = await generateAiContent(prompt);
    const AtsScore = result

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Ats score created",
        data: {
          AtsScore,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in Ats score api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Somthing went wrong",
      },
      { status: 500 },
    );
  }
}
