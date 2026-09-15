import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Compass, 
  Bot
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photosRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const corePillars = [
    {
      icon: Server,
      title: 'Multi-Cloud Infrastructure (Azure & AWS)',
      desc: 'Architected and deployed Terraform Landing Zones across Azure & AWS with workspace isolation, VNet peering, and NSG network security.',
    },
    {
      icon: ShieldCheck,
      title: 'DevSecOps & Automated Compliance',
      desc: 'Embedded security scanners (Trivy, SonarQube, HashiCorp Vault, TFSec, Checkov) directly into CI/CD pipelines to enforce zero vulnerabilities early.',
    },
    {
      icon: TrendingUp,
      title: 'FinOps & 30% Cloud Cost Optimization',
      desc: 'Optimized Kubernetes compute workloads on AKS using HPA, CAST AI, and custom cost reporting dashboards to achieve 30% cloud savings.',
    },
    {
      icon: Bot,
      title: 'AI-Powered DevOps & Incident Response',
      desc: 'Reduced MTTR by 40% using ChatGPT SOP workflows and deployed secure local LLaMA instances on VMs for private automated inference.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header Badge */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>SENIOR DEVOPS ENGINEER PROFILE</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#f4f1ea] tracking-tight">
          Delivering Resilient, Automated Cloud Scale
        </h2>
        <p className="font-body text-[#9c978d] text-base sm:text-lg max-w-2xl mt-4">
          6+ years of proven leadership building automated CI/CD pipelines, Kubernetes orchestrations, and DevSecOps frameworks for global enterprises.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual Gallery with User's High-Res Photos (Education Removed) */}
        <div ref={photosRef} className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Executive Portrait Card */}
          <div className="relative group rounded-3xl overflow-hidden border border-white/[0.08] bg-[#15171b] p-2 shadow-xl">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/assets/executive-portrait.png"
                alt="Bosu Kodelli - Senior DevOps Engineer"
                className="w-full h-full object-cover object-center filter brightness-100 contrast-100 group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-transparent to-transparent opacity-85" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121417]/90 backdrop-blur-md border border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading font-bold text-[#f4f1ea] text-sm">
                      Bosu Kodelli
                    </div>
                    <div className="font-code text-xs text-[#84a98c]">
                      Senior DevOps Engineer • Jeta Software (Capital One / IBM)
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#84a98c]/15 text-[#84a98c] flex items-center justify-center border border-[#84a98c]/30">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Credential Highlights */}
          <div className="p-4 rounded-2xl bg-[#15171b] border border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="font-heading font-bold text-[#f4f1ea] text-sm">
                Enterprise Cloud Specialist
              </div>
              <div className="font-code text-xs text-[#9c978d]">
                Multi-Cloud Architecture &amp; FinOps Governance
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs font-medium">
              6+ Yrs Active
            </span>
          </div>

        </div>

        {/* Right Column: Architectural Narrative & Core Pillars */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col gap-8">
          
          <div className="prose prose-invert max-w-none">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#f4f1ea] mb-4 leading-tight">
              Driving Operational Excellence Across Azure &amp; AWS Multi-Cloud Ecosystems.
            </h3>
            <p className="font-body text-[#d6d0c4] text-base leading-relaxed mb-4">
              Currently serving as <strong>Senior DevOps Engineer at Jeta Software (India) Pvt Ltd</strong> (May 2019 – Present), leading mission-critical cloud platform projects for enterprise tier clients including <strong>Capital One - US</strong> and <strong>IBM</strong>.
            </p>
            <p className="font-body text-[#9c978d] text-sm sm:text-base leading-relaxed">
              Specialized in end-to-end automation: streamlining SQL DACPAC and microservice pipelines in Azure DevOps, implementing GitOps zero-downtime rollouts via Argo CD on AKS/EKS, securing builds with DevSecOps tools (Trivy, Vault, SonarQube), and lowering cloud infrastructure costs by 30% through FinOps.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePillars.map((pillar, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#16181d] border border-white/[0.06] hover:border-[#84a98c]/30 transition-all duration-300 hover:bg-[#1a1d24] group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#20232a] text-[#84a98c] flex items-center justify-center mb-3 border border-white/[0.06] group-hover:scale-105 transition-all">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-semibold text-[#f4f1ea] text-base mb-1.5 group-hover:text-[#a3b18a] transition-colors">
                  {pillar.title}
                </h4>
                <p className="font-body text-xs text-[#9c978d] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Technical Highlights Pill Ribbon */}
          <div className="p-4 rounded-2xl bg-[#121417] border border-white/[0.06] flex flex-wrap items-center gap-2.5">
            <span className="font-code text-xs text-[#9c978d]">Core Tools:</span>
            {[
              "Azure DevOps",
              "GitHub Actions",
              "Kubernetes (AKS/EKS)",
              "Terraform & Ansible",
              "HashiCorp Vault",
              "Argo CD",
              "CAST AI & Kubecost",
              "Prometheus & Grafana",
              "Python & PowerShell",
              "Docker & Podman",
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-[#181a20] border border-white/[0.06] font-code text-xs text-[#d6d0c4] hover:border-[#84a98c]/40 hover:text-[#84a98c] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
