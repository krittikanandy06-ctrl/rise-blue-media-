import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Paperclip } from 'lucide-react';
import { SiWhatsapp, SiTelegram } from '@icons-pack/react-simple-icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => setIsTyping(true), 0);
      setTimeout(() => {
        setMessages([
          { 
            sender: 'bot', 
            text: "Welcome to Rise Blue Media 👋\nHow can we help grow your business today?" 
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  const chatOptions = [
    "Get Free Strategy",
    "Our Services",
    "Talk on WhatsApp",
    "Contact Us"
  ];

  const handleOptionClick = (option) => {
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: option }]);
    
    if (option === "Talk on WhatsApp") {
      window.open('https://wa.me/1234567890?text=Hi,%20I%27m%20interested%20in%20your%20services.', '_blank');
      return;
    }

    // Bot response simulate
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Great choice! Our team specializes in ${option.toLowerCase()}. Let me connect you with an expert right away.`
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const whatsappLink = "https://wa.me/1234567890?text=Hi,%20I%27m%20interested%20in%20your%20services.";
  const telegramLink = "https://t.me/risebluemedia";

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Social Floating Icons */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 pointer-events-auto"
          >
            <a 
              href={telegramLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 bg-[#229ED9] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,158,217,0.4)] hover:shadow-[0_0_25px_rgba(34,158,217,0.7)] transition-all duration-300 transform hover:scale-110"
            >
              <SiTelegram className="w-6 h-6 -ml-1" />
            </a>
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(37,211,102,0.7)] transition-all duration-300 transform hover:scale-110 hover:animate-pulse"
            >
              <SiWhatsapp className="w-6 h-6" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80dvh] bg-[#0A192F]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden pointer-events-auto origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] p-4 flex items-center justify-between shadow-lg relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#00E5FF] rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">Rise Blue AI</h3>
                  <p className="text-white/80 text-xs font-medium">Online & Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 to-transparent pointer-events-none" />
              
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user' 
                    ? 'bg-[#00E5FF] text-[#0A192F] font-medium rounded-tr-sm shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                    : 'bg-white/10 border border-white/5 text-white rounded-tl-sm glass shadow-lg'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start w-full"
                >
                  <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center glass shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Options Area (if no user messages yet or as quick replies) */}
            {messages.length === 1 && !isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 pb-2 flex flex-wrap gap-2"
              >
                {chatOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className="bg-transparent border border-[#00E5FF]/50 text-[#00E5FF] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#00E5FF]/10 transition-colors shadow-[0_0_10px_rgba(0,229,255,0.05)]"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0A192F] relative z-[11]">
              <div className="relative flex items-center p-1 bg-white/5 border border-white/10 rounded-full glass focus-within:border-[#00E5FF] transition-colors">
                <button className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none px-2 placeholder:text-white/30"
                />
                <button className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-[#0A192F] hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all">
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-[#0A192F] shadow-[0_0_20px_rgba(0,229,255,0.4)] pointer-events-auto transition-colors duration-300 relative overflow-hidden group ${isOpen ? 'bg-white/10 text-white border border-white/20' : 'bg-[#00E5FF]'}`}
      >
        <div className={`absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-7 h-7 relative z-10" />}
      </motion.button>

    </div>
  );
};

export default Chatbot;
