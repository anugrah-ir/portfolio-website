"use client";

import Form from "next/form";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/app/contact/actions";
import { z } from "zod";

const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});

type ValidationErrors = {
    name?: string;
    email?: string;
    message?: string;
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`self-center bg-neutral-800 border border-neutral-600 px-3 py-2 rounded-lg hover:border-neutral-500 hover:text-gray-300 hover:cursor-pointer ${
                pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {pending ? "Sending..." : "Send Message"}
        </button>
    );
}

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        message: "",
    });

    async function handleSubmit(formData: FormData) {
        setErrors({});
        setStatus("idle");
        setMessage("");

        const formValues = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        try {
            contactFormSchema.parse(formValues);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: ValidationErrors = {};
                error.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof ValidationErrors;
                    if (!fieldErrors[field]) {
                        fieldErrors[field] = issue.message;
                    }
                });
                setErrors(fieldErrors);
                return;
            }
        }

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
            className="flex flex-col items-start gap-5 p-5 w-full lg:w-2/5 rounded-3xl bg-neutral-900 border border-neutral-800"
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
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className="w-full p-2 bg-neutral-900 rounded-md border border-neutral-700"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            <div className="flex flex-col w-full gap-2">
                <label className="text-xl font-medium">Email</label>
                <input
                    name="email"
                    type="email"
                    required={true}
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className="w-full p-2 bg-neutral-900 rounded-md border border-neutral-700"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div className="flex flex-col w-full gap-2">
                <label className="text-xl font-medium">Message</label>
                <textarea
                    name="message"
                    rows={5}
                    required={true}
                    value={formValues.message}
                    onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                    className="w-full p-2 resize-none bg-neutral-900 rounded-md border border-neutral-700"
                />
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
            </div>

            <SubmitButton />

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