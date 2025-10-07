import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed z-10 w-screen h-16 px-10 backdrop-blur-xs shadow-md shadow-white/10">
      <Link href="/" className="text-2xl font-bold hover:text-gray-300">Anugrah Ilhami Rizki</Link>
      <div className="flex text-xl gap-10">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/about" className="hover:text-gray-300">About</Link>
        <Link href="#projects" className="hover:text-gray-300">Projects</Link>
        <Link href="#contacts" className="hover:text-gray-300">Contacts</Link>
      </div>
    </nav>
  )
}