import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-5 py-6">
      {/* White line */}
      <div className="mx-auto mb-6 h-0.5 w-3/4 bg-white"></div>

      {/* Content: centered as a group, but text on left and buttons on right */}
      <div className="mx-auto flex w-1/2 max-w-2xl items-center justify-center gap-6">
        {/* Left side */}
        <p className="text-xl font-medium text-white">
          Want to know more about me?
        </p>

        {/* Right side */}
        <div className="flex gap-4">
          {/* Email */}
          <a
            href="mailto:anugrahilhamirizki@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image
              src="/email.png"
              alt="Email"
              width={20}
              height={20}
            />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/6281332868781"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={20}
              height={20}
            />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/anugrah-ir"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image
              src="/github.png"
              alt="GitHub"
              width={20}
              height={20}
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/anugrah-ir"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition hover:scale-105"
          >
            <Image
              src="/linkedin.png"
              alt="LinkedIn"
              width={20}
              height={20}
            />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/anugrahir"
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
