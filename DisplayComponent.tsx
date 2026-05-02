import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './constants';

const DisplayComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 10000); // Change product every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const product = PRODUCTS[currentIndex];

  return (
    <div className="fixed inset-0 bg-[#020202] text-white flex flex-col font-cairo overflow-hidden selection:bg-gold/30">
      {/* 🌌 Deep Atmospheric Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D97706]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C5A059]/10 blur-[100px] rounded-full"></div>
      </div>

      {/* 🚀 Header: Premium Brand Console */}
      <div className="h-[14%] bg-black/40 backdrop-blur-2xl flex items-center justify-between px-12 shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-50 border-b border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none"></div>
        
        {/* Left: 10% Promo */}
        <motion.div 
          animate={{ y: [0, -2, 0], filter: ["drop-shadow(0 0 5px rgba(217,119,6,0.3))", "drop-shadow(0 0 15px rgba(217,119,6,0.5))", "drop-shadow(0 0 5px rgba(217,119,6,0.3))"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="bg-gradient-to-br from-[#FBBF24] to-[#D97706] px-8 py-4 rounded-[2rem] border border-white/30 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <span className="text-3xl font-black text-black leading-none uppercase tracking-tighter">10% OFF</span>
          <span className="text-xs font-black text-black/70 mt-1">AED 150+ ORDERS</span>
        </motion.div>

        {/* Center: Brand Identity */}
        <div className="flex flex-col items-center z-10">
          <motion.div 
             className="flex items-center gap-6"
          >
             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border-2 border-[#D97706] shadow-[0_0_30px_rgba(217,119,6,0.4)] relative transform -rotate-3 hover:rotate-0 transition-transform">
                <span className="text-4xl">🍯</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#D97706] rounded-full animate-ping"></div>
             </div>
             <div className="flex flex-col items-start">
                <h1 className="text-5xl font-black text-white leading-none tracking-tight drop-shadow-lg">بيت العسل</h1>
                <div className="bg-[#D97706] px-5 py-1 rounded-full mt-2 shadow-inner">
                   <span className="text-xs font-black text-white tracking-[0.3em] leading-none uppercase">Premium Apiaries</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right: 15% Promo */}
        <motion.div 
          animate={{ y: [0, 2, 0], filter: ["drop-shadow(0 0 5px rgba(217,119,6,0.3))", "drop-shadow(0 0 15px rgba(217,119,6,0.6))", "drop-shadow(0 0 5px rgba(217,119,6,0.3))"] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="bg-black px-8 py-4 rounded-[2rem] border-2 border-[#D97706] flex flex-col items-center justify-center shadow-2xl relative group"
        >
          <span className="text-3xl font-black text-[#D97706] leading-none uppercase tracking-tighter">15% OFF</span>
          <span className="text-xs font-black text-white/40 mt-1">AED 200+ ORDERS</span>
        </motion.div>
      </div>

      {/* 🍯 Main Presentation Console */}
      <div className="flex-1 relative p-8 flex items-center justify-center">
        {/* Luxury Frame Glow */}
        <div className="absolute inset-8 border-[1px] border-[#D97706]/10 rounded-[4rem] pointer-events-none"></div>
        <div className="absolute inset-12 border-[1px] border-[#D97706]/5 rounded-[3.5rem] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 1.05 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-row-reverse items-center justify-center gap-16 max-w-7xl mx-auto"
          >
            {/* 🖼️ Product Stage */}
            <div className="w-[50%] h-full flex items-center justify-center relative">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [-1, 1, -1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[550px] aspect-square bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.15),transparent_70%)] rounded-full flex items-center justify-center"
              >
                {/* Luminous Glow Behind */}
                <div className="absolute w-[80%] h-[80%] bg-[#D97706]/10 blur-[80px] rounded-full animate-pulse"></div>
                
                <img 
                  src={product.image} 
                  alt={product.titleAr}
                  className="max-w-[110%] max-h-[110%] object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.9)] z-10 brightness-110 contrast-110"
                />
              </motion.div>
            </div>

            {/* 📝 Content Area */}
            <div className="w-[50%] flex flex-col justify-center text-right space-y-10" dir="rtl">
              <div>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gold/60 text-xl font-bold uppercase tracking-[0.4em] mb-4 block"
                >
                  عسل طبيعي ممتاز
                </motion.span>
                <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-black text-white leading-none drop-shadow-[0_2px_15px_rgba(217,119,6,0.4)]">
                  {product.titleAr.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? "text-[#FBBF24]" : "text-white"}>{word} </span>
                  ))}
                </h2>
                <div className="h-2 w-48 bg-gradient-to-l from-[#D97706] to-transparent rounded-full mt-6 shadow-[0_0_15px_rgba(217,119,6,0.3)]"></div>
              </div>

              <motion.p 
                className="text-[clamp(1.5rem,2.5vw,2.2rem)] text-white/80 font-medium leading-relaxed pr-10 border-r-4 border-[#D97706] py-2"
              >
                {product.descriptionAr}
              </motion.p>

              {/* Price Cards - Glassmorphism */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-2xl pt-6">
                {product.prices.map((price, idx) => (
                  <motion.div 
                    key={price.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + (idx * 0.15), type: "spring", stiffness: 100 }}
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center shadow-3xl hover:border-gold/40 transition-colors relative"
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                    <span className="text-xl text-white/50 font-black mb-2 uppercase tracking-wide">{price.sizeAr}</span>
                    <div className="flex items-baseline gap-3">
                       <span className="text-6xl font-black text-white drop-shadow-sm">{price.price}</span>
                       <span className="text-2xl font-black text-[#D97706]">درهم</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 📜 Bottom Footer */}
      <div className="h-[12%] bg-black/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-between px-12 relative">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="text-xs uppercase text-gold/40 font-black tracking-[0.3em] mb-1">PROMOTION POLICY</span>
            <span className="text-xl font-bold text-white/90">تطبق الخصومات تلقائياً عند الكاونتر ✦</span>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-2xl font-black text-[#FBBF24] italic"
          >
            تذوق مجاني لجميع الأنواع! 🍯
          </motion.p>
        </div>

        <div className="flex gap-4">
          {PRODUCTS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-700 shadow-sm ${currentIndex === idx ? 'w-16 bg-[#D97706] shadow-[#D97706]/50' : 'w-3 bg-white/10'}`} 
            />
          ))}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="absolute top-0 left-0 h-[3px] bg-white/5 w-full overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full bg-gradient-to-r from-transparent via-[#D97706] to-[#FBBF24] w-full shadow-[0_0_10px_rgba(217,119,6,0.8)]"
          />
        </div>

        {/* ❌ Exit Control */}
        <button 
          onClick={() => { window.location.hash = ""; window.location.reload(); }}
          className="ml-8 text-white/30 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
        >
          Close Display [ESC]
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 5s infinite linear;
        }
        .text-gold { color: #C5A059; }
        .bg-gold { background-color: #C5A059; }
        .border-gold { border-color: #C5A059; }
      `}</style>
    </div>


  );
};

export default DisplayComponent;
