"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Github, Linkedin, Mouse } from "lucide-react";

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(leftRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1 });
    tl.fromTo(rightRef.current, { opacity: 0, x: 60, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1 }, "-=0.6");
    tl.fromTo(scrollRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center z-10 overflow-hidden">
      {/* Purple gradient orb background */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* Left Content */}
        <div ref={leftRef} className="space-y-6">
          <p className="text-lg text-slate-300">
            <span className="mr-2">👋</span>
            <span className="text-purple-light font-semibold">Hello, I&apos;m</span>
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Parth Gohil
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Full Stack <span className="gradient-text">Developer</span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed">
            I build exceptional digital experiences with modern technologies and beautiful designs. Passionate about creating high-performance web applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary flex items-center space-x-2 cursor-pointer"
            >
              <span>View My Work</span>
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline flex items-center space-x-2 cursor-pointer"
            >
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-4">
            {[
              { icon: Github, href: "https://github.com/parthgohil1706" },
              { icon: Linkedin, href: "https://linkedin.com/in/parthgohil1706" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-light hover:border-purple-primary/50 hover:bg-purple-primary/10 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Profile Photo */}
        <div ref={rightRef} className="relative flex justify-center lg:justify-end">
          {/* Glow behind photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-primary/20 rounded-full blur-[80px]" />

          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-[-16px] rounded-full border-2 border-dashed border-purple-primary/30 animate-[spin_20s_linear_infinite]" />
            
            {/* Purple gradient card border */}
            <div className="w-[340px] h-[340px] md:w-[440px] md:h-[400px] rounded-3xl p-1.5 bg-gradient-to-br from-purple-primary via-purple-light to-purple-dark animate-glow-pulse shadow-[0_0_30px_rgba(124,58,237,0.25)]">
              <div className="w-full h-full rounded-[18px] overflow-hidden border-2 border-purple-light/20 bg-purple-primary/10 backdrop-blur-md relative">
                <Image
                  src="/parth-gohil.png"
                  alt="Parth Gohil"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating tech badges around the photo */}
            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-xl bg-[#F7DF1E] flex items-center justify-center text-black font-bold text-xs animate-float shadow-lg shadow-[#F7DF1E]/20">
              JS
            </div>
            <div className="absolute bottom-8 -left-6 w-12 h-12 rounded-xl bg-[#3178C6] flex items-center justify-center text-white font-bold text-xs animate-float-slow shadow-lg shadow-[#3178C6]/20">
              TS
            </div>
            <div className="absolute top-16 -left-4 w-12 h-12 rounded-xl bg-[#61DAFB]/20 border border-[#61DAFB]/40 flex items-center justify-center text-[#61DAFB] font-bold text-lg animate-float shadow-lg">
              ⚛
            </div>
            <div className="absolute -bottom-2 right-8 w-14 h-14 rounded-xl bg-purple-primary/30 border border-purple-primary/60 flex items-center justify-center text-purple-light text-lg animate-float-slow shadow-lg shadow-purple-primary/20">
              &lt;/&gt;
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-lg bg-[#339933]/20 border border-[#339933]/40 flex items-center justify-center text-[#339933] font-bold text-[10px] animate-float shadow-lg">
              Py
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-slate-500">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <div className="w-1.5 h-2.5 rounded-full bg-slate-400 animate-scroll-indicator" />
        </div>
        <span className="text-xs font-medium tracking-wider">Scroll Down</span>
      </div>
    </section>
  );
}
