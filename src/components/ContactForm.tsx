"use client";

import Form from "next/form";
import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "@/app/contact/actions";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
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
      className={`w-full self-stretch rounded-lg border border-neutral-600 bg-neutral-800 px-6 py-2.5 text-sm font-medium transition-colors hover:cursor-pointer hover:border-neutral-400 hover:text-white sm:w-auto sm:self-center sm:text-base ${
        pending ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

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
        formRef.current?.reset();
      } else {
        setStatus("error");
        setMessage(
          result?.error
            ? `❌ ${result.error}`
            : "❌ Failed to send your message. Please try again.",
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage("❌ Something went wrong while sending your message.");
    }
  }

  return (
    <Form
      ref={formRef}
      action={handleSubmit}
      className="flex w-full max-w-lg flex-col items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-xl sm:gap-5 sm:rounded-3xl sm:p-7 md:p-8 lg:w-[46%]"
    >
      {/* Honeypot field for automated spam bots */}
      <div className="hidden" aria-hidden="true">
        <input
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <h2 className="self-center text-lg font-semibold sm:text-xl">
        Fill Out This Form
      </h2>

      <div className="flex w-full flex-col gap-1.5 sm:gap-2">
        <label className="text-sm font-medium text-neutral-200 sm:text-base">
          Name
        </label>
        <input
          name="name"
          type="text"
          required={true}
          className="w-full rounded-md border border-neutral-700 bg-neutral-950/60 p-2 text-sm transition-colors focus:border-neutral-400 focus:outline-none sm:p-2.5 sm:text-base"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.name}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1.5 sm:gap-2">
        <label className="text-sm font-medium text-neutral-200 sm:text-base">
          Email
        </label>
        <input
          name="email"
          type="email"
          required={true}
          className="w-full rounded-md border border-neutral-700 bg-neutral-950/60 p-2 text-sm transition-colors focus:border-neutral-400 focus:outline-none sm:p-2.5 sm:text-base"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500 sm:text-sm">{errors.email}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1.5 sm:gap-2">
        <label className="text-sm font-medium text-neutral-200 sm:text-base">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          required={true}
          className="w-full resize-none rounded-md border border-neutral-700 bg-neutral-950/60 p-2 text-sm transition-colors focus:border-neutral-400 focus:outline-none sm:p-2.5 sm:text-base"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500 sm:text-sm">
            {errors.message}
          </p>
        )}
      </div>

      <SubmitButton />

      {status !== "idle" && (
        <p
          className={`mt-2 self-center text-center text-xs sm:text-sm ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </Form>
  );
}
