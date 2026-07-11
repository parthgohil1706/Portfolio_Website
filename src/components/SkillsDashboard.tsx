"use client";

import React, { useState } from "react";
import { Briefcase, FolderCheck, Smile, Trophy } from "lucide-react";

// Categorized skills with percentages
const categories = {
  Frontend: [
    { name: "HTML / CSS", percentage: 95 },
    { name: "JavaScript", percentage: 90 },
    { name: "React.js", percentage: 88 },
    { name: "Next.js", percentage: 80 },
    { name: "TypeScript", percentage: 75 },
    { name: "Tailwind CSS", percentage: 85 },
  ],
  Backend: [
    { name: "Node.js", percentage: 82 },
    { name: "Express.js", percentage: 78 },
    { name: "MySQL", percentage: 80 },
    { name: "MongoDB", percentage: 75 },
    { name: "Python", percentage: 70 },
    { name: "PHP", percentage: 65 },
  ],
  "Tools & Others": [
    { name: "Git & GitHub", percentage: 88 },
    { name: "VS Code", percentage: 90 },
    { name: "Microsoft Power BI", percentage: 75 },
    { name: "Excel", percentage: 85 },
  ],
};

// Tech pill list
const techPills = [
  { name: "React", color: "bg-[#61DAFB]/10 text-[#61DAFB] border-[#61DAFB]/20" },
  { name: "Next.js", color: "bg-[#ffffff]/10 text-white border-white/20" },
  { name: "TypeScript", color: "bg-[#3178C6]/10 text-[#3178C6] border-[#3178C6]/20" },
  { name: "Node.js", color: "bg-[#339933]/10 text-[#339933] border-[#339933]/20" },
  { name: "JavaScript", color: "bg-[#F7DF1E]/10 text-[#F7DF1E] border-[#F7DF1E]/20" },
  { name: "MongoDB", color: "bg-[#47A248]/10 text-[#47A248] border-[#47A248]/20" },
  { name: "Tailwind", color: "bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20" },
  { name: "Three.js", color: "bg-[#ffffff]/15 text-purple-light border-purple-light/20" },
  { name: "Git", color: "bg-[#F05032]/10 text-[#F05032] border-[#F05032]/20" },
  { name: "Figma", color: "bg-[#F24E1E]/10 text-[#F24E1E] border-[#F24E1E]/20" },
];

const stats = [
  { icon: Briefcase, value: "MERN", label: "Stack Developer" },
  { icon: FolderCheck, value: "5+", label: "Projects Completed" },
  { icon: Smile, value: "GTU", label: "CGPA 8.38" },
  { icon: Trophy, value: "3", label: "Certifications" },
];

type CategoryKey = keyof typeof categories;

export default function SkillsDashboard() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("Frontend");

  return (
    <section id="skills" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="section-label mb-2">My Abilities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Skills & Technologies</h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center space-x-3 mb-10">
          {(Object.keys(categories) as CategoryKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-purple-primary border-purple-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Skill Card */}
        <div className="glass-card p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
            {categories[activeTab].map((skill, index) => (
              <div key={index} className="space-y-2.5">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-purple-light">{skill.percentage}%</span>
                </div>
                {/* Progress bar track */}
                <div className="w-full h-3 rounded-full bg-[#160b30]/60 border border-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-primary via-purple-light to-purple-primary transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies List */}
        <div className="text-center mb-16">
          <h3 className="text-xs tracking-[0.2em] font-semibold text-slate-500 uppercase mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techPills.map((pill, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border ${pill.color} hover:scale-105 transition-all duration-300 shadow-sm cursor-default`}
              >
                {pill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center group">
              <div className="w-12 h-12 rounded-xl bg-purple-primary/15 border border-purple-primary/25 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-primary/25 transition-all">
                <stat.icon className="w-6 h-6 text-purple-light" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
