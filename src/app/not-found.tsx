import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/80 text-neutral-400 shadow-xl sm:h-20 sm:w-20">
        <Compass className="h-8 w-8 sm:h-10 sm:w-10 text-neutral-300" />
      </div>

      <span className="mt-6 font-mono text-sm font-semibold tracking-wider text-neutral-400 uppercase sm:text-base">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
        The page you are looking for might have been moved, deleted, or does not exist.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 sm:px-6 sm:py-3 sm:text-base"
        >
          <ArrowLeft size={18} />
          <span>Return Home</span>
        </Link>
        <Link
          href="/project"
          className="rounded-xl border border-neutral-700 bg-neutral-900/80 px-5 py-2.5 text-sm font-medium text-white transition hover:border-neutral-500 hover:bg-neutral-800 sm:px-6 sm:py-3 sm:text-base"
        >
          Explore Projects
        </Link>
      </div>
    </div>
  );
}
