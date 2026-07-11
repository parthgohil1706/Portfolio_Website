"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsDashboard from "@/components/SkillsDashboard";
import ProjectsGrid from "@/components/ProjectsGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Workspace3D = dynamic(() => import("@/components/Workspace3D"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#0a0118] z-0 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-purple-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      if (section.id === "home") return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0118] text-slate-100 overflow-x-hidden">
      {/* 3D Background Canvas */}
      <Workspace3D />

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern pointer-events-none z-0 opacity-40" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <SkillsDashboard />
        <ProjectsGrid />
        <ExperienceTimeline />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
