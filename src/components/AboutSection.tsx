import React from "react";
import { motion, type Variants } from "framer-motion";
import { Cloud, Zap, Code, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPortfolioData } from "@/data/portfolioStore";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15 },
  }),
};

const iconMap: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
  Instagram: Instagram,
};

const focusIconMap: Record<string, React.ElementType> = {
  "Cloud Infrastructure": Cloud,
  "Rapid Prototyping": Zap,
  "Core Engineering": Code,
};

export const AboutSection: React.FC = () => {
  const data = getPortfolioData().about;

  return (
    <section id="about" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary/60 to-accent opacity-50 blur-lg backdrop-blur-md" />
            <img src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Maroof" alt="Syed Maroof Hussain avatar" className="relative size-28 rounded-full border-4 border-border shadow-xl z-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">About Me</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6 md:p-8 mb-12">
          {data.bio.map((paragraph, i) => (
            <p key={i} className={cn("text-base md:text-lg text-muted-foreground leading-relaxed", i > 0 && "mt-4")}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {data.focusAreas.map((area, i) => {
            const Icon = focusIconMap[area.title] || Code;
            return (
              <motion.div key={area.title} custom={i + 2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6 text-center hover:border-primary/40 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-mono text-foreground mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
          {data.socialLinks.map((link) => {
            const Icon = iconMap[link.label] || Mail;
            return (
              <a key={link.label} href={link.href} aria-label={link.label}
                className={cn("flex items-center gap-2 rounded-full border border-border/20 px-6 py-3", "text-sm font-semibold text-muted-foreground", "transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:text-foreground", "bg-background/30 backdrop-blur-md shadow-lg")}>
                <Icon size={18} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
