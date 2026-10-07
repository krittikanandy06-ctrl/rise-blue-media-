import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const CTASection = () => {
  return (
    <section className="py-32 relative bg-transparent z-10 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto glass border border-white/10 rounded-[3rem] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          {/* Animated Gradient Background on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-tighter">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-sans font-light">
              Partner with an award-winning agency to dominate your market with data-driven paid ads, robust SEO, and high-converting development.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <MagneticButton variant="primary">
                Book Strategy Call
              </MagneticButton>
              
              <MagneticButton variant="secondary">
                Get Proposal
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
