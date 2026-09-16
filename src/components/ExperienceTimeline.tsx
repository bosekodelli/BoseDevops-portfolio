import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  period: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

const milestones: Milestone[] = [
  {
    period: 'MAY 2019 — PRESENT',
    role: 'Senior DevOps Engineer',
    company: 'JETA SOFTWARE (INDIA) PVT LTD',
    location: 'Clients: Capital One - US, IBM (Remote / Hybrid)',
    badge: 'CURRENT ROLE',
    summary: 'Spearheading multi-cloud infrastructure, Kubernetes orchestration, CI/CD automation, and DevSecOps compliance for enterprise clients.',
    achievements: [
      'Architected and deployed multi-cloud infrastructure using Terraform (Landing & Target Zones) across Azure and AWS with workspace environment segregation.',
      'Designed scalable CI/CD pipelines using Azure DevOps, GitHub Actions, and Jenkins, accelerating deployment cycles by up to 70%.',
      'Streamlined SQL DACPAC deployments into CI/CD pipelines in Azure DevOps, ensuring reliable, rapid database releases.',
      'Deployed zero-downtime blue-green and canary releases using Helm charts and Argo CD GitOps on AKS.',
      'Embedded DevSecOps tools (Trivy, SonarQube, HashiCorp Vault, TFSec, Checkov) into CI/CD lifecycles.',
      'Optimized Kubernetes workloads on AKS using HPA and CAST AI, achieving up to 30% cloud compute savings.',
      'Reduced MTTR by 40% with AI-powered SOP automation workflows and configured private LLaMA LLM inference instances on VMs.',
      'Implemented full-fidelity observability using Prometheus, Grafana, EFK, Jaeger, and Site24x7, reducing production outages by 15%.',
    ],
    technologies: ['Azure', 'AWS', 'Kubernetes (AKS)', 'Terraform', 'Azure DevOps', 'GitHub Actions', 'Vault', 'CAST AI', 'Argo CD', 'Prometheus'],
  },
  {
    period: '2019 — PRESENT',
    role: 'Multi-Cloud & Kubernetes Architecture Lead',
    company: 'Enterprise Client Engagements (Capital One / IBM)',
    location: 'Financial Services & Enterprise Cloud Delivery',
    badge: 'DELIVERABLES',
    summary: 'Led cloud migration, network peering (VNet/NSG), and automated operational tasks using Azure Automation Accounts and Azure Functions with PowerShell and Python.',
    achievements: [
      'Automated routine cloud maintenance, backups, and JIRA webhook ticketing via Python and PowerShell scripts.',
      'Built and deployed containerized Docker images to AWS ECR and managed scalable EKS deployments using Helm.',
      'Conducted Git and CI/CD engineering workshops, promoting standardized reusable pipeline templates company-wide.',
      'Integrated Black Duck and Trivy vulnerability scanners for strict license and dependency security compliance.',
    ],
    technologies: ['Docker', 'AWS ECR/EKS', 'Azure Functions', 'PowerShell', 'Python', 'JIRA Webhooks', 'Black Duck', 'Ansible'],
  },
];

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const pathLength = path.getTotalLength();
        
        // Initialize path stroke dash
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // Animate SVG path drawing tied to Lenis scroll progress
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        });
      }

      // Animate Milestone Cards reveal
      const items = containerRef.current?.querySelectorAll('.timeline-card');
      if (items) {
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TRACK RECORD</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#f4f1ea] tracking-tight">
          Professional Experience
        </h2>
        <p className="font-body text-[#9c978d] text-base sm:text-lg max-w-2xl mt-4">
          5+ years delivering cloud infrastructure, automated pipelines, and Kubernetes operations for enterprise tier clients.
        </p>
      </div>

      <div className="relative">
        
        {/* Animated Connecting SVG Path */}
        <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-1 pointer-events-none hidden md:block">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="rgba(244, 241, 234, 0.08)"
              strokeWidth="2"
            />
            <path
              ref={pathRef}
              d="M 2 0 L 2 1000"
              stroke="#84a98c"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Milestone Cards List */}
        <div className="flex flex-col gap-12 relative md:pl-16">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="timeline-card relative rounded-3xl p-6 sm:p-8 bg-[#15171b] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl group hover:border-[#84a98c]/30 transition-all duration-300"
            >
              {/* Timeline node icon on desktop */}
              <div className="hidden md:flex absolute -left-[54px] top-8 w-7 h-7 rounded-full bg-[#121417] border-2 border-[#84a98c] items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#84a98c]" />
              </div>

              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-5 border-b border-white/[0.06] mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full bg-[#84a98c]/10 text-[#84a98c] border border-[#84a98c]/25 font-code text-xs font-semibold">
                      {m.badge}
                    </span>
                    <span className="font-code text-xs text-[#9c978d] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {m.period}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f4f1ea]">
                    {m.role}
                  </h3>
                  <div className="font-body text-sm font-semibold text-[#d4a373] mt-0.5">
                    {m.company}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-code text-[#9c978d] bg-[#121417] px-3 py-1.5 rounded-full border border-white/[0.05]">
                  <MapPin className="w-3.5 h-3.5 text-[#84a98c]" />
                  <span>{m.location}</span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="font-body text-sm text-[#d6d0c4] leading-relaxed mb-6 font-normal">
                {m.summary}
              </p>

              {/* Key Achievements Bullet Points */}
              <div className="space-y-2.5 mb-6">
                {m.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#84a98c] shrink-0 mt-0.5" />
                    <span className="font-body text-xs sm:text-sm text-[#9c978d] leading-relaxed">
                      {ach}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                {m.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#121417] border border-white/[0.05] text-xs font-code text-[#d6d0c4]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
