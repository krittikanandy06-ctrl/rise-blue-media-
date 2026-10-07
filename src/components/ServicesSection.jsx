import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  Target, 
  Search, 
  Code2, 
  ShieldCheck, 
  Bot 
} from 'lucide-react';

const services = [
  {
    icon: <Target className="w-8 h-8 text-blue-400" />,
    title: 'Paid Ads Management',
    color: 'from-blue-500/20 to-blue-900/10',
    border: 'group-hover:border-blue-500/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    items: [
      'Google Ads (Search, Shopping, Display)',
      'Meta Ads (Facebook & Instagram)',
      'YouTube Ads',
      'TikTok, LinkedIn, Pinterest campaigns',
      'Conversion Tracking (GA4, GTM, CAPI)',
      'Weekly Reporting & Strategy'
    ]
  },
  {
    icon: <Search className="w-8 h-8 text-purple-400" />,
    title: 'SEO Services',
    color: 'from-purple-500/20 to-purple-900/10',
    border: 'group-hover:border-purple-500/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    items: [
      'Technical SEO Audit',
      'Core Web Vitals optimization',
      'Keyword Research & Mapping',
      'On-page Optimization',
      'Content Production',
      'Link Building & Digital PR',
      'Monthly Ranking Reports'
    ]
  },
  {
    icon: <Code2 className="w-8 h-8 text-pink-400" />,
    title: 'Development Services',
    color: 'from-pink-500/20 to-pink-900/10',
    border: 'group-hover:border-pink-500/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    items: [
      'Website Development',
      'Corporate & SaaS websites',
      'Landing Pages',
      'WordPress & Webflow builds',
      'Shopify Store Development',
      'Custom Shopify Themes',
      'Shopify Apps (Public & Private)',
      'Web Applications',
      'API Integrations'
    ]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    title: 'Online Reputation Management',
    color: 'from-emerald-500/20 to-emerald-900/10',
    border: 'group-hover:border-emerald-500/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    items: [
      'Review Generation',
      'Trustpilot & Google Reviews',
      'Reddit PR',
      'Press Releases Distribution',
      'Content Removal',
      'Brand Reputation Protection',
      'White-label services'
    ]
  },
  {
    icon: <Bot className="w-8 h-8 text-cyan-400" />,
    title: 'AI SEO & Answer Engine Optimization',
    color: 'from-cyan-500/20 to-cyan-900/10',
    border: 'group-hover:border-cyan-500/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    items: [
      'ChatGPT visibility',
      'Google AI Overview optimization',
      'Perplexity AI presence',
      'Quora campaigns',
      'Reddit AEO layer',
      'AI-focused content strategy',
      'Schema markup',
      'AI search dominance'
    ]
  }
];

// Interactive Tilt Card
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXraw = useMotionValue(0);
  const mouseYraw = useMotionValue(0);

  const mouseXSpring = useTransform(x, [-0.5, 0.5], [5, -5]);
  const mouseYSpring = useTransform(y, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    mouseXraw.set(mouseX);
    mouseYraw.set(mouseY);
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6, delay: index * 0.08 }}
      className={`col-span-1 ${index >= 3 ? 'md:col-span-6 lg:col-span-4' : 'md:col-span-4 lg:col-span-4'} flex justify-center`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: mouseYSpring,
          rotateY: mouseXSpring,
          transformStyle: "preserve-3d",
        }}
        className={`w-full group relative rounded-3xl bg-[#0A192F]/40 backdrop-blur-lg border border-white/10 p-8 transition-all duration-300 transform scale-100 hover:scale-[1.03] hover:bg-gradient-to-br ${service.color} ${service.border} ${service.glow} overflow-hidden shadow-2xl`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
          style={{
            background: useTransform(
              [mouseXraw, mouseYraw],
              ([mouseX, mouseY]) =>
                `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.1), transparent 40%)`
            ),
          }}
        />
        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out">
            {service.icon}
          </div>
          
          <h3 className="text-2xl font-heading font-bold text-white mb-6 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-white to-white/70">
            {service.title}
          </h3>
          
          <ul className="space-y-3">
            {service.items.map((item, i) => (
              <li key={i} className="flex items-start text-white/70 font-sans text-sm md:text-base group-hover:text-white/90 transition-colors">
                <span className="mr-3 text-blue-500 group-hover:text-blue-400 mt-1 flex-shrink-0 opacity-70 group-hover:opacity-100">▹</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 relative bg-transparent z-10 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C3AED]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-medium text-sm tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            5 Core Pillars of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-glow">
              Digital Dominance
            </span>
          </h2>
          <p className="text-lg text-white/60 mx-auto max-w-2xl font-light">
            We deliver uncompromising results through specialized expertise across every stage of the digital customer journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
