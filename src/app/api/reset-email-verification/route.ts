import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { dbConnect } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { otp, email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    if (user.otp && user.otp !== otp) {
      return NextResponse.json(
        {
          message: "Invalid OTP",
          success: false,
        },
        { status: 400 }
      );
    }

    if (!user.otpExpiresAt || user.otpExpiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        {
          message: "OTP has expired. Please request a new one.",
          success: false,
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.otp = "reset-password";
    user.otpExpiresAt = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Successfully verified. You can now reset your password.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
