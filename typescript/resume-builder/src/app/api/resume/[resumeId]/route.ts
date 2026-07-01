import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/ResumeModel";
import { ApiResponse } from "@/types/apiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    const { resumeId } = await params;

    const resume = await ResumeModel.findOne({
      _id: resumeId,
      user_id: user.userId,
    });

    if (!resume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 400 },
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in get resume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Somthing went wrong",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    const body = await req.json()

    const { resumeId } = await params;

    const updateResume = await ResumeModel.findByIdAndUpdate({
        _id: resumeId,
        user_id: user.userId,
    }, {
        $set: body
    }, {
        new: true,
        runValidators: true,
    })

    if (!updateResume)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "resume updated failed",
        },
        { status: 404 },
      );

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resume updated successfully",
        data: updateResume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in get updateResume api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Somthing went wrong",
      },
      { status: 500 },
    );
  }
}

