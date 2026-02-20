import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import BuilderInterface from "@/components/BuilderInterface";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  const builderRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={scrollToBuilder} />
      <div ref={builderRef}>
        <BuilderInterface />
      </div>
      <FeaturesSection />
      <footer className="py-12 px-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground font-mono">
          Built with AI • Zero-Code App Builder
        </p>
      </footer>
    </div>
  );
};

export default Index;
