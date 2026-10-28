"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { adminLogin } from "@/app/admin/actions";

interface AdminLoginFormProps {
  requiresConfig?: boolean;
}

export default function AdminLoginForm({
  requiresConfig,
}: AdminLoginFormProps) {
  const [passcode, setPasscode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await adminLogin(passcode);
      if (!result.success) {
        setError(result.error || "Authentication failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl sm:rounded-3xl sm:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800/80 shadow-inner">
        <Lock className="h-7 w-7 text-neutral-300" />
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Admin Authentication
        </h2>
        <p className="text-xs text-neutral-400 sm:text-sm">
          Please enter your admin passcode to access site configuration.
        </p>
      </div>

      {requiresConfig ? (
        <div className="w-full rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-xs text-amber-200 sm:text-sm">
          <p className="font-semibold text-amber-300">Configuration Required</p>
          <p className="mt-1">
            The{" "}
            <code className="rounded bg-neutral-900 px-1 py-0.5 font-mono text-amber-200">
              ADMIN_SECRET
            </code>{" "}
            environment variable is not configured. Set it in your deployment
            settings to enable admin access.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="passcode"
              className="text-xs font-medium text-neutral-300 sm:text-sm"
            >
              Admin Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="••••••••••••"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-neutral-400 focus:outline-none disabled:opacity-50 sm:text-base"
            />
          </div>

          {error && (
            <p className="text-center text-xs font-medium text-red-400 sm:text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !passcode}
            className="cursor-pointer rounded-xl border border-neutral-600 bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white transition hover:border-neutral-400 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            {isSubmitting ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>
      )}
    </div>
  );
}
