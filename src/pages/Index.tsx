import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="relative h-screen w-full bg-background overflow-hidden">
      <SplineScene 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
      
      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold font-mono tracking-tight text-foreground drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          Syed Maroof Hussain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground font-mono tracking-widest uppercase drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          1st-Year B.Tech CCAI Student
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
