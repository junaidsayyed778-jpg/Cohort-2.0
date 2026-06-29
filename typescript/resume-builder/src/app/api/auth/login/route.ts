import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/userModel";
import { ApiResponse } from "@/types/apiTypes";
import { LoginBody } from "@/types/userTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        await connectDB();

        const body: LoginBody = await req.json();

        const { email, password } = body;

        if ( !email || !password) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "All fields are required",
                },
                {
                    status: 409,
                },
            );
        }

        const isExisted = await UserModel.findOne({ email });

        if (!isExisted)
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "User not existed",
                },
                {
                    status: 404,
                },
            );

        const matchPass = isExisted.comparePass(password)

        if(!matchPass) return NextResponse.json<ApiResponse>({
            success: false, message: "Invalid credentials"
        },{status: 401})

        const token = generateToken({ userId: isExisted._id.toString() });

        const response = NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "User registered successfully",
                data: {
                    user: {
                        _id: isExisted._id,
                        name: isExisted.name,
                        email: isExisted.email,
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