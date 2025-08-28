import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) throw new Error("Token not found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

    return decoded.id;  // 👈 this matches what you signed
  } catch (error: any) {
    throw new Error(error.message);
  }
};
