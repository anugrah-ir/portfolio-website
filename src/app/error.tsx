"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime application error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-900/50 bg-red-950/30 text-red-400 shadow-xl sm:h-20 sm:w-20">
        <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
      </div>

      <span className="mt-6 font-mono text-sm font-semibold tracking-wider text-red-400 uppercase sm:text-base">
        Something went wrong
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        Application Error
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
        An unexpected error occurred while rendering this page. You can try refreshing or returning to the homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10 sm:gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 sm:px-6 sm:py-3 sm:text-base"
        >
          <RotateCcw size={18} />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-5 py-2.5 text-sm font-medium text-white transition hover:border-neutral-500 hover:bg-neutral-800 sm:px-6 sm:py-3 sm:text-base"
        >
          <Home size={18} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
