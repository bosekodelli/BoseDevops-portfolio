import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from '../context/SmoothScrollProvider';
import { 
  ArrowRight, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Cloud, 
  Zap, 
  FileText,
  Activity,
  Bot,
  DollarSign
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollTo } = useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const currentHero = heroRef.current;
    if (currentHero) {
      currentHero.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (currentHero) {
        currentHero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Staggered reveal
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.2 }
      );

      // Kinetic headline animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word');
        tl.fromTo(
          words,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.04, ease: 'power3.out' },
          '-=0.5'
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      tl.fromTo(
        actionsRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      tl.fromTo(
        avatarCardRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.8'
      );

      tl.fromTo(
        metricsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlinePhrases = [
    { text: "Architecting", highlight: false },
    { text: "Resilient", highlight: false },
    { text: "Azure", highlight: true, color: "text-[#d4a373]" },
    { text: "&", highlight: false },
    { text: "AWS", highlight: true, color: "text-[#84a98c]" },
    { text: "Cloud", highlight: false },
    { text: "Systems.", highlight: true, color: "text-[#ede0d4]" },
  ];

  const orbitTechs = [
    { icon: Cloud, label: "Azure & AWS Multi-Cloud", color: "text-[#84a98c] border-[#84a98c]/30" },
    { icon: Cpu, label: "Kubernetes (AKS / EKS)", color: "text-[#d4a373] border-[#d4a373]/30" },
    { icon: Zap, label: "Terraform & Ansible IaC", color: "text-[#c9b097] border-[#c9b097]/30" },
    { icon: ShieldCheck, label: "DevSecOps (Vault / Trivy)", color: "text-[#84a98c] border-[#84a98c]/30" },
    { icon: Bot, label: "FinOps & AI Operations", color: "text-[#ddb892] border-[#ddb892]/30" },
  ];

  const metrics = [
    { value: "6+ Yrs", label: "DevOps & Cloud Exp", sub: "Azure & AWS Specialist", icon: Activity },
    { value: "30%", label: "Cloud Cost Saved", sub: "CAST AI & Workload Tuning", icon: DollarSign },
    { value: "40%", label: "MTTR Reduction", sub: "AI & SOP Automation", icon: Bot },
    { value: "20%", label: "Faster Deployments", sub: "Zero-Downtime Blue/Green", icon: Zap },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden bg-natural-grid"
    >
      {/* Soft warm mouse spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 163, 115, 0.08), rgba(132, 169, 140, 0.04), transparent 70%)`,
        }}
      />

      {/* Gentle ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#52796f]/10 via-[#2f3e46]/10 to-[#d4a373]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        
        {/* Minimalist Status Badge */}
        <div ref={badgeRef} className="mb-6 inline-block">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#15171c]/90 border border-white/[0.08] shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84a98c]"></span>
            </span>
            <span className="font-code text-xs text-[#d6d0c4] tracking-wide">
              Senior DevOps Engineer • Azure &amp; AWS Specialist
            </span>
            <span className="text-[#68645c]">|</span>
            <span className="font-code text-xs text-[#84a98c] font-medium">Remote &amp; Hybrid Open</span>
          </div>
        </div>

        {/* Minimalist Kinetic Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f4f1ea] max-w-5xl leading-[1.1] mb-6 select-none"
        >
          {headlinePhrases.map((phrase, idx) => (
            <span
              key={idx}
              className={`hero-word inline-block mr-3 sm:mr-4 ${
                phrase.highlight
                  ? `${phrase.color} drop-shadow-sm`
                  : 'text-[#f4f1ea]'
              }`}
            >
              {phrase.text}
            </span>
          ))}
        </h1>

        {/* Value Proposition Subtitle from Resume */}
        <p
          ref={subtitleRef}
          className="font-body text-base sm:text-lg lg:text-xl text-[#9c978d] max-w-2xl leading-relaxed mb-8 text-balance font-normal"
        >
          Dedicated DevOps professional with 6+ years of hands-on experience designing, automating, and optimizing cloud infrastructure across Azure and AWS with Kubernetes, Terraform, DevSecOps, and FinOps.
        </p>

        {/* Natural Stone Avatar & Profile Card Showcase */}
        <div ref={avatarCardRef} className="relative mb-8 w-full max-w-lg mx-auto">
          <div className="relative group p-1 rounded-3xl bg-[#181a1f] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
            <div className="bg-[#121417] rounded-[22px] p-4 sm:p-5 flex items-center gap-4 text-left">
              <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/[0.12] shadow-sm">
                <img
                  src="/assets/avatar-headshot.png"
                  alt="Bosu Kodelli - Senior DevOps Engineer"
                  className="w-full h-full object-cover object-top filter brightness-100 contrast-100 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-code text-[9px] text-[#d4a373] border border-white/[0.1]">
                  STAFF
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-[#f4f1ea] text-base sm:text-lg truncate">
                    Bosu Kodelli
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-[#84a98c]/15 text-[#84a98c] border border-[#84a98c]/30 text-[10px] font-code">
                    VERIFIED
                  </span>
                </div>
                <p className="font-code text-xs text-[#9c978d] mb-2 truncate">
                  Azure · AWS · Kubernetes · Terraform · CI/CD
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#1b1e24] text-[10px] font-code text-[#d6d0c4] border border-white/[0.06]">
                    6+ Yrs Exp
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1b1e24] text-[10px] font-code text-[#d6d0c4] border border-white/[0.06]">
                    Jeta Software
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#84a98c]/10 text-[10px] font-code text-[#84a98c] border border-[#84a98c]/20">
                    Capital One · IBM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          ref={actionsRef}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={() => scrollTo('#projects', { offset: -30, duration: 1.2 })}
            className="group px-6 py-3 rounded-full bg-[#d4a373] text-[#0e0f12] text-sm font-semibold shadow-sm hover:bg-[#e2b78b] transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('#terminal', { offset: -30, duration: 1.2 })}
            className="px-6 py-3 rounded-full bg-[#181b20] hover:bg-[#20242b] border border-white/[0.08] text-sm font-medium text-[#e8e4dc] transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-[#84a98c]" />
            <span>Launch Shell</span>
          </button>

          <button
            onClick={() => scrollTo('#about', { offset: -30, duration: 1.2 })}
            className="px-5 py-3 rounded-full bg-[#14161a] hover:bg-[#1c1f26] border border-white/[0.06] text-xs font-code text-[#9c978d] hover:text-[#f4f1ea] transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Architecture Pillars</span>
          </button>
        </div>

        {/* Orbit Tech Tags Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 max-w-4xl">
          {orbitTechs.map((tech, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15171b] border ${tech.color} text-xs font-code tracking-wide shadow-sm`}
            >
              <tech.icon className="w-3.5 h-3.5" />
              <span>{tech.label}</span>
            </div>
          ))}
        </div>

        {/* Minimalist Metrics Grid */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl"
        >
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="glass-natural-interactive p-5 rounded-2xl flex flex-col items-center text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#1e2229] text-[#84a98c] flex items-center justify-center mb-2 border border-white/[0.06] group-hover:scale-105 transition-all">
                <m.icon className="w-4 h-4" />
              </div>
              <div className="font-heading font-bold text-2xl sm:text-3xl text-[#f4f1ea] tracking-tight mb-0.5">
                {m.value}
              </div>
              <div className="font-body text-xs font-medium text-[#d6d0c4] mb-0.5">
                {m.label}
              </div>
              <div className="font-code text-[11px] text-[#9c978d]">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
