import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '../context/SmoothScrollProvider';
import { Sparkles, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const EditorialOpening: React.FC = () => {
  const { scrollTo } = useLenis();
  const openingRef = useRef<HTMLDivElement>(null);
  const posterWrapperRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const titleBannerRef = useRef<HTMLDivElement>(null);

  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!posterWrapperRef.current || !revealLayerRef.current) return;
      const rect = posterWrapperRef.current.getBoundingClientRect();

      // Check if cursor/touch is within bounds of the poster
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        setIsInside(true);
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Reveal the backside picture at the cursor touchpoint (95px radius, no glow)
        const maskValue = `radial-gradient(circle 95px at ${x}px ${y}px, black 0%, black 55%, transparent 100%)`;
        revealLayerRef.current.style.webkitMaskImage = maskValue;
        revealLayerRef.current.style.maskImage = maskValue;
        revealLayerRef.current.style.opacity = '1';
      } else {
        setIsInside(false);
        if (revealLayerRef.current) {
          revealLayerRef.current.style.opacity = '0';
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: openingRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Zoom and soft blur poster on scroll
      tl.to(posterWrapperRef.current, {
        scale: 1.25,
        y: -40,
        opacity: 0,
        filter: 'blur(12px)',
        ease: 'power2.inOut',
      }, 0);

      // 2. Fade out scroll prompt
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 30,
        ease: 'power1.out',
      }, 0);

      // 3. Fade out top badge
      tl.to(titleBannerRef.current, {
        opacity: 0,
        y: -30,
        ease: 'power1.out',
      }, 0);

    }, openingRef);

    return () => ctx.revert();
  }, []);

  const handleEnterClick = () => {
    scrollTo('#hero', { offset: 0, duration: 1.5 });
  };

  return (
    <section
      id="opening"
      ref={openingRef}
      className="relative w-full h-screen bg-[#0e0f12] flex flex-col items-center justify-center overflow-hidden z-20 select-none py-4"
    >
      {/* Subtle Natural Grid */}
      <div className="absolute inset-0 bg-natural-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#52796f]/10 via-[#2f3e46]/10 to-[#d4a373]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Banner Tag */}
      <div
        ref={titleBannerRef}
        className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-[#15171b]/90 border border-white/[0.08] backdrop-blur-md shadow-lg"
      >
        <span className="w-2 h-2 rounded-full bg-[#84a98c] shadow-[0_0_8px_#84a98c]" />
        <span className="font-code text-[10px] sm:text-xs text-[#d6d0c4] tracking-widest uppercase">
          BOSU KODELLI // SENIOR DEVOPS ENGINEER
        </span>
        <span className="text-[#68645c]">|</span>
        <span className="font-code text-[10px] sm:text-[11px] text-[#d4a373]">AZURE &amp; AWS CLOUD</span>
      </div>

      {/* Main Poster Container with Spotlight Lens Illumination Reveal */}
      <div
        ref={posterWrapperRef}
        onClick={handleEnterClick}
        className="relative h-[76vh] sm:h-[80vh] aspect-[2/3] max-w-[92vw] max-h-[820px] rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)] border border-white/[0.12] bg-[#121417] cursor-pointer group"
      >
        {/* BASE LAYER: Editorial Poster Image with Deep Ambient Tone */}
        <img
          src="/assets/bose-poster.jpg"
          alt="Bosu Kodelli - Cloud & DevOps Architecture Editorial Poster"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
        />

        {/* SPOTLIGHT REVEAL LAYER: Crisp Lens Illumination at Cursor Touchpoint (No Glowing Ring) */}
        <div
          id="reveal-img"
          ref={revealLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150 opacity-0"
          style={{
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        >
          <img
            src="/assets/bose-poster.jpg"
            alt="Bosu Kodelli - Illuminated Spotlight"
            className="w-full h-full object-cover object-center filter brightness-[1.18] contrast-[1.1]"
          />
        </div>

        {/* Floating Indicator Badge */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center pointer-events-none">
          <div className={`px-4 py-1.5 rounded-full bg-black/75 border border-white/[0.15] backdrop-blur-md text-[#d6d0c4] font-code text-[11px] flex items-center gap-2 shadow-xl transition-opacity duration-300 ${
            isInside ? 'opacity-90' : 'opacity-70'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373] animate-pulse" />
            <span>{isInside ? 'Spotlight Active' : 'Hover to Explore Poster Details'}</span>
          </div>
        </div>
      </div>

      {/* Bottom DevOps Symbol Scroll Prompt Indicator with Enhanced Glow */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleEnterClick}
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 cursor-pointer group"
      >
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#15171b]/95 border border-[#84a98c]/30 shadow-[0_0_25px_rgba(132,169,140,0.3)] backdrop-blur-xl group-hover:border-[#84a98c]/60 group-hover:shadow-[0_0_35px_rgba(132,169,140,0.5)] transition-all duration-300">
          {/* Animated SVG DevOps Infinity Symbol with Glow */}
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 40 20" className="w-9 h-4.5 overflow-visible">
              <path
                d="M 20,10 C 14,2 6,2 6,10 C 6,18 14,18 20,10 C 26,2 34,2 34,10 C 34,18 26,18 20,10 Z"
                fill="none"
                stroke="#84a98c"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40 filter blur-[2px]"
              />
              <path
                d="M 20,10 C 14,2 6,2 6,10 C 6,18 14,18 20,10 C 26,2 34,2 34,10 C 34,18 26,18 20,10 Z"
                fill="none"
                stroke="#84a98c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_0_6px_#84a98c]"
              />
              <circle
                cx="6"
                cy="10"
                r="3"
                fill="#d4a373"
                className="animate-ping opacity-90"
              />
              <circle
                cx="6"
                cy="10"
                r="2"
                fill="#f4f1ea"
                className="filter drop-shadow-[0_0_6px_#d4a373]"
              />
            </svg>
          </div>
          <span className="font-code text-[10px] sm:text-[11px] text-[#f4f1ea] tracking-widest uppercase group-hover:text-[#84a98c] transition-colors font-medium">
            SCROLL VIA DEVOPS LOOP
          </span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#84a98c] filter drop-shadow-[0_0_4px_#84a98c]" />
        </div>
      </div>
    </section>
  );
};
