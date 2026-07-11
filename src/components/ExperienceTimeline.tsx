"use client";

import { Briefcase, GraduationCap, Code2, Calendar } from "lucide-react";

const timeline = [
  {
    type: "work" as const,
    title: "MERN Stack Developer (On Site)",
    company: "Excelsior Technologies",
    date: "Jan 2026 - Present",
    details: [
      "Currently working as a MERN Stack Developer Trainee, building responsive web apps with React.js and Node.js.",
      "Developing dynamic, user-friendly front-end interfaces using React.js and modern ESNext JavaScript.",
      "Implementing RESTful APIs and database routing scripts with Node.js and Express."
    ],
  },
  {
    type: "work" as const,
    title: "React Developer Intern",
    company: "Infolabz IT Services Pvt. Ltd.",
    date: "July 2025 (15 Days)",
    details: [
      "Covered JavaScript fundamentals, React hooks, state management, and built a custom API-based project.",
      "Learned core concepts of DOM manipulation and applied them to practical coding tasks.",
      "Gained exposure to project architecture guidelines and GitHub version control."
    ],
  },
  {
    type: "work" as const,
    title: ".NET & Angular Intern",
    company: "TatvaSoft",
    date: "June 2025 - July 2025",
    details: [
      "Worked on beginner-level full-stack modules using .NET Core and Angular frameworks.",
      "Built component-based frontend structures and learned how RESTful APIs coordinate with servers.",
      "Learned professional code standards, debugging workflows, and repository management."
    ],
  },
  {
    type: "education" as const,
    title: "B.E. - Information & Communication Technology (ICT)",
    company: "Gujarat Technological University",
    date: "2022 - 2026",
    details: [
      "Academic Specialization in Information and Communication Technology with a current CGPA of 8.38.",
      "Higher Secondary (12th Grade) at Inspire Academy of Science: 62.15% (2022).",
      "Secondary Education (10th Grade) at Inspire Academy of Science: 76.66% (2020)."
    ],
  },
];

const icons = { work: Briefcase, education: GraduationCap, project: Code2 };

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="section-label mb-2">My Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-primary/60 via-purple-primary/30 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = icons[item.type];
              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0118] border-2 border-purple-primary/50 flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-purple-light" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                      isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="glass-card p-6">
                      <div className="flex items-center space-x-2 text-slate-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-purple-light font-semibold text-sm mb-4">{item.company}</p>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-slate-400 text-sm">
                            <span className="text-purple-light mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-light flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
