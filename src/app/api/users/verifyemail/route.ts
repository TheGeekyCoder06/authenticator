import { connectToDatabase } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/userModel"
import bcrypt from "bcryptjs"

connectToDatabase()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token } = reqBody

    // find user whose token is still valid
    const user = await User.findOne({
      verifyTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    // compare hashed token with given token
    const isMatch = await bcrypt.compare(user._id.toString(), token)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    // update user
    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    return NextResponse.json({ message: "Email Verified Successfully" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
