import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { dbConnect } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: "Email and new password are required", success: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: "User is not verified", success: false },
        { status: 403 }
      );
    }

    if (user.otp !== "reset-password") {
      return NextResponse.json(
        { message: "OTP is not valid for password reset", success: false },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
