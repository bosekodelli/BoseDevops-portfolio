import React from 'react';
import { SmoothScrollProvider } from './context/SmoothScrollProvider';
import { EditorialOpening } from './components/EditorialOpening';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsBento } from './components/SkillsBento';
import { ProjectsStack } from './components/ProjectsStack';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactFooter } from './components/ContactFooter';
import { DevOpsScrollController } from './components/DevOpsScrollController';

export const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#0e0f12] text-[#e8e4dc] selection:bg-[#84a98c]/30 selection:text-[#f4f1ea] overflow-x-hidden font-body">
        
        {/* Persistent natural subtle grid overlay */}
        <div className="fixed inset-0 bg-natural-grid opacity-30 pointer-events-none z-0" />

        {/* Full-Screen Editorial Poster Opening with GSAP Scroll Transition */}
        <EditorialOpening />

        {/* Global Floating Navbar */}
        <Navbar />

        {/* Floating Interactive DevOps Infinity Loop Scroll HUD */}
        <DevOpsScrollController />

        {/* Main Content Sections */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <SkillsBento />
          <ProjectsStack />
          <ExperienceTimeline />
          <InteractiveTerminal />
        </main>

        {/* Footer & Contact */}
        <ContactFooter />
      </div>
    </SmoothScrollProvider>
  );
};

export default App;
