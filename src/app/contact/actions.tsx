"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { z } from "zod";
import { isRateLimited } from "../../../lib/rateLimit";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or less"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(255, "Email must be 255 characters or less"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be 5000 characters or less"),
});

export async function sendEmail(formData: FormData) {
  // Honeypot check: automated spam bots fill invisible fields
  const honeypot = formData.get("_gotcha");
  if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
    // Pretend success so bots do not retry
    return { success: true };
  }

  // Rate limiting per IP: max 3 messages per 10 minutes
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const realIp = headerList.get("x-real-ip");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1";

  const rateLimitStatus = isRateLimited(
    `contact:${clientIp}`,
    3,
    10 * 60 * 1000,
  );
  if (rateLimitStatus.limited) {
    return {
      success: false,
      error: `Too many messages sent. Please wait ${rateLimitStatus.resetInSeconds} seconds before trying again.`,
    };
  }

  const rawName = formData.get("name");
  const rawEmail = formData.get("email");
  const rawMessage = formData.get("message");

  if (
    typeof rawName !== "string" ||
    typeof rawEmail !== "string" ||
    typeof rawMessage !== "string"
  ) {
    return { success: false, error: "Missing required form fields" };
  }

  // Prevent CRLF / SMTP header injection by stripping carriage returns and newlines from single-line fields
  const sanitizedName = rawName.replace(/[\r\n]/g, " ").trim();
  const sanitizedEmail = rawEmail.replace(/[\r\n]/g, "").trim();

  const parseResult = contactSchema.safeParse({
    name: sanitizedName,
    email: sanitizedEmail,
    message: rawMessage,
  });

  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]?.message || "Invalid input";
    return { success: false, error: firstError };
  }

  const { name, email, message } = parseResult.data;

  if (
    !process.env.EMAIL_SENDER ||
    !process.env.EMAIL_PASS ||
    !process.env.EMAIL_RECEIVER
  ) {
    console.error("Missing email configuration environment variables");
    return {
      success: false,
      error: "Email service is temporarily unavailable",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailFormat = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_SENDER}>`,
      replyTo: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(emailFormat);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
