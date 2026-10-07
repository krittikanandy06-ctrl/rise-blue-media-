import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className, variant = "primary", onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative overflow-hidden group flex items-center justify-center font-bold text-lg rounded-full transition-all duration-300 transform scale-100 hover:scale-[1.03] active:scale-95";
  
  const variants = {
    primary: "bg-[#00E5FF] text-[#0A192F] px-8 py-4 shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.8)] border border-[#00E5FF]",
    secondary: "backdrop-blur-xl bg-white/5 border border-white/20 text-white hover:bg-white/10 px-8 py-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:border-[#00E5FF]/50",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      {/* Ripple/Glow Overlays */}
      {variant === 'primary' ? (
        <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
      ) : (
        <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12" />
      )}
    </motion.button>
  );
};

export default MagneticButton;
