import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ExternalLink, 
  CheckCircle2,
  Boxes
} from 'lucide-react';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  diagram: string[];
  terminalLogs: string[];
}

const projectsData: Project[] = [
  {
    id: 'multicloud-aks',
    title: 'Multi-Cloud Landing Zone & AKS Optimization',
    category: 'Azure & AWS • Infrastructure as Code • Kubernetes',
    tagline: 'Automated Multi-Cloud Infrastructure with Terraform Workspaces & Zero-Downtime AKS Rollouts',
    description: 'Architected and deployed enterprise landing zones across Azure and AWS using Terraform with modular workspaces for environment isolation. Implemented VNet peering, NSGs, and blue-green canary deployments with Helm on AKS.',
    impactMetrics: [
      { label: 'Deployment Time', value: '-20% Faster' },
      { label: 'Release SLA', value: 'Zero-Downtime' },
      { label: 'Outages Prevented', value: '15% Fewer' },
    ],
    tags: ['Azure', 'AWS', 'Terraform', 'Kubernetes (AKS)', 'Helm Charts', 'VNet Peering'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    accentColor: 'text-[#84a98c]',
    badgeBg: 'bg-[#84a98c]/10 text-[#84a98c] border-[#84a98c]/25',
    borderColor: 'border-white/[0.08] hover:border-[#84a98c]/30',
    diagram: [
      'Terraform Workspace Plan -> Azure & AWS Landing Zones',
      'VNet Peering & Network Security Group (NSG) Policy Sync',
      'AKS Cluster Provisioning with Ingress Controller',
      'Blue-Green & Canary Rollout via Helm Charts',
    ],
    terminalLogs: [
      '[TERRAFORM] Applying workspace "production-azure-eastus2": 84 resources managed',
      '[VNET] Peering active between Hub VNet and AKS Spoke VNet: 0 dropped packets',
      '[HELM] Upgraded release "payment-gateway-v4" with Canary 10% traffic split',
      '[STATUS] Zero-downtime release confirmed on AKS cluster.',
    ],
  },
  {
    id: 'devsecops-pipeline',
    title: 'Enterprise DevSecOps & Security Gate',
    category: 'Security & Continuous Compliance',
    tagline: 'Automated CI/CD Vulnerability Scanning & Dynamic Secret Injection',
    description: 'Embedded comprehensive DevSecOps guardrails into Azure DevOps and GitHub Actions pipelines. Integrated Trivy container scanning, SonarQube static code quality gates, HashiCorp Vault secrets, and Black Duck dependency risk analysis.',
    impactMetrics: [
      { label: 'Security Gate', value: '100% Automated' },
      { label: 'Secrets Stored', value: 'Vault Encrypted' },
      { label: 'Image Scans', value: 'Trivy Verified' },
    ],
    tags: ['HashiCorp Vault', 'Trivy', 'SonarQube', 'TFSec', 'Checkov', 'Black Duck', 'Azure DevOps'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    accentColor: 'text-[#d4a373]',
    badgeBg: 'bg-[#d4a373]/10 text-[#d4a373] border-[#d4a373]/25',
    borderColor: 'border-white/[0.08] hover:border-[#d4a373]/30',
    diagram: [
      'Source Commit -> GitHub Actions / Azure DevOps Trigger',
      'SonarQube Static Analysis & Quality Gate Validation',
      'Docker Container Build & Trivy / Black Duck Scan',
      'HashiCorp Vault Dynamic Secret Injection -> Deployment',
    ],
    terminalLogs: [
      '[SECURITY] Trivy image scan passed: 0 Critical / 0 High vulnerabilities',
      '[SONARQUBE] Quality Gate passed: Code coverage 88.4%, 0 Security Hotspots',
      '[VAULT] Temporary database token issued with 1h TTL (FIPS 140-2)',
      '[COMPLIANCE] Artifact signed and pushed to Azure Container Registry.',
    ],
  },
  {
    id: 'finops-optimization',
    title: 'Kubernetes FinOps & 30% Cost Savings',
    category: 'Cloud Cost Optimization & Autonomous Scaling',
    tagline: 'Kubernetes Workload Tuning & Autoscaling on AKS using CAST AI & HPA',
    description: 'Spearheaded cloud cost optimization initiative across Kubernetes clusters for enterprise clients (Capital One, IBM). Implemented Horizontal Pod Autoscaling (HPA) and CAST AI machine learning rightsizing to achieve up to 30% monthly compute savings.',
    impactMetrics: [
      { label: 'Cloud Cost Saved', value: 'Up to 30%' },
      { label: 'Scaling Method', value: 'CAST AI + HPA' },
      { label: 'Reporting', value: 'Automated Dashboards' },
    ],
    tags: ['CAST AI', 'Kubecost', 'AKS', 'HPA', 'FinOps', 'Azure Monitor', 'Python'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    accentColor: 'text-[#84a98c]',
    badgeBg: 'bg-[#84a98c]/10 text-[#84a98c] border-[#84a98c]/25',
    borderColor: 'border-white/[0.08] hover:border-[#84a98c]/30',
    diagram: [
      'Cluster Metrics Ingestion -> Prometheus & Azure Monitor',
      'CAST AI Workload Analyzer & Rightsizing Engine',
      'Horizontal Pod Autoscaling (HPA) Policy Trigger',
      'Automated Cost Dashboard & Executive Reporting',
    ],
    terminalLogs: [
      '[CAST AI] Cluster node rightsizing complete: 18 nodes consolidated to 12',
      '[HPA] Target CPU utilization stabilized at 68% across all namespaces',
      '[SAVINGS] Monthly cloud compute spend decreased by 30.2%',
      '[FINOPS] Cost forecast report generated and dispatched to finance.',
    ],
  },
  {
    id: 'ai-incident-ops',
    title: 'AI-Powered Incident Response & Local LLM Ops',
    category: 'AIOps • Generative AI & Automation',
    tagline: 'Automated SOP Incident Resolution & Offline LLaMA Inference Platform',
    description: 'Reduced Mean Time to Resolution (MTTR) by 40% via automated incident handling workflows with ChatGPT SOP bots and JIRA webhook integrations. Deployed and tuned private LLaMA LLM instances on isolated virtual machines for secure, offline ops automation.',
    impactMetrics: [
      { label: 'MTTR Reduction', value: '-40% Faster' },
      { label: 'LLM Platform', value: 'Private LLaMA' },
      { label: 'Workflow Bot', value: 'JIRA Webhook' },
    ],
    tags: ['LLaMA', 'ChatGPT SOPs', 'Python', 'Azure Functions', 'JIRA Webhooks', 'Bash'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    accentColor: 'text-[#d4a373]',
    badgeBg: 'bg-[#d4a373]/10 text-[#d4a373] border-[#d4a373]/25',
    borderColor: 'border-white/[0.08] hover:border-[#d4a373]/30',
    diagram: [
      'Alert Triggered (Site24x7 / CloudWatch) -> Azure Function',
      'AI SOP Engine (LLaMA / ChatGPT) Diagnoses Root Cause',
      'Automated Remediation Script or JIRA Escalation Dispatched',
      'Post-Mortem Summary & MTTR Metrics Recorded',
    ],
    terminalLogs: [
      '[ALERT] High latency detected on pod "auth-service-7f8d" (p99 > 850ms)',
      '[AIOPS] Executing diagnosis SOP via local LLaMA engine...',
      '[ROOT CAUSE] Database connection pool exhausted; recycling connection pool',
      '[RESOLVED] p99 latency returned to 42ms; MTTR: 1m 40s.',
    ],
  },
];

export const ProjectsStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<'diagram' | 'logs'>('diagram');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning card stack effect
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        if (index < projectsData.length - 1) {
          gsap.to(card, {
            scale: 0.96 - index * 0.02,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: cardsRef.current[index + 1],
              start: 'top 85%',
              end: 'top 20%',
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs mb-3">
          <Boxes className="w-3.5 h-3.5" />
          <span>PRODUCTION ARCHITECTURES &amp; CASE STUDIES</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#f4f1ea] tracking-tight">
          Featured Enterprise Deliverables
        </h2>
        <p className="font-body text-[#9c978d] text-base sm:text-lg max-w-2xl mt-4">
          Detailed technical case studies showcasing multi-cloud migrations, DevSecOps gates, Kubernetes cost optimization, and AI automation.
        </p>
      </div>

      {/* Stacking Project Cards */}
      <div className="flex flex-col gap-16 relative">
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[idx] = el; }}
            className={`sticky top-24 rounded-3xl p-6 sm:p-10 bg-[#15171b] border ${project.borderColor} shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500`}
          >
            {/* Header Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
              <div className="flex items-center gap-3">
                <span className="font-code text-xs text-[#68645c]">
                  CASE STUDY #{idx + 1}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-code border ${project.badgeBg}`}>
                  {project.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#1c1f26] border border-white/[0.08] text-[#9c978d] hover:text-[#f4f1ea] transition-colors"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#1c1f26] border border-white/[0.08] text-[#9c978d] hover:text-[#f4f1ea] transition-colors"
                  aria-label="Live Implementation"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#f4f1ea] mb-3">
                    {project.title}
                  </h3>
                  <div className="font-code text-xs text-[#d4a373] mb-4">
                    {project.tagline}
                  </div>
                  <p className="font-body text-[#9c978d] text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {project.impactMetrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-[#121417] border border-white/[0.05] text-center">
                        <div className="font-heading font-bold text-base sm:text-lg text-[#f4f1ea]">
                          {metric.value}
                        </div>
                        <div className="font-code text-[10px] text-[#9c978d] truncate mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full bg-[#1b1e25] text-xs font-code text-[#d6d0c4] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Diagram or Terminal Verification */}
              <div className="lg:col-span-6 bg-[#111317] rounded-2xl p-5 border border-white/[0.06]">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('diagram')}
                      className={`px-3 py-1 rounded-lg font-code text-xs font-medium transition-colors ${
                        activeTab === 'diagram'
                          ? 'bg-[#84a98c]/15 text-[#84a98c] border border-[#84a98c]/30'
                          : 'text-[#9c978d] hover:text-[#f4f1ea]'
                      }`}
                    >
                      Architecture Flow
                    </button>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className={`px-3 py-1 rounded-lg font-code text-xs font-medium transition-colors ${
                        activeTab === 'logs'
                          ? 'bg-[#d4a373]/15 text-[#d4a373] border border-[#d4a373]/30'
                          : 'text-[#9c978d] hover:text-[#f4f1ea]'
                      }`}
                    >
                      Execution Logs
                    </button>
                  </div>
                  <span className="font-code text-[11px] text-[#68645c]">
                    PRODUCTION VERIFIED
                  </span>
                </div>

                {activeTab === 'diagram' ? (
                  <div className="space-y-3 font-code text-xs">
                    {project.diagram.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#16181e] border border-white/[0.04]">
                        <CheckCircle2 className="w-4 h-4 text-[#84a98c] shrink-0 mt-0.5" />
                        <span className="text-[#d6d0c4] leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 font-code text-xs text-[#9c978d] bg-[#0c0d10] p-3 rounded-xl border border-white/[0.04] overflow-x-auto">
                    {project.terminalLogs.map((log, lIdx) => (
                      <div key={lIdx} className="leading-relaxed">
                        <span className="text-[#84a98c]">{log.split(' ')[0]}</span>{' '}
                        <span>{log.substring(log.indexOf(' ') + 1)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
