import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cloud, 
  Cpu, 
  GitBranch, 
  Server, 
  CheckCircle, 
  Radio, 
  Clock,
  Bot,
  DollarSign,
  Lock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SkillsBento: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeK8sPods, setActiveK8sPods] = useState(148);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveK8sPods((prev) => prev + Math.floor(Math.random() * 6 - 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.bento-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pipelineStages = [
    { name: "Git-Secrets & TFSec", status: "passed", time: "12s" },
    { name: "Docker Container Build", status: "passed", time: "38s" },
    { name: "Trivy & SonarQube Scan", status: "passed", time: "19s" },
    { name: "Vault Secret Injection", status: "passed", time: "4s" },
    { name: "Argo CD Canary to AKS", status: "running", time: "Live" },
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>TECHNICAL ARSENAL &amp; PLATFORM STACK</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#f4f1ea] tracking-tight">
          Enterprise Cloud &amp; DevOps Capabilities
        </h2>
        <p className="font-body text-[#9c978d] text-base sm:text-lg max-w-2xl mt-4">
          Core proficiencies across Azure &amp; AWS multi-cloud automation, Kubernetes orchestration, DevSecOps compliance, and FinOps cost optimization.
        </p>
      </div>

      {/* Asymmetric Minimalist Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Card 1: Multi-Cloud Infrastructure (Azure & AWS) (Span 7) */}
        <div className="bento-card md:col-span-7 glass-natural-interactive rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#20232a] text-[#84a98c] flex items-center justify-center border border-white/[0.06]">
                <Cloud className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#84a98c]/10 text-[#84a98c] font-code text-xs border border-[#84a98c]/25 flex items-center gap-1.5">
                <Radio className="w-3 h-3" /> Azure &amp; AWS Multi-Cloud
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f4f1ea] mb-2">
              Cloud Platforms &amp; Terraform Landing Zones
            </h3>
            <p className="font-body text-[#9c978d] text-sm leading-relaxed mb-6">
              Architecting modular Terraform Landing &amp; Target zones with workspace segregation across Azure &amp; AWS. Implementing VNet peering, NSG security policies, and automated Azure Functions/Automation Accounts.
            </p>

            {/* Live Infrastructure Status */}
            <div className="p-4 rounded-2xl bg-[#121417] border border-white/[0.06] font-code text-xs">
              <div className="flex items-center justify-between text-[#9c978d] pb-2 border-b border-white/[0.06] mb-3">
                <span className="flex items-center gap-1.5 text-[#d6d0c4]">
                  <Server className="w-3.5 h-3.5 text-[#84a98c]" /> AKS &amp; EKS Production Clusters
                </span>
                <span className="text-[#84a98c] font-medium">99.999% SLA UPTIME</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: 'Azure AKS', role: 'Production Mesh', pods: `${activeK8sPods} Pods Active` },
                  { name: 'AWS EKS', role: 'Microservices', pods: '94 Pods Active' },
                  { name: 'Terraform', role: 'Workspaces', pods: '6 Envs Synced' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#181a20] border border-white/[0.04]">
                    <div className="text-[11px] font-bold text-[#f4f1ea]">{item.name}</div>
                    <div className="text-[10px] text-[#9c978d] truncate">{item.role}</div>
                    <div className="text-[10px] text-[#84a98c] mt-1 font-medium">{item.pods}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {['Azure (Landing Zone)', 'AWS (ECR/EKS)', 'Terraform Workspaces', 'Ansible', 'VNet Peering', 'NSG Security'].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-[#16181d] text-xs font-code text-[#d6d0c4] border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: DevSecOps & Security Gates (Span 5) */}
        <div className="bento-card md:col-span-5 glass-natural-interactive rounded-3xl p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#20232a] text-[#d4a373] flex items-center justify-center border border-white/[0.06]">
                <Lock className="w-5 h-5" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#d4a373]/10 text-[#d4a373] font-code text-xs border border-[#d4a373]/25">
                Zero Vulnerability Gate
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f4f1ea] mb-2">
              DevSecOps &amp; Compliance
            </h3>
            <p className="font-body text-[#9c978d] text-sm leading-relaxed mb-6">
              Automated image vulnerability scanning, static code analysis, and dynamic secret injection in CI/CD lifecycles.
            </p>

            {/* Simulated Live CI/CD Pipeline Status */}
            <div className="space-y-2 font-code text-xs">
              {pipelineStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#121417] border border-white/[0.05]"
                >
                  <div className="flex items-center gap-2">
                    {stage.status === 'passed' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-[#84a98c]" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-[#d4a373] animate-spin" />
                    )}
                    <span className="text-[#d6d0c4] text-xs">{stage.name}</span>
                  </div>
                  <span className={`text-[11px] font-medium ${stage.status === 'passed' ? 'text-[#84a98c]' : 'text-[#d4a373]'}`}>
                    {stage.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {['HashiCorp Vault', 'Trivy', 'SonarQube', 'TFSec', 'Checkov', 'Black Duck'].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-[#16181d] text-xs font-code text-[#d6d0c4] border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card 3: FinOps & 30% Cloud Savings (Span 4) */}
        <div className="bento-card md:col-span-4 glass-natural-interactive rounded-3xl p-6 flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#20232a] text-[#84a98c] flex items-center justify-center mb-4 border border-white/[0.06]">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#f4f1ea] mb-2">
              FinOps &amp; Cost Optimization
            </h3>
            <p className="font-body text-[#9c978d] text-xs leading-relaxed mb-4">
              Saved up to 30% compute costs on AKS via CAST AI rightsizing, Horizontal Pod Autoscaling (HPA), and automated FinOps dashboards.
            </p>
            <div className="p-3.5 rounded-xl bg-[#121417] border border-white/[0.05] font-code text-xs space-y-1.5">
              <div className="flex justify-between text-[#9c978d]">
                <span>Workload Tuning:</span>
                <span className="text-[#84a98c] font-bold">30% Saved</span>
              </div>
              <div className="flex justify-between text-[#9c978d]">
                <span>Rightsizing:</span>
                <span className="text-[#d6d0c4]">CAST AI</span>
              </div>
              <div className="flex justify-between text-[#9c978d]">
                <span>Forecasting:</span>
                <span className="text-[#d6d0c4]">Kubecost</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {['CAST AI', 'Kubecost', 'HPA', 'Azure Monitor'].map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-[#16181d] text-[11px] font-code text-[#9c978d] border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card 4: CI/CD Engines & GitOps (Span 4) */}
        <div className="bento-card md:col-span-4 glass-natural-interactive rounded-3xl p-6 flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#20232a] text-[#d4a373] flex items-center justify-center mb-4 border border-white/[0.06]">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#f4f1ea] mb-2">
              CI/CD Automation &amp; GitOps
            </h3>
            <p className="font-body text-[#9c978d] text-xs leading-relaxed mb-4">
              Streamlined SQL DACPAC and microservice pipelines, cutting deployment time by 20% to 70% with Argo CD zero-downtime rollouts.
            </p>
            <div className="p-3.5 rounded-xl bg-[#121417] border border-white/[0.05] font-code text-xs space-y-1.5">
              <div className="flex justify-between text-[#9c978d]">
                <span>Deploy Speed:</span>
                <span className="text-[#d4a373] font-bold">70% Faster</span>
              </div>
              <div className="flex justify-between text-[#9c978d]">
                <span>Database CI:</span>
                <span className="text-[#d6d0c4]">SQL DACPAC</span>
              </div>
              <div className="flex justify-between text-[#9c978d]">
                <span>Rollout Strategy:</span>
                <span className="text-[#d6d0c4]">Canary / Helm</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {['Azure DevOps', 'GitHub Actions', 'Jenkins', 'Argo CD', 'Helm'].map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-[#16181d] text-[11px] font-code text-[#9c978d] border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card 5: AI-Powered DevOps & Observability (Span 4) */}
        <div className="bento-card md:col-span-4 glass-natural-interactive rounded-3xl p-6 flex flex-col justify-between group">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-[#20232a] text-[#84a98c] flex items-center justify-center mb-4 border border-white/[0.06]">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#f4f1ea] mb-2">
              AI Ops &amp; Full Observability
            </h3>
            <p className="font-body text-[#9c978d] text-xs leading-relaxed mb-4">
              Reduced MTTR by 40% with AI SOP workflows, deployed private LLaMA on VMs, and monitored with Prometheus &amp; Grafana (15% fewer outages).
            </p>
            <div className="p-3.5 rounded-xl bg-[#121417] border border-white/[0.05] font-code text-xs space-y-1.5">
              <div className="flex justify-between text-[#9c978d]">
                <span>MTTR Reduction:</span>
                <span className="text-[#84a98c] font-bold">-40% Faster</span>
              </div>
              <div className="flex justify-between text-[#9c978d]">
                <span>LLM Ops:</span>
                <span className="text-[#d6d0c4]">LLaMA on VM</span>
              </div>
              <div className="flex justify-between text-[#9c978d]">
                <span>Telemetry:</span>
                <span className="text-[#d6d0c4]">EFK + Jaeger</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {['LLaMA', 'Prometheus', 'Grafana', 'EFK', 'Jaeger', 'Datadog'].map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-[#16181d] text-[11px] font-code text-[#9c978d] border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
