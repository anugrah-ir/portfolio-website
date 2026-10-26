import Link from "next/link";
import siteData from "@/data/siteData.json";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 md:py-28 lg:min-h-[70vh]">
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <span className="text-2xl font-bold tracking-tight text-neutral-400 sm:text-4xl lg:text-5xl">
            Hi
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            I&apos;m {siteData.author.nickName}
          </h1>
          <h2 className="text-xl font-semibold text-neutral-300 sm:text-2xl lg:text-4xl">
            I&apos;m a {siteData.author.role}
          </h2>
        </div>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10 sm:gap-4">
          <Link
            href="/project"
            className="rounded-xl border border-white bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 sm:px-6 sm:py-3 sm:text-base"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-neutral-700 bg-neutral-900/80 px-5 py-2.5 text-sm font-medium text-white transition hover:border-neutral-500 hover:bg-neutral-800 sm:px-6 sm:py-3 sm:text-base"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 text-left"
      >
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 shadow-lg backdrop-blur-xs sm:p-8 md:p-10">
          <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
            About Me
          </h2>
          <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">
            {siteData.author.bio}
          </p>
        </div>
      </section>
    </div>
  );
}

