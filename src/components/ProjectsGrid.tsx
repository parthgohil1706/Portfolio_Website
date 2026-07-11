"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  url: string;
}

const projects: Project[] = [
  {
    title: "AM DRIETS (Client Work)",
    subtitle: "Frozen Fruits & Vegetables Web App",
    image: "/project-dashboard.png",
    tags: ["Next.js", "Tailwind CSS", "MongoDB"],
    url: "https://www.amdriets.com",
  },
  {
    title: "Maruti Overseas Hub (Client Work)",
    subtitle: "Import-Export Business Platform",
    image: "/project-ecommerce.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    url: "https://marutioverseashub.com/",
  },
  {
    title: "CARCARE",
    subtitle: "Vehicle Services & Rental Platform",
    image: "/project-carcare.png",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    url: "https://github.com/parthgohil1706/CarCare",
  },
  {
    title: "Python Automation",
    subtitle: "Data Mining & Scripting Utilities",
    image: "/project-portfolio.png",
    tags: ["Python", "SQL", "Automation"],
    url: "https://github.com/parthgohil1706/Python",
  },
];

const tagColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-400",
  React: "bg-cyan-500/20 text-cyan-400",
  "Node.js": "bg-green-500/20 text-green-400",
  PHP: "bg-indigo-500/20 text-indigo-400",
  MySQL: "bg-orange-500/20 text-orange-400",
  Bootstrap: "bg-purple-500/20 text-purple-400",
  JavaScript: "bg-yellow-500/20 text-yellow-400",
  "ES6+": "bg-amber-500/20 text-amber-400",
  DOM: "bg-pink-500/20 text-pink-400",
  Python: "bg-sky-500/20 text-sky-400",
  SQL: "bg-red-500/20 text-red-400",
  Automation: "bg-emerald-500/20 text-emerald-400",
};

export default function ProjectsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340;
      scrollRef.current.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <p className="section-label mb-2">My Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
          </div>
          <a
            href="https://github.com/parthgohil1706"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !py-2.5 !px-5 !text-sm !rounded-full flex items-center space-x-2"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-purple-primary/20 border border-purple-primary/40 flex items-center justify-center text-white hover:bg-purple-primary/40 transition-all hidden md:flex cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-purple-primary/20 border border-purple-primary/40 flex items-center justify-center text-white hover:bg-purple-primary/40 transition-all hidden md:flex cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => (
              <a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex-shrink-0 w-[280px] sm:w-[300px] overflow-hidden snap-start group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-primary/0 group-hover:bg-purple-primary/20 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-semibold text-base mb-1">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{project.subtitle}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                          tagColors[tag] || "bg-slate-700/50 text-slate-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
