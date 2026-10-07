import React from 'react';
import { Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A192F]/80 backdrop-blur-xl border-t border-white/5 pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-heading font-bold text-2xl tracking-tight mb-6">
              <Rocket className="w-6 h-6 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Rise Blue</span> Media
            </div>
            <p className="text-white/60 font-sans max-w-sm mb-6 leading-relaxed">
              Award-winning digital growth agency specialized in scaling businesses through performance marketing, development, and AI-driven strategies.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 rounded-full bg-current opacity-50" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {['Paid Ads Management', 'SEO Services', 'Development Services', 'Online Reputation', 'AI SEO Optimization'].map(link => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-blue-400 hover:tracking-wide transition-all duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Process', 'Case Studies', 'Insights & Blog', 'Contact'].map(link => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-purple-400 hover:tracking-wide transition-all duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm hover:text-white/60 transition-colors">
            &copy; {new Date().getFullYear()} Rise Blue Media. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
