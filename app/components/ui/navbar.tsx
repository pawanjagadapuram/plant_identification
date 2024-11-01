"use client";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-grey-800 bg-opacity-80 text-white p-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-2 text-green-800">
            <Leaf className="h-8 w-8" />
            <span className="font-bold text-xl">PlantID</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className=" hover:text-green-500 transition-colors">
              Home
            </Link>
            <Link
              href="/identify"
              className=" hover:text-green-500 transition-colors"
            >
              Identify
            </Link>
            <Link
              href="/database"
              className=" hover:text-green-500 transition-colors"
            >
              Plant Database
            </Link>
            <Link
              href="/about"
              className=" hover:text-green-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className=" hover:text-green-500 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md  hover:bg-green-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className=" hover:bg-green-50 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/identify"
                className=" hover:bg-green-50 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Identify
              </Link>
              <Link
                href="/database"
                className=" hover:bg-green-50 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Plant Database
              </Link>
              <Link
                href="/about"
                className=" hover:bg-green-50 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className=" hover:bg-green-50 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
