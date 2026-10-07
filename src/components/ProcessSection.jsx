import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Strategy', desc: 'Comprehensive audit & roadmap creation' },
  { num: '02', title: 'Build', desc: 'Developing the foundation and assets' },
  { num: '03', title: 'Launch', desc: 'Execution and initial push to market' },
  { num: '04', title: 'Scale', desc: 'Expanding reach and aggressively growing' },
  { num: '05', title: 'Optimize', desc: 'Data-driven refinement for peak ROI' },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-32 relative bg-transparent z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-medium tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            Our Playbook
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            The Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-glow-purple">Engine</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 rounded-full z-0 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", bounce: 0, duration: 0.6, delay: index * 0.08 }}
                  key={index}
                  className="relative group"
                >
                  <div className="relative flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-black border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-300 relative z-20 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                      <span className="text-2xl font-heading font-bold text-white/50 group-hover:text-purple-400 transition-colors">
                        {step.num}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/60 text-sm font-sans leading-relaxed group-hover:text-white/80 transition-colors max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
