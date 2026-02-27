import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Send, Github, Linkedin, MapPin, Instagram, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getPortfolioData } from "@/data/portfolioStore";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15 },
  }),
};

const iconMap: Record<string, React.ElementType> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
  Instagram: Instagram,
};

export const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const data = getPortfolioData().contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 1200);
  };

  const inputClasses = cn(
    "w-full rounded-xl border border-border/20 bg-background/20 backdrop-blur-md",
    "px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60",
    "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40",
    "transition-all duration-200"
  );

  const contactInfo = [
    { icon: MapPin, text: data.contactInfo.location },
    { icon: Mail, text: data.contactInfo.email },
  ];

  return (
    <>
      <section id="contact" className="relative w-full py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-foreground">Get In Touch</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">Have a project idea or want to collaborate? Drop me a message!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <motion.form custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} onSubmit={handleSubmit}
              className="md:col-span-3 rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6 md:p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-1.5">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} maxLength={100} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-1.5">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} maxLength={255} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-1.5">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={handleChange} maxLength={1000} className={cn(inputClasses, "resize-none")} />
              </div>
              <button type="submit" disabled={sending}
                className={cn("w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6", "bg-primary text-primary-foreground font-semibold font-mono text-sm", "hover:opacity-90 transition-opacity duration-200", "disabled:opacity-50 disabled:cursor-not-allowed")}>
                <Send className="w-4 h-4" />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </motion.form>

            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6 space-y-5">
                <h3 className="text-lg font-semibold font-mono text-foreground">Contact Info</h3>
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.text} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{info.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-border/20 bg-background/30 backdrop-blur-md p-6 space-y-4">
                <h3 className="text-lg font-semibold font-mono text-foreground">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {data.socialLinks.map((link) => {
                    const Icon = iconMap[link.label] || Mail;
                    return (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}
                        className={cn("flex items-center gap-2 rounded-full border border-border/20 px-5 py-2.5", "text-sm text-muted-foreground", "transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:text-foreground", "bg-background/20 backdrop-blur-md")}>
                        <Icon size={16} />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 w-full border-t border-border/10 bg-background/40 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl flex items-center justify-center">
          <p className="text-sm text-muted-foreground font-mono">© {new Date().getFullYear()} Syed Maroof Hussain</p>
        </div>
      </footer>
    </>
  );
};
