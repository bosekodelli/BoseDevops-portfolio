import React, { useState, useEffect } from 'react';
import { useLenis } from '../context/SmoothScrollProvider';
import { Terminal, Code2, Layers, Briefcase, Mail, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollTo } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current section
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'terminal', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', icon: Code2 },
    { label: 'Skills & Stack', href: '#skills', icon: Layers },
    { label: 'Case Studies', href: '#projects', icon: Sparkles },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Terminal', href: '#terminal', icon: Terminal },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -30, duration: 1.2 });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 sm:px-6 py-4 pointer-events-none ${
          !scrolled ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <nav
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 py-2 rounded-full transition-all duration-500 max-w-5xl w-full bg-[#14161a]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
        >
          {/* Logo / Personal Brand */}
          <button
            onClick={() => scrollTo(0, { duration: 1.2 })}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#22262d] border border-white/[0.12] p-[1px] shadow-sm transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
              <span className="font-heading font-bold text-xs text-[#d4a373] tracking-wider">
                BK
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-semibold text-xs tracking-tight text-[#f4f1ea] flex items-center gap-1.5">
                Bosu Kodelli
              </div>
              <div className="font-code text-[10px] text-[#9c978d] tracking-wide flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#84a98c]" />
                Senior DevOps Engineer
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#101114]/80 p-1 rounded-full border border-white/[0.05]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#84a98c]/15 text-[#a3b18a] border border-[#84a98c]/30 font-semibold'
                      : 'text-[#9c978d] hover:text-[#f4f1ea] hover:bg-white/[0.04]'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 opacity-70" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Availability Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84a98c]/10 border border-[#84a98c]/25 text-[#84a98c] text-[11px] font-code">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84a98c] inline-block" />
              <span>Remote / Hybrid</span>
            </div>

            {/* Contact CTA */}
            <button
              onClick={() => scrollTo('#contact', { offset: -20, duration: 1.4 })}
              className="relative group px-4 py-1.5 rounded-full bg-[#d4a373] text-[#0e0f12] text-xs font-semibold hover:bg-[#e2b78b] transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#9c978d] hover:text-[#f4f1ea]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0e0f12]/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6 py-12 md:hidden">
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <div className="text-xs font-code text-[#9c978d] uppercase tracking-widest text-center mb-2">
              Navigation
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-[#181a1f] border border-white/[0.08] text-[#e8e4dc] hover:text-[#a3b18a] hover:border-[#84a98c]/40 text-sm font-medium transition-all"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-[#84a98c]" />
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#68645c]" />
              </button>
            ))}

            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full mt-4 py-3 rounded-xl bg-[#d4a373] text-[#0e0f12] font-semibold text-center text-sm shadow-md"
            >
              Get In Touch (bose.kodelli09@gmail.com)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
