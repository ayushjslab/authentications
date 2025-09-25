import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.APP_PASSWORD; 

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text, otp } = await req.json();

    if (!to || !subject || (!text && !otp)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const html = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #111; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.3); border: 1px solid #333;">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #6366f1, #4ade80); color: white; text-align: center; padding: 25px 20px;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">AyushJsLab</h1>
        <p style="margin: 5px 0 0; font-size: 16px;">Email Verification</p>
      </div>

      <!-- Body -->
      <div style="padding: 35px; text-align: center; color: #e5e7eb;">
        <p style="font-size: 16px; margin-bottom: 10px;">Hello,</p>
        <p style="font-size: 16px; margin-bottom: 25px;">
          Thank you for signing up with <strong>AyushJsLab</strong>! Use the OTP below to verify your email:
        </p>

        <!-- OTP -->
        <div style="display: inline-block; background: #111827; color: #4ade80; font-size: 32px; font-weight: 700; padding: 15px 30px; border-radius: 12px; letter-spacing: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); margin-bottom: 25px;">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #9ca3af; line-height: 1.6;">
          This OTP is valid for <strong>10 minutes</strong>. If you didn’t request this, simply ignore this email.
        </p>

        <!-- Button (optional) -->
        <a href="#" style="display: inline-block; margin-top: 25px; padding: 12px 25px; background: #6366f1; color: white; font-weight: 600; border-radius: 10px; text-decoration: none; transition: all 0.3s ease;">
          Verify Email
        </a>
      </div>

      <!-- Footer -->
      <div style="background: #111; padding: 20px; text-align: center; font-size: 12px; color: #777;">
        &copy; ${new Date().getFullYear()} <strong>AyushJsLab</strong>. All rights reserved.
      </div>
    </div>
  </div>
`;


    // Send mail
    await transporter.sendMail({
      from: `"Your App" <${EMAIL_USER}>`,
      to,
      subject,
      text: text || `Your OTP is: ${otp}`,
      html,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
