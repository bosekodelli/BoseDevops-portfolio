import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Play, RefreshCw } from 'lucide-react';

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const initialGreeting: CommandOutput = {
    command: 'welcome',
    response: (
      <div className="space-y-2 text-[#d6d0c4]">
        <div className="text-[#84a98c] font-bold">
          Bosu Kodelli — DevOps Shell v4.2.0 (Azure &amp; AWS Multi-Cloud)
        </div>
        <p className="text-[#9c978d]">
          Type <span className="text-[#d4a373] font-bold">help</span> to view system commands or click any quick query below.
        </p>
      </div>
    ),
  };

  const [history, setHistory] = useState<CommandOutput[]>([initialGreeting]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (history.length > 1 && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let res: React.ReactNode;

    switch (trimmed) {
      case 'help':
        res = (
          <div className="space-y-1.5 text-[#d6d0c4]">
            <div className="text-[#d4a373] font-semibold mb-1">Available System Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div><span className="text-[#84a98c] font-bold">neofetch</span> — Print engineer profile &amp; tooling</div>
              <div><span className="text-[#84a98c] font-bold">skills</span> — List cloud, CI/CD &amp; DevSecOps stack</div>
              <div><span className="text-[#84a98c] font-bold">experience</span> — View roles at Jeta Software (Capital One/IBM)</div>
              <div><span className="text-[#84a98c] font-bold">projects</span> — View enterprise case studies</div>
              <div><span className="text-[#84a98c] font-bold">finops</span> — Inspect 30% cloud cost savings metrics</div>
              <div><span className="text-[#84a98c] font-bold">whoami</span> — Current session identity</div>
              <div><span className="text-[#84a98c] font-bold">contact</span> — Get direct email &amp; phone details</div>
              <div><span className="text-[#84a98c] font-bold">clear</span> — Wipe terminal history</div>
            </div>
          </div>
        );
        break;

      case 'neofetch':
        res = (
          <div className="flex flex-col sm:flex-row gap-4 font-code text-xs text-[#d6d0c4] py-2">
            <pre className="text-[#84a98c] font-bold leading-tight select-none">
{`    ___
   /   \\
  |  BK |
   \\___/`}
            </pre>
            <div className="space-y-1">
              <div><span className="text-[#84a98c] font-bold">bosu</span><span className="text-[#68645c]">@</span><span className="text-[#d4a373] font-bold">azure-aws-mesh</span></div>
              <div className="text-[#68645c]">----------------------------</div>
              <div><span className="text-[#9c978d] font-semibold">Engineer:</span> Bosu Kodelli</div>
              <div><span className="text-[#9c978d] font-semibold">Title:</span> Senior DevOps Engineer (6+ Years)</div>
              <div><span className="text-[#9c978d] font-semibold">Company:</span> Jeta Software (Clients: Capital One, IBM)</div>
              <div><span className="text-[#9c978d] font-semibold">Clouds:</span> Microsoft Azure, Amazon AWS, GCP</div>
              <div><span className="text-[#9c978d] font-semibold">Orchestration:</span> Kubernetes (AKS/EKS), Helm, Argo CD</div>
              <div><span className="text-[#9c978d] font-semibold">IaC:</span> Terraform, Terraform Workspaces, Ansible</div>
              <div><span className="text-[#9c978d] font-semibold">Status:</span> Open for challenging Remote / Hybrid roles</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-1.5 text-xs text-[#d6d0c4]">
            <div><span className="text-[#84a98c] font-bold">Cloud Platforms:</span> Azure, AWS, GCP</div>
            <div><span className="text-[#84a98c] font-bold">CI/CD:</span> Azure DevOps, GitHub Actions, Jenkins, GitLab, Argo CD</div>
            <div><span className="text-[#84a98c] font-bold">IaC &amp; Config:</span> Terraform, Terraform Workspaces, Ansible, Helm Charts</div>
            <div><span className="text-[#84a98c] font-bold">Containers:</span> Kubernetes (AKS &amp; EKS), Docker, Podman, Docker Swarm</div>
            <div><span className="text-[#84a98c] font-bold">Security &amp; DevSecOps:</span> HashiCorp Vault, Trivy, SonarQube, Git-Secrets, TFSec, Checkov, Black Duck</div>
            <div><span className="text-[#84a98c] font-bold">Monitoring &amp; Observability:</span> Prometheus, Grafana, EFK Stack, Datadog APM, Azure Monitor, CloudWatch, Jaeger, Site24x7</div>
            <div><span className="text-[#84a98c] font-bold">FinOps &amp; AI:</span> CAST AI, Kubecost, LLaMA on VM, ChatGPT SOPs, Copilot</div>
            <div><span className="text-[#84a98c] font-bold">Scripting:</span> Python, PowerShell, Bash/Shell</div>
          </div>
        );
        break;

      case 'experience':
        res = (
          <div className="space-y-1.5 text-xs text-[#d6d0c4]">
            <div>• <span className="text-[#84a98c] font-bold">May 2019 – Present:</span> Senior DevOps Engineer @ Jeta Software (India) Pvt Ltd</div>
            <div className="text-[#9c978d] pl-3">Clients: Capital One - US, IBM</div>
            <div className="text-[#9c978d] pl-3">• Built multi-cloud Terraform landing zones across Azure &amp; AWS.</div>
            <div className="text-[#9c978d] pl-3">• Cut deployment time by 20% in Azure DevOps &amp; up to 70% in Jenkins.</div>
            <div className="text-[#9c978d] pl-3">• Deployed zero-downtime blue-green Helm releases on AKS with Argo CD.</div>
            <div className="text-[#9c978d] pl-3">• Saved 30% on AKS compute with CAST AI &amp; reduced MTTR by 40% with AI SOPs.</div>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 text-xs text-[#d6d0c4]">
            <div><span className="text-[#d4a373] font-bold">1. Multi-Cloud Landing Zone &amp; AKS:</span> Automated Terraform Workspaces &amp; Blue/Green Helm on AKS.</div>
            <div><span className="text-[#d4a373] font-bold">2. Enterprise DevSecOps Gate:</span> HashiCorp Vault secrets, Trivy image scans, SonarQube quality gates.</div>
            <div><span className="text-[#d4a373] font-bold">3. Kubernetes FinOps:</span> 30% monthly compute savings on AKS using CAST AI rightsizing &amp; HPA.</div>
            <div><span className="text-[#d4a373] font-bold">4. AI-Powered DevOps:</span> 40% faster MTTR with ChatGPT SOPs &amp; private LLaMA instance on VM.</div>
          </div>
        );
        break;

      case 'finops':
        res = (
          <div className="space-y-1.5 text-xs text-[#d6d0c4]">
            <div className="text-[#84a98c] font-bold">FinOps &amp; Cloud Cost Optimization Metrics:</div>
            <div>• Tooling: CAST AI Machine Learning Autoscaler + Kubernetes HPA + Kubecost</div>
            <div>• Cloud Compute Savings: Up to 30% monthly reduction on AKS</div>
            <div>• Impact: Node density increased 35%, automated forecasting dashboards for leadership</div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="text-xs text-[#d6d0c4]">
            visitor@portfolio-guest (Role: Recruiter / Engineering Leader / Architect)
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs text-[#d6d0c4]">
            <div><span className="text-[#84a98c] font-bold">Email:</span> bose.kodelli09@gmail.com</div>
            <div><span className="text-[#84a98c] font-bold">Phone:</span> +91 9701237678</div>
            <div><span className="text-[#84a98c] font-bold">Location:</span> Remote / Hybrid</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        res = (
          <div className="text-xs text-amber-400">
            command not found: "{trimmed}". Type <span className="underline font-bold cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, response: res }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const quickQueries = ['help', 'neofetch', 'skills', 'experience', 'projects', 'finops', 'contact'];

  return (
    <section
      id="terminal"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] font-code text-xs mb-3">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>INTERACTIVE DEVOPS SHELL</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#f4f1ea] tracking-tight">
          Query Architecture &amp; Credentials
        </h2>
        <p className="font-body text-[#9c978d] text-sm sm:text-base max-w-xl mt-3">
          Explore technical accomplishments, toolchain configs, and enterprise metrics directly via the terminal.
        </p>
      </div>

      {/* Terminal Window Container */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111317] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#15171c] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#3a3d45]" />
            <span className="w-3 h-3 rounded-full bg-[#3a3d45]" />
            <span className="w-3 h-3 rounded-full bg-[#3a3d45]" />
            <span className="ml-2 font-code text-xs text-[#9c978d]">
              bosu@azure-aws-mesh:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCommand('clear')}
              className="p-1 rounded bg-[#1c1f26] border border-white/[0.06] text-[#9c978d] hover:text-[#f4f1ea] text-[10px] font-code flex items-center gap-1 px-2"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-[#131519] border-b border-white/[0.04] overflow-x-auto">
          <span className="font-code text-[11px] text-[#68645c] shrink-0">Quick Queries:</span>
          {quickQueries.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-0.5 rounded-full bg-[#181a20] hover:bg-[#20242c] border border-white/[0.06] text-[11px] font-code text-[#d6d0c4] hover:text-[#84a98c] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Play className="w-2.5 h-2.5 text-[#84a98c]" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Content Area */}
        <div
          ref={terminalBodyRef}
          className="p-5 font-code text-xs sm:text-sm min-h-[320px] max-h-[460px] overflow-y-auto space-y-4 bg-[#0e0f12]"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#9c978d]">
                <span className="text-[#84a98c]">bosu@cloud:~$</span>
                <span className="text-[#f4f1ea] font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.response}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-[#9c978d] pt-1">
            <span className="text-[#84a98c]">bosu@cloud:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#f4f1ea] font-code text-xs sm:text-sm focus:ring-0 p-0"
              placeholder="Type 'help' or click a command above..."
            />
            <button
              onClick={() => handleCommand(input)}
              className="p-1 rounded bg-[#181a20] text-[#9c978d] hover:text-[#84a98c]"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
