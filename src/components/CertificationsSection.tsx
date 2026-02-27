import React from "react";
import { motion, type Variants } from "framer-motion";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { GraduationCap, Trophy, Award, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15 },
  }),
};

const baseUrl = import.meta.env.BASE_URL;

const cardItems: CardStackItem[] = [
  {
    id: 1,
    title: "2nd Position – Code Sprint Hackathon",
    description: "Tech Mirai Fiesta 2026, Integral University (Feb 5–7, 2026)",
    imageSrc: `${baseUrl}images/code-sprint.png`,
    tag: "Achievement",
  },
  {
    id: 2,
    title: "Data Visualization with Cognos Dashboard Embedded",
    description: "Issued by IBM Skills Network & Integral University (Feb 21, 2026)",
    imageSrc: `${baseUrl}images/ibm-cognos.png`,
    tag: "Certification",
  },
  {
    id: 3,
    title: "Build Your Own Chatbot",
    description: "Issued by IBM & Integral University (Feb 21, 2026)",
    imageSrc: `${baseUrl}images/ibm-chatbot.png`,
    tag: "Certification",
  },
];

const education = [
  {
    icon: GraduationCap,
    title: "B.Tech – Cloud Computing & AI (CCAI)",
    institution: "Integral University, Lucknow",
    status: "1st Year (Current)",
    highlight: null,
  },
  {
    icon: BookOpen,
    title: "High School – Class 12th (ISC Board)",
    institution: "Christ Church College",
    status: "Completed",
    highlight: "Built a strong foundation in Object-Oriented Programming (Java)",
  },
];

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Section Heading */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">
            Certifications & Education
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            My academic journey, certifications, and key achievements.
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold font-mono text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.title}
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={cn(
                    "relative rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6",
                    "hover:border-primary/40 transition-colors duration-300",
                    "flex items-start gap-4"
                  )}
                >
                  <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-mono text-foreground">
                      {edu.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.institution}
                    </p>
                    <span className="inline-block mt-2 text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {edu.status}
                    </span>
                    {edu.highlight && (
                      <p className="mt-3 text-sm text-muted-foreground italic">
                        ✦ {edu.highlight}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Certifications & Achievements Card Stack */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold font-mono text-foreground mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Certifications & Achievements
          </h3>
          <CardStack
            items={cardItems}
            initialIndex={0}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots
            cardWidth={480}
            cardHeight={300}
            overlap={0.45}
            spreadDeg={40}
          />
        </motion.div>
      </div>
    </section>
  );
};
