import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-[#121e28] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left side - Name */}
        <div className="text-xl font-bold">
          <Link href="/">Anugrah Ilhami Rizki</Link>
        </div>

        {/* Right side - Menu */}
        <div className="space-x-8">
          <Link href="#home" className="hover:text-gray-300">Home</Link>
          <Link href="#about" className="hover:text-gray-300">About</Link>
          <Link href="#projects" className="hover:text-gray-300">Projects</Link>
          <Link href="#contacts" className="hover:text-gray-300">Contacts</Link>
        </div>
      </div>
    </nav>
  )
}