import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '05', label: 'Core Service Lines' },
  { value: '100%', label: 'Results Guaranteed' },
  { value: '360°', label: 'Full Digital Coverage' },
  { value: 'Custom', label: 'Growth Packages' }
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-transparent relative z-10 mt-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: "spring", bounce: 0, duration: 0.6, delay: i * 0.08 }}
              key={i}
              className="flex flex-col items-center justify-center text-center space-y-2 group"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-sm md:text-base text-white/50 uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
