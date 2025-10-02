import Image from "next/image";

export default function About() {
    return (
        <main className="min-h-screen p-10">
            <h1 className="text-4xl font-bold text-center mb-10">About Me</h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">

                {/* Left column: Profile picture */}
                <div
                    className="w-48 h-48 relative rounded-full bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: "url('/profile-background.png')" }}
                >
                    <Image
                    src="/me.png"
                    alt="My profile picture"
                    fill
                    className="object-cover rounded-full shadow-lg"
                    />
                </div>

                {/* Right column: Intro text */}
                <div>
                    <h2 className="text-3xl font-bold">Anugrah Ilhami Rizki</h2>
                    <p className="mt-4 text-lg max-w-2xl">
                        I'm a Computer Engineering graduate with hands-on experience in Back-End Development.
                        Specializing in developing RESTful APIs using Node.js, Express.js, and relational databases such as PostgreSQL and MySQL.
                        Experienced in some projects such as E-Wallet API, visitor management system, and online learning platform.
                    </p>
                </div>
            </div>

            {/* Skills section */}
            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4 mt-16">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm">HTML</span>
                    <span className="px-4 py-2 bg-violet-700 text-white rounded-full text-sm">CSS</span>
                    <span className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm">Tailwind CSS</span>
                    <span className="px-4 py-2 bg-yellow-500 text-black rounded-full text-sm">JavaScript</span>
                    <span className="px-4 py-2 bg-blue-700 text-white rounded-full text-sm">TypeScript</span>
                    <span className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm">React</span>
                    <span className="px-4 py-2 bg-neutral-950 text-white rounded-full text-sm">Next.js</span>
                    <span className="px-4 py-2 bg-lime-500 text-black rounded-full text-sm">Node.js</span>
                    <span className="px-4 py-2 bg-neutral-50 text-black rounded-full text-sm">Express.js</span>
                    <span className="px-4 py-2 bg-blue-800 text-white rounded-full text-sm">PostgreSQL</span>
                    <span className="px-4 py-2 bg-blue-700 text-white rounded-full text-sm">MySQL</span>
                </div>
            </div>
        </main>
    );
}