"use client";

import { useEffect, useState } from "react";
import { Menu, X, Download, Moon, Sun } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section
      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(link.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#0a0118]/80 backdrop-blur-lg border-b border-purple-primary/10"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center space-x-2.5 group cursor-pointer">
          <div className="w-10 h-10 relative overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="Parth Gohil Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-white text-lg tracking-wide">Parth Gohil</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeSection === link.id
                  ? "text-purple-light bg-purple-primary/15"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="/Parth_Gohil_Resume.pdf"
            download
            className="btn-primary flex items-center space-x-2 !py-2.5 !px-5 !text-sm !rounded-full"
          >
            <span>Download CV</span>
            <Download className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 w-screen h-screen bg-[#0a0118] z-50 flex flex-col justify-between p-6">
          {/* Mobile Overlay Header */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 relative overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Parth Gohil Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-white tracking-wide">Parth Gohil</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links Grid */}
          <div className="flex flex-col items-center justify-center space-y-5 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-xl font-semibold py-3 rounded-2xl w-[85%] text-center transition-all cursor-pointer ${
                  activeSection === link.id
                    ? "text-purple-light bg-purple-primary/15"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Download CTA at the bottom */}
          <div className="w-full pb-8 flex flex-col items-center">
            <a
              href="/Parth_Gohil_Resume.pdf"
              download
              onClick={() => setMobileOpen(false)}
              className="btn-primary flex items-center justify-center space-x-2 w-[85%] !py-3.5 !rounded-xl"
            >
              <span>Download CV</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
