import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function Footer() {
  return (
    <footer className="mt-auto w-full py-6 sm:py-8">
      {/* Divider line */}
      <div className="mx-auto mb-6 h-px w-11/12 max-w-5xl bg-neutral-800 sm:mb-8"></div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-6 sm:px-6">
        {/* Left side */}
        <p className="text-center text-sm font-medium text-neutral-300 sm:text-left sm:text-base lg:text-lg">
          Want to know more about me?
        </p>

        {/* Right side */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Email */}
          <a
            href={siteData.author.social.email}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/60 transition hover:scale-105 hover:border-white"
          >
            <Image src="/email.png" alt="Email" width={20} height={20} />
          </a>

          {/* WhatsApp */}
          <a
            href={siteData.author.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/60 transition hover:scale-105 hover:border-white"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
          </a>

          {/* GitHub */}
          <a
            href={siteData.author.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/60 transition hover:scale-105 hover:border-white"
          >
            <Image src="/github.png" alt="GitHub" width={20} height={20} />
          </a>

          {/* LinkedIn */}
          <a
            href={siteData.author.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/60 transition hover:scale-105 hover:border-white"
          >
            <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
          </a>

          {/* Instagram */}
          <a
            href={siteData.author.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/60 transition hover:scale-105 hover:border-white"
          >
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
