import Link from "next/link";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-grey-800 bg-opacity-80 text-white py-1 mt-4">
      <div className="max-w-6xl mx-auto py-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="h-5 w-5 text-green-900" />
              <span className="font-bold text-lg text-green-900">PlantID</span>
            </div>
            <p className=" mb-2 text-sm">
              Your intelligent plant identification companion. Using advanced AI
              technology to help you identify and learn about plants around you.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://twitter.com"
                className=""
              >
                <Twitter className="h-2 w-2" />
              </a>
              <a
                href="https://github.com"
                className=""
              >
                <Github className="h-2 w-2" />
              </a>
              <a
                href="https://linkedin.com"
                className=""
              >
                <Linkedin className="h-2 w-2" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold  mb-2 text-sm">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/about"
                  className=""
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className=""
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className=""
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className=""
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold  mb-2 text-sm">
              Contact
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center space-x-1 ">
                <MapPin className="h-2 w-2 " />
                <span>123 Plant Street, Garden City</span>
              </li>
              <li className="flex items-center space-x-1 ">
                <Mail className="h-2 w-2" />
                <a
                  href="mailto:info@plantid.com"
                  className=""
                >
                  info@plantid.com
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <Phone className="h-2 w-2" />
                <a href="tel:+1234567890" className="">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-6 pt-4">
          <p className="text-center text-xs">
            © {new Date().getFullYear()} PlantID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
