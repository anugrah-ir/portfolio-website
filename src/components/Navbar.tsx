"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import siteData from "@/data/siteData.json";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col fixed w-screen z-10">
      {/* Child flex box 1 */}
      <div className="flex flex-row justify-between items-center h-16 px-5 lg:px-10 backdrop-blur-xs shadow-md shadow-white/10">
        <Link
          href="/"
          className="text-xl lg:text-2xl font-medium whitespace-nowrap hover:text-gray-300"
        >
          {siteData.author.name}
        </Link>

        {/* Desktop */}
        {!isMobile && (
          <div className="flex text-xl font-light gap-10">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/projects" className="hover:text-gray-300">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contacts
            </Link>
          </div>
        )}

        {/* Mobile */}
        {isMobile && (
          <div
            className="lg:hidden text-gray-200 hover:text-gray-400 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </div>
        )}
      </div>

      {/* Child flex box 2 — hidden on desktop */}
      {isMobile && menuOpen && (
        <div className="flex flex-col gap-10 pt-10 pl-10 h-screen text-2xl font-light bg-neutral-950">
          <Link href="/" className="hover:text-gray-300" onClick={closeMenu}>
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-300"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/projects"
            className="hover:text-gray-300"
            onClick={closeMenu}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}
