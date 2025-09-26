import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/connectDB";

export async function POST (req: NextRequest) {
    try {
        await dbConnect()
        const {name, email, password} = await req.json()

        if(!name || !email || !password) {
            NextResponse.json({message: 'All fields are required', success: false}, {status: 400})
        }

         const existingUser = await User.findOne({ email });
         if (existingUser) {
           return NextResponse.json(
             { message: "Email already exists", success: false },
             { status: 400 }
           );
         }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });

           const token = jwt.sign(
             { id: newUser._id, email: newUser.email },
             process.env.JWT_SECRET as string,
             { expiresIn: "7d" }
           );

      const response = NextResponse.json(
        {
          message: "User created successfully",
          success: true,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isVerified: newUser.isVerified,
          },
        },
        { status: 201 }
      );

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      return response;
    } catch (error) {
        console.log(error)
        NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}
