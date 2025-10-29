import Image from "next/image";
import siteData from "@/data/siteData.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 md:flex-row lg:min-h-[90vh] lg:justify-between">
        {/* Left Side Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold lg:text-6xl">Hi</h1>
          <h1 className="text-4xl font-bold lg:text-6xl">
            I'm {siteData.author.nickName}
          </h1>
          <h2 className="text-3xl font-semibold lg:text-4xl">
            {siteData.author.role}
          </h2>
        </div>

        {/* Right Side Image */}
        <div
          className="justofy-center relative mt-10 flex h-[300px] w-[300px] items-center rounded-lg bg-cover bg-center md:mt-0 lg:h-[400px] lg:w-[400px]"
          style={{ backgroundImage: "url('/profile-background.png')" }}
        >
          <Image
            src={siteData.author.avatar}
            alt="Anugrah"
            fill
            className="rounded-full object-cover shadow-lg"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="mx-auto mt-10 max-w-4xl px-6 py-5 text-left lg:mt-0"
      >
        <h2 className="mb-6 text-5xl font-bold">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          {siteData.author.bio}
        </p>
      </section>
    </main>
  );
}
