import { generateAiContent } from "@/lib/gemini";
import { ImproveContentBody } from "@/types/aiTypes";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();

    const { content } = body;

    if (!content)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    const prompt = `
You are an expert ATS resume writer, senior technical recruiter, and career coach specializing in resumes for top product-based companies.

Your task is to improve the following resume content while preserving its original meaning and intent.

Resume Content:
${content}

Instructions:
- Rewrite the content to make it professional, polished, and ATS-friendly.
- Preserve the original meaning and factual information.
- Do NOT invent or exaggerate experience, achievements, responsibilities, technologies, certifications, or skills.
- Improve grammar, sentence structure, clarity, and readability.
- Use strong action-oriented and industry-standard language where appropriate.
- Naturally incorporate ATS-friendly keywords relevant to the content.
- Make the writing concise, impactful, and easy for recruiters to scan.
- Remove repetitive words, filler phrases, and unnecessary jargon.
- If the content is already well-written, make only minor improvements.
- Keep the same perspective (first-person or third-person) as the original content.
- Do not add headings, numbering`;

    const result = await generateAiContent(prompt);

    const improveContent = result;
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "improveContent created",
        data: {
          improveContent,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in improveContent api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Somthing went wrong",
      },
      { status: 500 },
    );
  }
}
