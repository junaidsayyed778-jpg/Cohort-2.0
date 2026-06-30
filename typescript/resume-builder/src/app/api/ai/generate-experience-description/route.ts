import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDescriptionBody } from "@/types/aiTypes";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExperienceDescriptionBody = await req.json();

    const { experienceLevel, jobRole, techStack, yearsOfExperience } = body;

    if (!experienceLevel || !jobRole || !techStack)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    const prompt = `
     You are an expert ATS resume writer, senior software engineer, and technical recruiter with experience hiring candidates for top product-based companies such as Google, Microsoft, Amazon, Meta, Atlassian, and Adobe.

Generate professional work experience descriptions for a resume using the following information:

Job Role: ${jobRole}
Experience Level: ${experienceLevel}
Years of Experience: ${yearsOfExperience}
Tech Stack: ${techStack}

Instructions:

- Generate exactly 5 professional resume bullet points.
- Each bullet should contain between 20 and 30 words.
- Begin every bullet with a strong action verb such as Developed, Designed, Built, Implemented, Optimized, Engineered, Automated, Integrated, Architected, Enhanced, Collaborated, or Led.
- Tailor every responsibility specifically for the provided Job Role.
- The responsibilities must reflect the candidate's Experience Level and Years of Experience.
- Use ONLY the technologies provided in the Tech Stack.
- Never invent technologies that are not listed.
- Include realistic software engineering responsibilities such as:
  - Feature development
  - REST API development
  - Database design and optimization
  - Authentication & Authorization
  - State management
  - Responsive UI development
  - Performance optimization
  - Testing and debugging
  - Code reviews
  - Git collaboration
  - Agile/Scrum development
  - CI/CD or Docker only if included in the tech stack
- Include measurable business or technical impact whenever appropriate (for example: improved performance by 35%, reduced API latency by 40%, increased test coverage by 25%, reduced page load time by 50%).
- Make every bullet ATS-friendly, concise, and achievement-oriented.
- Do not mention company names.
- Do not include headings, numbering, markdown, explanations, or introductory text.
- Avoid repeating the same action verb.
- Ensure the output sounds like genuine industry experience rather than AI-generated text.
- Return ONLY a valid JSON array of strings.

Example Output:

[
  "Developed scalable RESTful APIs using Node.js, Express.js, and MongoDB, reducing API response time by 40% through query optimization and efficient database indexing.",
  "Built responsive and reusable user interfaces using React.js, Redux Toolkit, and Tailwind CSS, improving user engagement and reducing page load time by 35%.",
  "Implemented secure JWT-based authentication and role-based authorization, ensuring protected access to sensitive application resources and user data.",
  "Collaborated with cross-functional teams using Git and Agile methodologies to deliver high-quality features within sprint deadlines while maintaining clean and maintainable code.",
  "Optimized application performance by identifying bottlenecks, refactoring critical modules, and implementing caching strategies, resulting in faster application responsiveness."
]`;

    const result = await generateAiContent(prompt);

    const experienceDescription = result;
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "experience description created",
        data: {
          experienceDescription,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("error in generate experience description api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Somthing went wrong",
      },
      { status: 500 },
    );
  }
}
