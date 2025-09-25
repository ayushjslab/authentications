import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_USER = process.env.EMAIL_USER; // your Gmail
const EMAIL_PASS = process.env.APP_PASSWORD; // App password

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text, html } = await req.json();

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"Your Name" <${EMAIL_USER}>`,
      to,
      subject,
      text,
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
