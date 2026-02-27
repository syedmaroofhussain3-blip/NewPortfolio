import React, { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FileDown,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Mail,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15 },
  }),
};

const resumeData = {
  name: "Syed Maroof Hussain",
  title: "Cloud Computing & AI Student | Full-Stack Developer",
  contact: {
    email: "syedmaroofhussain3@gmail.com",
    location: "Lucknow, India",
    github: "github.com/syedmaroofhussain3-blip",
  },
  summary:
    "Product-focused engineering student with a track record of turning ideas into functional software. Experienced in rapid prototyping with modern AI tools and frameworks, with strong foundations in Java and web technologies.",
  education: [
    {
      degree: "B.Tech – Cloud Computing & Artificial Intelligence",
      institution: "Integral University, Lucknow",
      period: "2025 – Present",
      detail: "First-year student focused on cloud infrastructure and AI systems",
    },
    {
      degree: "High School – Class 12th (ISC Board)",
      institution: "Christ Church College",
      period: "Completed",
      detail: "Strong foundation in Object-Oriented Programming (Java)",
    },
  ],
  skills: [
    { category: "Languages", items: "HTML, CSS, JavaScript, Java" },
    { category: "Frameworks", items: "React, Node.js, Tailwind CSS" },
    { category: "Tools", items: "Git, GitHub, VS Code, Lovable" },
    { category: "Focus Areas", items: "Cloud Infrastructure, Rapid Prototyping, AI Integration" },
  ],
  projects: [
    {
      name: "SoloRank",
      description:
        "Gamified self-improvement app inspired by Solo Leveling — RPG-style quests, XP system, and leveling mechanics.",
    },
    {
      name: "University Hub",
      description:
        "Full-stack platform for managing university events — registration, live updates, and campus coordination.",
    },
  ],
  achievements: [
    "2nd Position – Code Sprint Hackathon, Tech Mirai Fiesta 2026, Integral University",
    "IBM Certification – Data Visualization with Cognos Dashboard Embedded",
    "IBM Certification – Build Your Own Chatbot",
  ],
};

// Hidden printable resume
const PrintableResume = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="hidden print:block bg-white text-black p-12 max-w-[210mm] mx-auto font-sans text-sm leading-relaxed"
  >
    <style>{`
      @media print {
        @page { margin: 15mm; size: A4; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `}</style>
    <header className="border-b-2 border-gray-800 pb-4 mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{resumeData.name}</h1>
      <p className="text-gray-600 mt-1">{resumeData.title}</p>
      <div className="flex gap-4 mt-2 text-xs text-gray-500">
        <span>{resumeData.contact.email}</span>
        <span>{resumeData.contact.location}</span>
        <span>{resumeData.contact.github}</span>
      </div>
    </header>

    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Summary</h2>
      <p>{resumeData.summary}</p>
    </section>

    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Education</h2>
      {resumeData.education.map((edu) => (
        <div key={edu.degree} className="mb-2">
          <div className="flex justify-between">
            <strong>{edu.degree}</strong>
            <span className="text-gray-500 text-xs">{edu.period}</span>
          </div>
          <p className="text-gray-600 text-xs">{edu.institution}</p>
          <p className="text-gray-500 text-xs">{edu.detail}</p>
        </div>
      ))}
    </section>

    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Skills</h2>
      <div className="grid grid-cols-2 gap-1">
        {resumeData.skills.map((s) => (
          <p key={s.category}><strong>{s.category}:</strong> {s.items}</p>
        ))}
      </div>
    </section>

    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Projects</h2>
      {resumeData.projects.map((p) => (
        <div key={p.name} className="mb-2">
          <strong>{p.name}</strong>
          <p className="text-gray-600 text-xs">{p.description}</p>
        </div>
      ))}
    </section>

    <section>
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Achievements & Certifications</h2>
      <ul className="list-disc list-inside space-y-1">
        {resumeData.achievements.map((a) => (
          <li key={a} className="text-xs">{a}</li>
        ))}
      </ul>
    </section>
  </div>
));
PrintableResume.displayName = "PrintableResume";

