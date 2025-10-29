import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function Footer() {
  return (
    <footer className="mt-5 py-6">
      {/* White line */}
      <div className="mx-auto mb-6 h-0.5 w-3/4 bg-white"></div>

      {/* Content: centered as a group, but text on left and buttons on right */}
      <div className="mx-auto flex w-1/2 max-w-2xl flex-col items-center justify-center gap-6 lg:flex-row">
        {/* Left side */}
        <p className="text-xl font-medium whitespace-nowrap">
          Want to know more about me?
        </p>

        {/* Right side */}
        <div className="flex gap-4">
          {/* Email */}
          <a
            href={siteData.author.social.email}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image src="/email.png" alt="Email" width={20} height={20} />
          </a>

          {/* WhatsApp */}
          <a
            href={siteData.author.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
          </a>

          {/* GitHub */}
          <a
            href={siteData.author.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image src="/github.png" alt="GitHub" width={20} height={20} />
          </a>

          {/* LinkedIn */}
          <a
            href={siteData.author.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
          </a>

          {/* Instagram */}
          <a
            href={siteData.author.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
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
