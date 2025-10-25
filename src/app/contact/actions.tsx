"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {

    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const message = formData.get('message') as string | null;

    if (!name || !email || !message) {
        return { success: false, error: "Missing required form fields" };
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
                from: `"${name}" <${email}>`,
                to: `${process.env.EMAIL_RECEIVER}`,
                subject: `${name} sends you a message from your portfolio website`,
                text: `
                    Name: ${name}
                    Email: ${email}
                    Message: ${message}
                `
        };

        await transporter.sendMail(emailFormat);
        return { success: true };
    }
    catch(error) {
        console.error("Email sending error:", error);
        return { success: false, error: "Email sending failed" };
    }
    
}