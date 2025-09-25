import User from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return new Response(
        JSON.stringify({
          message: "Email and OTP are required",
          success: false,
        }),
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", success: false }),
        { status: 404 }
      );
    }
    if (user.isVerified) {
      return new Response(
        JSON.stringify({ message: "User already verified", success: false }),
        { status: 400 }
      );
    }
    if (user.otp !== otp) {
      return new Response(
        JSON.stringify({ message: "Invalid OTP", success: false }),
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.otp = undefined;
    await user.save();
    return new Response(
      JSON.stringify({ message: "OTP verified successfully", success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", success: false }),
      { status: 500 }
    );
  }
}
