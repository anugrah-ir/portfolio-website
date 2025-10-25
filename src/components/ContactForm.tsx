"use client";

import Form from "next/form";
import { useState } from "react";
import { sendEmail } from "@/app/contact/actions";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        try {
            const result = await sendEmail(formData);
            if (result?.success) {
                setStatus("success");
                setMessage("✅ Your message has been sent successfully!");
            } else {
                setStatus("error");
                setMessage("❌ Failed to send your message. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("❌ Something went wrong while sending your message.");
        }
    }

    return (

        <Form
            action={handleSubmit}
            className="flex flex-col items-start gap-5 p-5 w-full lg:w-1/2 rounded-3xl bg-neutral-900 border border-neutral-800"
        >

            <h2 className="self-center text-xl font-semibold">
                Fill Out This Form
            </h2>

            <div className="flex flex-col w-full gap-2">
                <label className="text-xl font-medium">Name</label>
                <input
                    name="name"
                    type="text"
                    required={true}
                    className="w-full p-2 bg-neutral-900 rounded-md border border-neutral-700"
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                <label className="text-xl font-medium">Email</label>
                <input
                    name="email"
                    type="email"
                    required={true}
                    className="w-full p-2 bg-neutral-900 rounded-md border border-neutral-700"
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                <label className="text-xl font-medium">Message</label>
                <textarea
                    name="message"
                    rows={5}
                    required={true}
                    className="w-full p-2 resize-none bg-neutral-900 rounded-md border border-neutral-700"
                />
            </div>

            <button
                type="submit"
                className="self-center bg-neutral-800 border border-neutral-600 px-3 py-2 rounded-lg"
            >
                Send Message
            </button>

            {status !== "idle" && (
                <p
                    className={`self-center text-sm lg:text-md mt-2 ${
                        status === "success" ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {message}
                </p>
            )}

        </Form>

    );
}