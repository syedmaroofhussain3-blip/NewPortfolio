import React from "react";
import { motion } from "framer-motion";
import OrbitingSkills from "@/components/ui/orbiting-skills";

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">
            Skills
          </h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base tracking-wide uppercase font-mono">
            Hover to pause · Technologies I work with
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <OrbitingSkills />
        </motion.div>
      </div>
    </section>
  );
};
