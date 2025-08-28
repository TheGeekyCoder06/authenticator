import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    let userId;
    try {
      userId = getDataFromToken(request);
    } catch {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 } // Unauthorized
      );
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 } // Internal Server Error
    );
  }
}
