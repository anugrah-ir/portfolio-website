import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center fixed w-screen z-10 h-16 px-5 lg:px-10 backdrop-blur-xs shadow-md shadow-white/10">
      <Link href="/" className="text-xl lg:text-2xl font-bold whitespace-nowrap hover:text-gray-300">Anugrah Ilhami Rizki</Link>
      <div className="flex text-lg lg:text-xl gap-10">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/about" className="hover:text-gray-300">About</Link>
        <Link href="#projects" className="hover:text-gray-300">Projects</Link>
        <Link href="#contacts" className="hover:text-gray-300">Contacts</Link>
      </div>
    </nav>
  )
}