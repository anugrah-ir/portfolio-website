"use client";

import Form from "next/form";
import { useState } from "react";
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
      className={`self-center rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 hover:cursor-pointer hover:border-neutral-500 hover:text-gray-300 ${
        pending ? "cursor-not-allowed opacity-50" : ""
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
      className="flex w-full flex-col items-start gap-5 rounded-3xl border border-neutral-800 bg-neutral-900 p-5 lg:w-2/5"
    >
      <h2 className="self-center text-xl font-semibold">Fill Out This Form</h2>

      <div className="flex w-full flex-col gap-2">
        <label className="text-xl font-medium">Name</label>
        <input
          name="name"
          type="text"
          required={true}
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          className="w-full rounded-md border border-neutral-700 bg-neutral-900 p-2"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-xl font-medium">Email</label>
        <input
          name="email"
          type="email"
          required={true}
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          className="w-full rounded-md border border-neutral-700 bg-neutral-900 p-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-xl font-medium">Message</label>
        <textarea
          name="message"
          rows={5}
          required={true}
          value={formValues.message}
          onChange={(e) =>
            setFormValues({ ...formValues, message: e.target.value })
          }
          className="w-full resize-none rounded-md border border-neutral-700 bg-neutral-900 p-2"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <SubmitButton />

      {status !== "idle" && (
        <p
          className={`lg:text-md mt-2 self-center text-sm ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </Form>
  );
}
