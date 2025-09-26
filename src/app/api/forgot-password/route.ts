import User from "@/models/user.model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
     return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }
    const user = await User.findOneAndUpdate({ email }, { isVerified: false });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`,
      {
        to: email,
        subject: "Verify you email",
        isEmailVerification: false,
      }
    );

    if (res.data.success) {
      return NextResponse.json(
        {
          message: "Verification email sent. Please check your inbox.",
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
