import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Navbar = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.scrollY === 0) {
      window.location.reload();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? 'bg-[#0A192F]/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-8'}`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 text-white font-heading font-bold text-xl md:text-2xl tracking-tight z-50 hover:opacity-80 transition-opacity">
            <Rocket className="w-6 h-6 text-[#00E5FF]" />
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">Rise Blue</span> Media
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5FF] transition-all duration-300 group-hover:w-full hover:shadow-[0_0_10px_#00E5FF]"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <MagneticButton variant="primary" onClick={onOpenAuth} className="!px-6 !py-2 !text-base shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              Get Started
            </MagneticButton>
          </div>

          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-heading font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button onClick={() => { setIsOpen(false); onOpenAuth(); }} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