// Section card for displaying resume highlights on the page
function ResumeCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6",
        "hover:border-primary/40 transition-colors duration-300"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold font-mono text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export const ResumeSection: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Open a new window with the resume content for printing/saving as PDF
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>Resume – ${resumeData.name}</title>
      <style>
        @page { margin: 15mm; size: A4; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; color: #111; padding: 40px; max-width: 800px; margin: auto; font-size: 13px; line-height: 1.6; }
        h1 { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
        h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin: 20px 0 10px; }
        .subtitle { color: #555; margin-top: 4px; }
        .contact { display: flex; gap: 16px; margin-top: 8px; font-size: 12px; color: #777; }
        .header { border-bottom: 2px solid #222; padding-bottom: 16px; margin-bottom: 20px; }
        .edu-item, .proj-item { margin-bottom: 10px; }
        .edu-row { display: flex; justify-content: space-between; }
        .edu-row span { font-size: 11px; color: #999; }
        .inst { font-size: 12px; color: #666; }
        .detail { font-size: 12px; color: #888; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        ul { list-style: disc; padding-left: 20px; }
        li { margin-bottom: 4px; font-size: 12px; }
        strong { font-weight: 600; }
      </style></head><body>
        <div class="header">
          <h1>${resumeData.name}</h1>
          <p class="subtitle">${resumeData.title}</p>
          <div class="contact">
            <span>${resumeData.contact.email}</span>
            <span>${resumeData.contact.location}</span>
            <span>${resumeData.contact.github}</span>
          </div>
        </div>
        <h2>Summary</h2>
        <p>${resumeData.summary}</p>
        <h2>Education</h2>
        ${resumeData.education.map((e) => `<div class="edu-item"><div class="edu-row"><strong>${e.degree}</strong><span>${e.period}</span></div><p class="inst">${e.institution}</p><p class="detail">${e.detail}</p></div>`).join("")}
        <h2>Skills</h2>
        <div class="skills-grid">${resumeData.skills.map((s) => `<p><strong>${s.category}:</strong> ${s.items}</p>`).join("")}</div>
        <h2>Projects</h2>
        ${resumeData.projects.map((p) => `<div class="proj-item"><strong>${p.name}</strong><p class="detail">${p.description}</p></div>`).join("")}
        <h2>Achievements & Certifications</h2>
        <ul>${resumeData.achievements.map((a) => `<li>${a}</li>`).join("")}</ul>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 400);
  };

  return (
    <section id="resume" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Heading */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
            <FileDown className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">
            Resume
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            A snapshot of my skills, experience, and achievements.
          </p>
        </motion.div>

        {/* Resume Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ResumeCard icon={GraduationCap} title="Education">
              {resumeData.education.map((edu) => (
                <div key={edu.degree} className="mb-3 last:mb-0">
                  <p className="text-sm font-semibold text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution} · {edu.period}</p>
                </div>
              ))}
            </ResumeCard>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ResumeCard icon={Code} title="Technical Skills">
              {resumeData.skills.map((s) => (
                <div key={s.category} className="mb-2 last:mb-0">
                  <span className="text-xs font-mono text-primary">{s.category}: </span>
                  <span className="text-xs text-muted-foreground">{s.items}</span>
                </div>
              ))}
            </ResumeCard>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ResumeCard icon={Briefcase} title="Projects">
              {resumeData.projects.map((p) => (
                <div key={p.name} className="mb-3 last:mb-0">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                </div>
              ))}
            </ResumeCard>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ResumeCard icon={Award} title="Achievements">
              <ul className="space-y-2">
                {resumeData.achievements.map((a) => (
                  <li key={a} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">✦</span>
                    {a}
                  </li>
                ))}
              </ul>
            </ResumeCard>
          </motion.div>
        </div>

        {/* Download Button */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button
            onClick={handleDownload}
            className={cn(
              "flex items-center gap-3 rounded-full px-8 py-4",
              "bg-primary text-primary-foreground font-semibold font-mono text-sm",
              "hover:opacity-90 transition-all duration-200 hover:scale-105",
              "shadow-lg shadow-primary/20"
            )}
          >
            <FileDown className="w-5 h-5" />
            Download Resume (PDF)
          </button>
        </motion.div>
      </div>
    </section>
  );
};
