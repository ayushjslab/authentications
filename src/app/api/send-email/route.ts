import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { dbConnect } from "@/lib/connectDB";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { to, subject, isEmailVerification } = await req.json();

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { message: "Invalid email format", success: false },
        { status: 400 }
      );
    }

  const user = await User.findOne({ email: to });
  if (!user)
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 404 }
    );

  if (user.otpExpiresAt && new Date() < user.otpExpiresAt) {
    return NextResponse.json(
      {
        message: "OTP already sent. Please wait before requesting again.",
        success: false,
      },
      { status: 429 }
    );
  }

  const otp = otpGenerator(6);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  user.otp = otp;
  user.otpExpiresAt = expiresAt;
  await user.save();

    const emailVerify = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #111; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.3); border: 1px solid #333;">
          <div style="background: linear-gradient(90deg, #6366f1, #4ade80); color: white; text-align: center; padding: 25px 20px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">AyushJsLab</h1>
            <p style="margin: 5px 0 0; font-size: 16px;">Email Verification</p>
          </div>
          <div style="padding: 35px; text-align: center; color: #e5e7eb;">
            <p style="font-size: 16px; margin-bottom: 10px;">Hello,</p>
            <p style="font-size: 16px; margin-bottom: 25px;">
              Thank you for signing up with <strong>AyushJsLab</strong>! Use the OTP below to verify your email:
            </p>
            <div style="display: inline-block; background: #111827; color: #4ade80; font-size: 32px; font-weight: 700; padding: 15px 30px; border-radius: 12px; letter-spacing: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); margin-bottom: 25px;">
              ${otp}
            </div>
            <p style="font-size: 14px; color: #9ca3af; line-height: 1.6;">
              This OTP is valid for <strong>5 minutes</strong>. If you didn’t request this, simply ignore this email.
            </p>
          </div>
          <div style="background: #111; padding: 20px; text-align: center; font-size: 12px; color: #777;">
            &copy; ${new Date().getFullYear()} <strong>AyushJsLab</strong>. All rights reserved.
          </div>
        </div>
      </div>
    `;

    const resetPassword = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #111; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.3); border: 1px solid #333;">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #f59e0b, #ef4444); color: white; text-align: center; padding: 25px 20px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">AyushJsLab</h1>
        <p style="margin: 5px 0 0; font-size: 16px;">Password Reset OTP</p>
      </div>

      <!-- Body -->
      <div style="padding: 35px; text-align: center; color: #e5e7eb;">
        <p style="font-size: 16px; margin-bottom: 10px;">Hello,</p>
        <p style="font-size: 16px; margin-bottom: 25px;">
          We received a request to reset your password. Use the OTP below to proceed:
        </p>

        <!-- OTP -->
        <div style="display: inline-block; background: #111827; color: #f59e0b; font-size: 32px; font-weight: 700; padding: 15px 30px; border-radius: 12px; letter-spacing: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); margin-bottom: 25px;">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #9ca3af; line-height: 1.6;">
          This OTP is valid for <strong>5 minutes</strong>. If you didn't request a password reset, please ignore this email.
        </p>

        <!-- Optional button -->
        <a href="#" style="display: inline-block; margin-top: 25px; padding: 12px 25px; background: #ef4444; color: white; font-weight: 600; border-radius: 10px; text-decoration: none; transition: all 0.3s ease;">
          Reset Password
        </a>
      </div>

      <!-- Footer -->
      <div style="background: #111; padding: 20px; text-align: center; font-size: 12px; color: #777;">
        &copy; ${new Date().getFullYear()} <strong>AyushJsLab</strong>. All rights reserved.
      </div>
    </div>
  </div>
`;

    await transporter.sendMail({
      from: `"Ayush JS Lab" <${EMAIL_USER}>`,
      to,
      subject,
      text: `Your OTP is: ${otp}`,
      html: isEmailVerification ? emailVerify : resetPassword,
    });

    return NextResponse.json({
      message: "Email sent successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email", success: false },
      { status: 500 }
    );
  }
}

function otpGenerator(length: number = 6): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return otp;
}
