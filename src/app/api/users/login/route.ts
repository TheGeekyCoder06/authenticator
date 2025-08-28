import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Login request body:", reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password mismatch");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is missing in .env.local");
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful", token, user: tokenData },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
