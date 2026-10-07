import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const HeroOverlay = ({ onOpenAuth }) => {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 z-10 w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-start justify-center max-w-[90vw] md:max-w-3xl lg:max-w-4xl pt-20">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="px-6 py-2 rounded-full mb-8 inline-flex bg-[#00E5FF]/10 border border-[#00E5FF]/30 shadow-[0_0_20px_rgba(0,229,255,0.2)] backdrop-blur-md"
          >
            <span className="text-[#00E5FF] font-medium tracking-widest text-sm uppercase">
              Digital Growth Universe
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold text-white leading-[1.1] mb-8 -tracking-[0.02em] drop-shadow-2xl text-shadow-[0_0_30px_rgba(0,229,255,0.4)]"
          >
            Scale Your Digital <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#22D3EE] to-[#7C3AED] relative">
              Growth Universe
              <span className="absolute inset-0 bg-transparent blur-2xl z-[-1] opacity-50 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] pointer-events-none"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="text-lg md:text-xl text-[#22D3EE]/80 font-sans max-w-2xl mb-6 tracking-wider font-medium flex flex-wrap gap-2 md:gap-3 drop-shadow-lg"
          >
            <span>Paid Ads</span> <span className="text-white/30">•</span>
            <span>SEO</span> <span className="text-white/30">•</span>
            <span>Development</span> <span className="text-white/30">•</span>
            <span>Reputation</span> <span className="text-white/30">•</span>
            <span className="text-[#00E5FF] font-semibold">AI Search</span>
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="text-base md:text-lg text-white/60 font-sans max-w-xl mb-12 font-light leading-relaxed"
          >
            One agency delivering performance marketing, organic growth, high-converting development, brand reputation management, and AI-powered visibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-5 items-center justify-start pointer-events-auto w-full sm:w-auto mt-4"
          >
            <MagneticButton variant="primary" onClick={onOpenAuth}>
              Get Free Strategy
            </MagneticButton>
            
            <MagneticButton variant="secondary">
              Explore Services
            </MagneticButton>
          </motion.div>

          {/* Cinematic scroll indicator - inline to prevent overlap */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-4 text-white/50 z-10 pointer-events-none mt-16 md:mt-24"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#00E5FF] relative overflow-hidden">
              <motion.div 
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-4 h-full bg-white shadow-[0_0_10px_#fff]"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#00E5FF]">Scroll to Explore</span>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroOverlay;
