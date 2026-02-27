'use client'

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GradientCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
}

export const GradientCard: React.FC<GradientCardProps> = ({ title, description, href = "#", icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setRotation({
        x: -(y / rect.height) * 5,
        y: (x / rect.width) * 5,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-[24px] overflow-hidden w-full"
      style={{
        height: "420px",
        transformStyle: "preserve-3d",
        backgroundColor: "#0a0a0a",
        boxShadow: "0 -10px 80px 5px rgba(147, 51, 234, 0.15), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -5 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glass reflection */}
      <motion.div
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 80%, rgba(255,255,255,0.03) 100%)",
        }}
        animate={{ opacity: isHovered ? 0.7 : 0.5 }}
      />

      {/* Dark bg */}
      <div className="absolute inset-0 z-0 bg-[#030303]" />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.5) -10%, transparent 70%),
            radial-gradient(ellipse at bottom left, rgba(124, 58, 237, 0.4) -10%, transparent 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{ opacity: isHovered ? 0.9 : 0.7 }}
      />

      {/* Center purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-[21]"
        style={{
          background: "radial-gradient(circle at bottom center, rgba(147, 51, 234, 0.6) -20%, transparent 60%)",
          filter: "blur(45px)",
        }}
        animate={{ opacity: isHovered ? 0.85 : 0.65 }}
      />

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-[25]"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.05) 100%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(147, 51, 234, 0.8), 0 0 30px 6px rgba(124, 58, 237, 0.5)"
            : "0 0 15px 3px rgba(147, 51, 234, 0.6), 0 0 25px 5px rgba(124, 58, 237, 0.3)",
          opacity: isHovered ? 1 : 0.8,
        }}
      />

      {/* Side glows */}
      {["left", "right"].map((side) => (
        <motion.div
          key={side}
          className={`absolute bottom-0 ${side}-0 h-1/4 w-[1px] z-[25] rounded-full`}
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 40%, transparent 80%)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 0 15px 3px rgba(147, 51, 234, 0.7)"
              : "0 0 10px 2px rgba(147, 51, 234, 0.4)",
            opacity: isHovered ? 1 : 0.8,
          }}
        />
      ))}

      {/* Card content */}
      <motion.div className="relative flex flex-col h-full p-8 z-40">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(225deg, #1a1a2e 0%, #0f0f1a 100%)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 8px 16px -2px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(255,255,255,0.1), inset -2px -2px 5px rgba(0,0,0,0.7)"
              : "0 6px 12px -2px rgba(0,0,0,0.25), inset 1px 1px 3px rgba(255,255,255,0.08), inset -2px -2px 4px rgba(0,0,0,0.5)",
            y: isHovered ? -2 : 0,
          }}
        >
          <div className="absolute top-0 left-0 w-2/3 h-2/3 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at top left, rgba(255,255,255,0.4), transparent 80%)", filter: "blur(8px)" }} />
          <div className="relative z-10 text-foreground">
            {icon || (
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.4 5.4L14.8 5.4L10.6 8.8L12 14.2L8 10.8L4 14.2L5.4 8.8L1.2 5.4L6.6 5.4L8 0Z" fill="white" />
              </svg>
            )}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div className="mb-auto">
          <motion.h3
            className="text-xl md:text-2xl font-medium text-foreground mb-3"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.2 }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground mb-6"
            style={{ lineHeight: 1.6, fontWeight: 350 }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{ filter: "blur(0px)", opacity: 0.85 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {description}
          </motion.p>

          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-foreground text-sm font-medium group"
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{ filter: "blur(0px)", opacity: 0.9 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            whileHover={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))" }}
          >
            Learn More
            <motion.svg
              className="ml-1 w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
