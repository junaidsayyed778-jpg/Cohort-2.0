import { generateAiContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/aiTypes";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: GenerateSkillsBody = await req.json();

        const { experienceLevel, jobTitle } = body;

        if (!experienceLevel || !jobTitle)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Missing fields",
                },
                { status: 400 },
            );
const prompt = `
You are an expert ATS resume writer and technical recruiter.

Generate ONLY the technical skills for the candidate.

Candidate Details:
- Job Title: ${jobTitle}
- Experience Level: ${experienceLevel}

Rules:
1. Return ONLY a valid JSON array.
2. The array must contain strings only.
3. Do NOT wrap the array inside an object.
4. Do NOT use markdown.
5. Do NOT use triple backticks.
6. Do NOT add explanations.
7. Do NOT add introductory text.
8. Do NOT include soft skills.
9. Include 15-20 relevant technical skills.
10. Do not repeat any skill.

Correct Output Example:

[
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Redux Toolkit",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Git",
  "Docker",
  "AWS",
  "Jest"
]

Return ONLY the JSON array.
`;
        const result = await generateAiContent(prompt);

        let skills = result;

        if(typeof skills === "string") {
            try{
                skills = JSON.parse(skills)

            }catch(err){
                console.log( "failed to parse  skills",err )
            }
        }
        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "skills created",
                data: {
                    skills,
                },
            },
            { status: 201 },
        );
    } catch (error) {
        console.log("error in generate skills api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Somthing went wrong",
            },
            { status: 500 },
        );
    }
}
