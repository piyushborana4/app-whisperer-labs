import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Code, Database, Layout } from "lucide-react";

const MOCK_STEPS = [
  { icon: Layout, label: "Generating UI components...", duration: 1500 },
  { icon: Database, label: "Creating database schema...", duration: 1200 },
  { icon: Code, label: "Writing application logic...", duration: 1800 },
  { icon: Sparkles, label: "Optimizing & finalizing...", duration: 1000 },
];

const MOCK_CODE = `// Generated App Component
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  
  const addItem = (name: string) => {
    setItems(prev => [...prev, { 
      id: Date.now(), name, done: false 
    }]);
  };

  return (
    <main className="container">
      <h1>Your App</h1>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}`;

const BuilderInterface = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [generatedCode, setGeneratedCode] = useState("");
  const [displayedCode, setDisplayedCode] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedCode("");
    setDisplayedCode("");
  };

  // Step progression
  useEffect(() => {
    if (currentStep < 0 || currentStep >= MOCK_STEPS.length) return;
    const timer = setTimeout(() => {
      if (currentStep < MOCK_STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setGeneratedCode(MOCK_CODE);
      }
    }, MOCK_STEPS[currentStep].duration);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Typewriter effect for code
  useEffect(() => {
    if (!generatedCode) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(generatedCode.slice(0, i + 1));
      i++;
      if (i >= generatedCode.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [generatedCode]);

  return (
    <section id="builder" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What do you want to <span className="gradient-text">build</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Describe your app idea in plain language. Our AI handles the rest.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="rounded-2xl border border-border bg-card p-2 glow-box">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A task management app with drag-and-drop boards, user authentication, and real-time collaboration..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none p-4 text-base focus:outline-none min-h-[100px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex gap-2">
                {["Task Manager", "E-commerce", "Chat App"].map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(`Build me a ${example.toLowerCase()} with modern UI, user accounts, and a database`)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-40 hover:scale-[1.02] transition-transform"
              >
                <Send className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>
        </motion.div>

        {/* Generation progress */}
        <AnimatePresence>
          {isGenerating && currentStep >= 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                {MOCK_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === currentStep;
                  const isDone = i < currentStep || generatedCode;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-mono transition-all duration-300 ${
                        isActive
                          ? "border-primary/50 bg-primary/10 text-primary glow-box"
                          : isDone
                          ? "border-accent/30 bg-accent/5 text-accent"
                          : "border-border bg-secondary/30 text-muted-foreground"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                      {step.label}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code output */}
        <AnimatePresence>
          {(displayedCode || generatedCode) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/60" />
                  <span className="w-3 h-3 rounded-full bg-accent/60" />
                  <span className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">generated-app.tsx</span>
              </div>
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed font-mono text-secondary-foreground">
                <code>{displayedCode}<span className="animate-pulse text-primary">|</span></code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BuilderInterface;
