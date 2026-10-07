import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { X, CheckCircle2, Loader2, Mail, Lock, User, Briefcase, ChevronDown, MessageSquare } from 'lucide-react';

const FloatingInput = ({ icon: Icon, type, name, label, value, onChange, placeholder, isTextarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <div className={`absolute left-4 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} text-white/40 transition-colors duration-300 ${isFocused || value ? 'text-[#00E5FF]' : ''}`}>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all duration-300 peer resize-none h-28 glass"
          placeholder={label}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-transparent focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all duration-300 peer glass"
          placeholder={label}
        />
      )}
      
      <label
        className={`absolute left-12 cursor-text transition-all duration-300 ${isTextarea ? 'top-4' : 'top-1/2 -translate-y-1/2'}
          ${(isFocused || value) ? '-translate-y-9 text-xs text-[#00E5FF] bg-[#0A192F] px-2 rounded-full' : 'text-white/40'}
        `}
        onClick={() => { document.getElementsByName(name)[0].focus(); }}
      >
        {label}
      </label>
    </div>
  );
};

const CustomSelect = ({ name, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    "Paid Ads Management",
    "SEO Services",
    "Development Services",
    "Online Reputation Management",
    "AI SEO & Answer Engine Optimization"
  ];

  return (
    <div className="relative mb-6">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border ${isOpen ? 'border-[#00E5FF] ring-1 ring-[#00E5FF]' : 'border-white/10'} rounded-xl px-4 py-4 text-white flex items-center justify-between cursor-pointer transition-all duration-300 glass`}
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value || label}
        </span>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00E5FF]' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-[#0A192F]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => {
                  onChange({ target: { name, value: opt } });
                  setIsOpen(false);
                }}
                className="px-4 py-3 hover:bg-[#00E5FF]/20 cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {value && (
        <label className="absolute left-4 -top-3 text-xs text-[#00E5FF] bg-[#0A192F] px-2 rounded-full transition-all duration-300">
          {label}
        </label>
      )}
    </div>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('signup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', service: '', message: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (activeTab === 'signup') {
      try {
        // Prepare template params matching custom format requirements
        const templateParams = {
          to_name: "RiseBlue Owner", 
          from_name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          timestamp: new Date().toLocaleString()
        };

        // TODO: Replace with your actual EmailJS IDs
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
        
        // Simulating network delay since we don't have keys yet
        await new Promise(r => setTimeout(r, 1500)); 

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsSubmitting(false);
          handleReset();
          onClose();
        }, 3000);

      } catch (error) {
        console.error("EmailJS Error:", error);
        setIsSubmitting(false);
      }
    } else {
      // Login simulation
      await new Promise(r => setTimeout(r, 1000));
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-[#0A192F]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 pointer-events-auto relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      className="w-24 h-24 rounded-full bg-[#00E5FF]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                    >
                      <CheckCircle2 className="w-12 h-12 text-[#00E5FF]" />
                    </motion.div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">Request Received!</h3>
                    <p className="text-white/60">Thank you, our team will contact you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="relative z-10"
                  >
                    {/* Tabs */}
                    <div className="flex gap-8 mb-8 border-b border-white/10">
                      {['signup', 'login'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-4 text-lg font-heading font-bold relative transition-colors duration-300 ${activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                        >
                          {tab === 'signup' ? 'Get Started' : 'Login'}
                          {activeTab === tab && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                      {activeTab === 'signup' ? (
                        <>
                          <FloatingInput icon={User} type="text" name="name" label="Full Name" value={formData.name} onChange={handleChange} />
                          <FloatingInput icon={Mail} type="email" name="email" label="Email Address" value={formData.email} onChange={handleChange} />
                          <FloatingInput icon={Briefcase} type="text" name="company" label="Company Name" value={formData.company} onChange={handleChange} />
                          <CustomSelect name="service" label="Service Interested" value={formData.service} onChange={handleChange} />
                          <FloatingInput icon={MessageSquare} type="text" name="message" label="Message" value={formData.message} onChange={handleChange} isTextarea />
                        </>
                      ) : (
                        <>
                          <FloatingInput icon={Mail} type="email" name="email" label="Email Address" value={formData.email} onChange={handleChange} />
                          <FloatingInput icon={Lock} type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
                        </>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00E5FF] text-[#0A192F] font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6 flex justify-center items-center h-14"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          activeTab === 'signup' ? 'Send Request' : 'Access Dashboard'
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
