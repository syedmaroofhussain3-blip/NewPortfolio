'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-6xl mx-4 md:mx-8 border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />
          
          {/* Left content */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
              Interactive 3D
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your design.
            </p>
          </div>

          {/* Right content */}
          <div className="flex-1 relative min-h-[300px] md:min-h-[500px]">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
