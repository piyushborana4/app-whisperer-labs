import { motion } from "framer-motion";
import { Zap, Shield, Layers, Globe, Cpu, GitBranch } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "From idea to working app in seconds, not weeks.",
  },
  {
    icon: Layers,
    title: "Full-Stack Output",
    description: "UI, API, database schema — all generated together.",
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "Auth, validation, and security baked in from day one.",
  },
  {
    icon: Globe,
    title: "One-Click Deploy",
    description: "Ship your app to the world with a single click.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Logic",
    description: "Smart business logic that adapts to your needs.",
  },
  {
    icon: GitBranch,
    title: "Iterate Freely",
    description: "Refine with natural language — no code required.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to <span className="gradient-text">ship fast</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A complete platform that turns your vision into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:bg-secondary/30 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
