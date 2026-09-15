import React, { useEffect, useState, useRef } from 'react';
import { useLenis } from '../context/SmoothScrollProvider';
import { ChevronUp, ChevronDown, RotateCcw, Activity } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  targetId: string;
  fraction: number; // 0 to 1 position along the loop
  description: string;
}

const devOpsStages: Stage[] = [
  { id: 'plan', name: 'PLAN', targetId: 'opening', fraction: 0.0, description: 'Architecture & Poster Opening' },
  { id: 'code', name: 'CODE', targetId: 'about', fraction: 0.14, description: 'Core Engineering Pillars' },
  { id: 'build', name: 'BUILD', targetId: 'skills', fraction: 0.28, description: 'Toolchain & IaC Stack' },
  { id: 'test', name: 'TEST', targetId: 'skills', fraction: 0.42, description: 'DevSecOps & Compliance' },
  { id: 'release', name: 'RELEASE', targetId: 'projects', fraction: 0.58, description: 'Canary & GitOps Deliverables' },
  { id: 'deploy', name: 'DEPLOY', targetId: 'experience', fraction: 0.72, description: 'Enterprise Milestones' },
  { id: 'operate', name: 'OPERATE', targetId: 'terminal', fraction: 0.86, description: 'Interactive DevOps Shell' },
  { id: 'monitor', name: 'MONITOR', targetId: 'contact', fraction: 0.98, description: 'Observability & Connection' },
];

