import { generateAiContent } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/aiTypes";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateProjectDescriptionBody = await req.json();

        const { experienceLevel, jobTitle, techStack } = body;

        if (!experienceLevel || !jobTitle ||!techStack)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Missing fields",
                },
                { status: 400 },
            );
        const prompt = `
You are a senior software engineer, technical recruiter, and ATS resume expert.

Generate professional resume project descriptions based only on the candidate's information.

Candidate Information:
- Job Title: ${jobTitle}
- Experience Level: ${experienceLevel}
- Tech Stack: ${techStack}

Instructions:
1. Assume the candidate built a realistic project suitable for the given job title and experience level.
2. Generate exactly 5 resume bullet points.
3. Start every bullet point with a strong action verb such as:
   Developed, Built, Designed, Implemented, Integrated, Engineered, Optimized, Created, Deployed, Configured.
4. Naturally incorporate the provided technologies throughout the bullets.
5. Focus on technical implementation, architecture, APIs, authentication, database integration, responsive UI, performance optimization, and deployment where appropriate.
6. Keep each bullet between 15 and 25 words.
7. Do NOT invent unrealistic achievements, percentages, revenue, or user numbers.
8. Make every bullet ATS-friendly by including relevant technical keywords.
9. Avoid repeating the same technology in every bullet.
10. Return ONLY a valid JSON array of strings.
11. Do NOT include markdown, explanations, headings, numbering, or code blocks.

Example Output:

[
  "Developed a responsive full-stack web application using Next.js, TypeScript, and Tailwind CSS.",
  "Implemented secure JWT authentication and role-based access control for protected resources.",
  "Integrated REST APIs with MongoDB to manage application data efficiently.",
  "Optimized application performance through lazy loading, code splitting, and efficient state management.",
  "Containerized the application using Docker and managed source code with Git and GitHub."
]

Return ONLY the JSON array.
`;

        const result = await generateAiContent(prompt);

        const projectDescription = result;
        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "project description created",
                data: {
                    projectDescription,
                },
            },
            { status: 201 },
        );
    } catch (error) {
        console.log("error in generate project description api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Somthing went wrong",
            },
            { status: 500 },
        );
    }
}
