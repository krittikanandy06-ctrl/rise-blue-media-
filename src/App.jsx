import React, { Suspense, useState, lazy } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import HeroOverlay from './components/HeroOverlay';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Lazy-load heavy components for code-splitting
const PersistentBackground = lazy(() => import('./components/PersistentBackground'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="bg-transparent min-h-[100dvh] text-white overflow-x-hidden selection:bg-[#00E5FF]/30 font-sans">
        <Suspense fallback={<div className="fixed inset-0 bg-[#0A192F] flex items-center justify-center text-[#00E5FF] font-heading z-0 tracking-widest uppercase">Initializing Digital Universe...</div>}>
          <PersistentBackground />
        </Suspense>

        <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
        
        {/* Scrollable Overlays */}
        <main className="relative z-10">
          <HeroOverlay onOpenAuth={() => setIsAuthOpen(true)} />
          
          {/* Transparent/Glassmorphism wrappers for sections */}
          <div className="relative z-10 bg-gradient-to-b from-transparent via-[#0A192F]/60 to-[#0A192F]/90 backdrop-blur-[2px]">
            <StatsSection />
            <ServicesSection />
            <AboutSection />
            <ProcessSection />
            <CTASection onOpenAuth={() => setIsAuthOpen(true)} />
          </div>
        </main>

        <div className="relative z-20">
          <Footer />
        </div>

        {/* Global Modals & Overlays */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        <Chatbot />
      </div>
    </SmoothScroll>
  );
}

export default App;
