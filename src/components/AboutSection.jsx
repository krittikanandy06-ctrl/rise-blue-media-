import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative bg-transparent z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-900/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-900/10 blur-[100px] rounded-full"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-xl md:text-2xl font-light text-blue-400 tracking-widest uppercase shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 neon-border px-6 py-2 rounded-full inline-block backdrop-blur-sm border border-blue-500/20">
              Identity
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-10 tracking-tight leading-tight"
          >
            Full-Service <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-glow-purple">
              Digital Growth Agency
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl opacity-50"></div>
            <p className="relative text-xl md:text-2xl text-white/70 font-sans leading-relaxed tracking-wide backdrop-blur-sm p-4 rounded-xl border border-white/5 bg-white/5 shadow-2xl glass">
              We help businesses grow across <span className="text-white font-medium">paid advertising</span>, <span className="text-white font-medium">SEO</span>, 
              <span className="text-white font-medium"> development</span>, <span className="text-white font-medium">reputation management</span> and 
              <span className="text-blue-400 font-medium"> AI-powered search visibility</span>.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 justify-center flex gap-4 object-center"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-blue-500 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
