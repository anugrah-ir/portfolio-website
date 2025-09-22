import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen max-w-6xl mx-auto px-6">
        {/* Left Side Text */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">Hi</h1>
          <h1 className="text-6xl font-bold">I'm Anugrah</h1>
          <h2 className="text-4xl font-semibold">Back-End Developer</h2>
        </div>

        {/* Right Side Image */}
        <div
          className="mt-10 md:mt-0 relative w-[400px] h-[400px] bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/profile-background.png')" }}
        >
          <Image
            src="/me.png"
            alt="Anugrah"
            width={400}
            height={400}
            className="rounded-lg relative z-10"
          />
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="py-15 max-w-4xl mx-auto px-6 text-left"
      >
        <h2 className="text-5xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          {/* You can replace this with your own text later */}
          A Computer Engineering graduate with hands-on experience in Back-End Development. Specializing in developing RESTful APIs using Node.js, Express.js, and relational databases such as PostgreSQL and MySQL. Experienced in some projects such as E-Wallet API, visitor management system, and online learning platform.
        </p>
      </section>
    </main>
  );
}
