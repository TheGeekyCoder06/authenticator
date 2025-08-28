// utils/sendEmail.ts
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailProps) => {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    // create transporter (using Mailtrap in your case)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4b0bb9f4657617", // move these into .env for security!
        pass: "9427465f6eefd7",
      },
    });

    const subject =
      emailType === "VERIFY"
        ? "Verify your email"
        : "Reset your password";

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    const mailOptions = {
        from: "no-reply@yourapp.com",
        to: email,
        subject,
        html: `
            <p>
            Click <a href="${link}" target="_blank">here</a> to ${
                emailType === "VERIFY" ? "verify your email" : "reset your password"
            } or copy and paste the link below in your browser.
            </p>
            <p>${link}</p>
        `,
    };


    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

