import React from "react";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/gradient-card";
import { Gamepad2, Calendar, FolderOpen } from "lucide-react";
import { usePortfolioSection } from "@/hooks/usePortfolioSection";

const iconMap: Record<string, React.ReactNode> = {
  SoloRank: <Gamepad2 size={20} className="text-foreground" />,
  "University Hub": <Calendar size={20} className="text-foreground" />,
};
const defaultIcon = <FolderOpen size={20} className="text-foreground" />;

export const ProjectsSection: React.FC = () => {
  const { data, loading } = usePortfolioSection("projects");
  if (loading || !data) return null;

  return (
    <section id="projects" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">Projects</h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base tracking-wide uppercase font-mono">What I've been building</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }}>
              <GradientCard title={project.title} description={project.description} href={project.href} icon={iconMap[project.title] || defaultIcon} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