export const DevOpsScrollController: React.FC = () => {
  const { scrollTo } = useLenis();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<Stage>(devOpsStages[0]);
  const [isExpanded, setIsExpanded] = useState(true);
  const pathRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGCircleElement>(null);
  const travelerHaloRef = useRef<SVGCircleElement>(null);

  // Lemniscate / Infinity Loop SVG Path starting at PLAN leftmost apex (20, 40)
  // Size: 160 x 80
  const infinityPath = "M 20,40 C 20,18 60,18 80,40 C 100,62 140,62 140,40 C 140,18 100,18 80,40 C 60,62 20,62 20,40 Z";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Update position of traveler node along infinity path
      if (pathRef.current && travelerRef.current) {
        const totalLength = pathRef.current.getTotalLength();
        const point = pathRef.current.getPointAtLength(progress * totalLength);
        travelerRef.current.setAttribute('cx', point.x.toString());
        travelerRef.current.setAttribute('cy', point.y.toString());

        if (travelerHaloRef.current) {
          travelerHaloRef.current.setAttribute('cx', point.x.toString());
          travelerHaloRef.current.setAttribute('cy', point.y.toString());
        }
      }

      // Determine active stage based on scroll progress
      let active = devOpsStages[0];
      for (let i = devOpsStages.length - 1; i >= 0; i--) {
        if (progress >= devOpsStages[i].fraction - 0.04) {
          active = devOpsStages[i];
          break;
        }
      }
      setCurrentStage(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', handleScroll);
    handleScroll();
    requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  const handleStageClick = (stage: Stage) => {
    scrollTo(`#${stage.targetId}`, { offset: -40, duration: 1.3 });
  };

  const scrollNext = () => {
    const nextIndex = (devOpsStages.findIndex((s) => s.id === currentStage.id) + 1) % devOpsStages.length;
    handleStageClick(devOpsStages[nextIndex]);
  };

  const scrollPrev = () => {
    const currIndex = devOpsStages.findIndex((s) => s.id === currentStage.id);
    const prevIndex = currIndex <= 0 ? devOpsStages.length - 1 : currIndex - 1;
    handleStageClick(devOpsStages[prevIndex]);
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-40 select-none flex flex-col items-end gap-2 pointer-events-auto">
      
      {/* Main Interactive DevOps Controller Widget with Radiant Glow */}
      <div className={`transition-all duration-300 rounded-3xl bg-[#131519]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_0_35px_rgba(132,169,140,0.2),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative ${
        isExpanded ? 'p-4 w-[220px]' : 'p-2.5 w-auto'
      }`}>
        
        {/* Soft Ambient Inner Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#84a98c]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#d4a373]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.08] mb-3 relative z-10">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84a98c] opacity-90"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84a98c] shadow-[0_0_8px_#84a98c]"></span>
            </span>
            <span className="font-code text-[11px] font-bold text-[#f4f1ea] group-hover:text-[#a3b18a] transition-colors drop-shadow-sm">
              DEVOPS LOOP
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-[#d4a373]/15 text-[#d4a373] border border-[#d4a373]/30 font-code text-[10px] font-bold shadow-[0_0_10px_rgba(212,163,115,0.3)]">
              {Math.round(scrollProgress * 100)}%
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg bg-[#1c1f26] text-[#9c978d] hover:text-[#f4f1ea] text-[10px] border border-white/[0.06]"
              aria-label="Toggle DevOps Scroll Controller"
            >
              <RotateCcw className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="flex flex-col items-center relative z-10">
            
            {/* DevOps Infinity Loop SVG Controller with Intense Dynamic Glow */}
            <div className="relative w-full aspect-[2/1] my-1 flex items-center justify-center">
              <svg viewBox="0 0 160 80" className="w-full h-full overflow-visible">
                <defs>
                  {/* Glowing Filter Definitions */}
                  <filter id="infinity-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gradient Along Active DevOps Stroke */}
                  <linearGradient id="devopsGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84a98c" />
                    <stop offset="50%" stopColor="#a3b18a" />
                    <stop offset="100%" stopColor="#d4a373" />
                  </linearGradient>
                </defs>

                {/* Base Track Ambient Path */}
                <path
                  d={infinityPath}
                  fill="none"
                  stroke="rgba(244, 241, 234, 0.08)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Second Layer Outer Diffuse Glow Path */}
                <path
                  d={infinityPath}
                  fill="none"
                  stroke="#84a98c"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset={400 - scrollProgress * 400}
                  className="opacity-40 filter blur-[4px]"
                />

                {/* Main Razor-Sharp Glowing Active Path */}
                <path
                  ref={pathRef}
                  d={infinityPath}
                  fill="none"
                  stroke="url(#devopsGlowGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset={400 - scrollProgress * 400}
                  filter="url(#infinity-glow)"
                  className="transition-all duration-100"
                />

                {/* Stage Hotspots on the Infinity Loop */}
                {[
                  { cx: 20, cy: 40, stage: devOpsStages[0] }, // Plan
                  { cx: 42, cy: 18, stage: devOpsStages[1] }, // Code
                  { cx: 64, cy: 30, stage: devOpsStages[2] }, // Build
                  { cx: 80, cy: 40, stage: devOpsStages[3] }, // Test / Intersection
                  { cx: 96, cy: 50, stage: devOpsStages[4] }, // Release
                  { cx: 118, cy: 62, stage: devOpsStages[5] }, // Deploy
                  { cx: 140, cy: 40, stage: devOpsStages[6] }, // Operate
                  { cx: 118, cy: 18, stage: devOpsStages[7] }, // Monitor
                ].map((node, idx) => {
                  const isActive = currentStage.id === node.stage.id;
                  return (
                    <g
                      key={idx}
                      onClick={() => handleStageClick(node.stage)}
                      className="cursor-pointer group"
                    >
                      {isActive && (
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r="9"
                          fill="none"
                          stroke="#d4a373"
                          strokeWidth="1.5"
                          className="animate-ping opacity-60"
                        />
                      )}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={isActive ? "6" : "3.5"}
                        fill={isActive ? "#d4a373" : "#181b22"}
                        stroke={isActive ? "#f4f1ea" : "rgba(244, 241, 234, 0.4)"}
                        strokeWidth="1.5"
                        className={`transition-all duration-300 ${
                          isActive ? "filter drop-shadow-[0_0_8px_#d4a373]" : "group-hover:stroke-[#84a98c] group-hover:r-5"
                        }`}
                      />
                    </g>
                  );
                })}

                {/* Glowing Halo Traveler Particle */}
                <circle
                  ref={travelerHaloRef}
                  cx="20"
                  cy="40"
                  r="10"
                  fill="#84a98c"
                  className="opacity-40 filter blur-[3px] pointer-events-none"
                />

                {/* Core Luminous Traveler Node */}
                <circle
                  ref={travelerRef}
                  cx="20"
                  cy="40"
                  r="5.5"
                  fill="#f4f1ea"
                  stroke="#84a98c"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_12px_#84a98c] drop-shadow-[0_0_20px_#d4a373] pointer-events-none"
                />
              </svg>
            </div>

            {/* Current Stage Indicator Banner with Glow */}
            <div
              onClick={() => handleStageClick(currentStage)}
              className="w-full mt-2 p-2 rounded-2xl bg-[#1a1d24] hover:bg-[#222630] border border-[#84a98c]/30 shadow-[0_0_15px_rgba(132,169,140,0.15)] text-center cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-1.5 font-code text-xs font-bold text-[#84a98c] drop-shadow-sm">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>PHASE: {currentStage.name}</span>
              </div>
              <div className="text-[10px] font-body text-[#d6d0c4] truncate mt-0.5">
                {currentStage.description}
              </div>
            </div>

            {/* Navigation Steppers (Scroll Up / Down along Lifecycle) */}
            <div className="flex items-center justify-between w-full mt-2.5 pt-2 border-t border-white/[0.08] font-code text-[10px]">
              <button
                onClick={scrollPrev}
                className="flex items-center gap-1 text-[#9c978d] hover:text-[#f4f1ea] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/[0.05]"
                title="Previous DevOps Stage"
              >
                <ChevronUp className="w-3.5 h-3.5 text-[#84a98c]" />
                <span>PREV</span>
              </button>

              <span className="text-[#68645c]">|</span>

              <button
                onClick={scrollNext}
                className="flex items-center gap-1 text-[#9c978d] hover:text-[#f4f1ea] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-white/[0.05]"
                title="Next DevOps Stage"
              >
                <span>NEXT</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#d4a373]" />
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
