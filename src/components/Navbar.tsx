"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import siteData from "@/data/siteData.json";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/project", label: "Project" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change during render to avoid cascading renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Close mobile menu if window is resized to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-800/60 bg-neutral-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-lg font-medium whitespace-nowrap transition-colors hover:text-gray-300 sm:text-xl lg:text-2xl"
        >
          {siteData.author.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-base font-light md:flex lg:gap-10 lg:text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-gray-300 ${
                pathname === link.href ? "font-normal text-white" : "text-neutral-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex p-2 text-neutral-300 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav
          className="border-t border-neutral-800/80 bg-neutral-950/95 px-6 py-6 shadow-2xl backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-4 text-lg font-light">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1.5 transition-colors hover:text-gray-300 ${
                  pathname === link.href
                    ? "font-normal text-white"
                    : "text-neutral-300"
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

