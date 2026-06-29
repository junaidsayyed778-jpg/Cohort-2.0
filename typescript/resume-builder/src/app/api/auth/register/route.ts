import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/userModel";
import { ApiResponse } from "@/types/apiTypes";
import { RegisterBody } from "@/types/userTypes";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body: RegisterBody = await req.json();

        const { name, email, mobile, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "All fields are reuired",
                },
                {
                    status: 409,
                },
            );
        }

        const isExisted = await UserModel.findOne({ email });
        if (isExisted)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "User already exist",
                },
                {
                    status: 400,
                },
            );

        const newUser = await UserModel.create({
            name,
            email,
            password,
            mobile,
        });

        const token = generateToken({ userId: newUser._id });

        const response = NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "User registered successfully",
                data: {
                    user: {
                        _id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    },
                },
            },
            {
                status: 201,
            },
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });

        return response;
    } catch (error) {
        console.log("errror in register api", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: error,
            },
            { status: 500 },
        );
    }
}
