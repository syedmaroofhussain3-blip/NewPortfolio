import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { Home, User, FolderOpen, Wrench, Award, Mail, FileDown } from "lucide-react";

const navItems = [
  { name: "Home", url: "#home", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Skills", url: "#skills", icon: Wrench },
  { name: "Projects", url: "#projects", icon: FolderOpen },
  { name: "Certifications", url: "#certifications", icon: Award },
  { name: "Contact", url: "#contact", icon: Mail },
  { name: "Resume", url: "#resume", icon: FileDown },
];

const Index = () => {
  return (
    <div className="relative">
      <AnimeNavBar items={navItems} defaultActive="Home" />

      {/* Hero 3D Background - Fixed */}
      <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Hero Text - Scrollable */}
      <section id="home" className="relative z-10 h-screen w-full flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="px-6 py-4 sm:px-10 sm:py-5 rounded-2xl bg-background/30 backdrop-blur-md border border-border/20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono tracking-tight text-foreground text-center whitespace-nowrap hidden sm:block">
            Syed Maroof Hussain
          </h1>
          <h1 className="text-3xl font-bold font-mono tracking-tight text-foreground text-center sm:hidden">
            <span className="block">Syed</span>
            <span className="block">Maroof</span>
            <span className="block">Hussain</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground font-mono tracking-widest uppercase"
        >
          1st-Year B.Tech CCAI Student
        </motion.p>
      </section>

      {/* Scrollable content */}
      <div className="relative z-10">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
      </div>
    </div>
  );
};

export default Index;
