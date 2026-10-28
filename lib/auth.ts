import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function getExpectedToken(secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update("admin-session-v1")
    .digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function verifyAdminSession(): Promise<{
  authorized: boolean;
  requiresConfig?: boolean;
}> {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    // In production, block access if ADMIN_SECRET is not configured
    if (process.env.NODE_ENV === "production") {
      return { authorized: false, requiresConfig: true };
    }
    // In local dev without ADMIN_SECRET, allow access
    return { authorized: true };
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return { authorized: false };
  }

  const expectedToken = getExpectedToken(secret);
  const isValid = safeCompare(sessionCookie.value, expectedToken);

  return { authorized: isValid };
}

export async function loginAdmin(
  passcode: string,
): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return {
      success: false,
      error: "ADMIN_SECRET is not configured on the server.",
    };
  }

  if (typeof passcode !== "string" || passcode.length === 0) {
    return { success: false, error: "Passcode is required." };
  }

  const secretBuffer = Buffer.from(secret);
  const passcodeBuffer = Buffer.from(passcode);

  const isValid =
    secretBuffer.length === passcodeBuffer.length &&
    crypto.timingSafeEqual(secretBuffer, passcodeBuffer);

  if (!isValid) {
    return { success: false, error: "Invalid admin passcode." };
  }

  const token = getExpectedToken(secret);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}
