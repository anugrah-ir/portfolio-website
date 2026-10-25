import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16 md:flex-row md:justify-between md:py-20 lg:min-h-[80vh]">
        {/* Left Side Text */}
        <div className="flex flex-col items-center space-y-2 text-center sm:space-y-4 md:items-start md:text-left">
          <span className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hi
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            I&apos;m {siteData.author.nickName}
          </h1>
          <h2 className="text-xl font-semibold text-neutral-300 sm:text-2xl lg:text-4xl">
            {siteData.author.role}
          </h2>
        </div>

        {/* Right Side Image */}
        <div className="relative mt-8 flex h-56 w-56 items-center justify-center overflow-hidden rounded-2xl shrink-0 sm:h-72 sm:w-72 md:mt-0 md:h-80 md:w-80 lg:h-96 lg:w-96">
          <Image
            src="/profile-background.png"
            alt=""
            fill
            sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
            preload
            className="rounded-2xl object-cover"
            aria-hidden="true"
          />
          <Image
            src={siteData.author.avatar}
            alt={siteData.author.name}
            fill
            sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
            preload
            className="rounded-full object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 text-left"
      >
        <h2 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl lg:text-5xl">
          About Me
        </h2>
        <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">
          {siteData.author.bio}
        </p>
      </section>
    </div>
  );
}

