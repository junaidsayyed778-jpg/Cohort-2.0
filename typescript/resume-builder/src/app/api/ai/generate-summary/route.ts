import { generateAiContent } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/aiTypes";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateSummaryBody = await req.json();

        const { experienceLevel, skills, jobTitle } = body;

        if (!experienceLevel || !skills || !jobTitle)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Missing fields",
                },
                { status: 400 },
            );
        const prompt = `
You are an expert resume writer and ATS optimization specialist.

Write a professional, ATS-friendly resume summary based on the following information.

Job Title: ${jobTitle}
Skills: ${skills}
Experience Level: ${experienceLevel}

Rules:
- Write in a professional and confident tone.
- Keep the summary between 3-5 sentences.
- Naturally incorporate the provided skills.
- Highlight the candidate's strengths, technical expertise, and career goals.
- Use strong action-oriented language.
- Optimize for Applicant Tracking Systems (ATS) by including relevant industry keywords.
- Do not use bullet points.
- Do not invent experience, achievements, certifications, or technologies not provided.
- Return only the resume summary without any headings, explanations, or markdown.
`;

        const result = await generateAiContent(prompt);

        const summary = result;
        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "Summary created",
                data: {
                    summary,
                },
            },
            { status: 201 },
        );
    } catch (error) {
        console.log("error in generate summary api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Somthing went wrong",
            },
            { status: 500 },
        );
    }
}
