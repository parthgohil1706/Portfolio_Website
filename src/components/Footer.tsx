"use client";

import { Github, Linkedin, ArrowUp, Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const services = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Backend Development",
];

const socials = [
  { icon: Github, href: "https://github.com/parthgohil1706", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/parthgohil1706", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "07460c7b-b62c-4c81-8ffa-9966e4de4ca1",
          email: email,
          subject: "New Newsletter Subscription",
          message: `Email address: ${email}`,
          from_name: "Portfolio Newsletter"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSent(true);
        setEmail("");
      }
    } catch (err) {
      console.error("Subscription error:", err);
    }
    setIsSubmitting(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-purple-primary/[0.03] backdrop-blur-md border-t border-purple-primary/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 relative overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Parth Gohil Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-white">Parth Gohil</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Full Stack Developer crafting modern digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-slate-400 text-sm hover:text-purple-light transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <span className="text-purple-light">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((svc) => (
                <li key={svc} className="text-slate-400 text-sm flex items-center space-x-1.5">
                  <span className="text-purple-light">›</span>
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-sm hover:text-purple-light transition-colors flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4">
              Get the latest updates and articles straight to your inbox.
            </p>
            {!isSent ? (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2.5 rounded-l-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-600 outline-none focus:border-purple-primary/40 transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-2.5 rounded-r-xl bg-purple-primary text-white hover:bg-purple-primary/80 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            ) : (
              <div className="text-purple-light text-sm font-semibold py-2">
                ✓ Thank you for subscribing!
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Parth Gohil. All rights reserved.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-purple-primary/20 border border-purple-primary/40 flex items-center justify-center text-purple-light hover:bg-purple-primary/40 transition-all cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
