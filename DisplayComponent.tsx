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
    <div className="fixed inset-0 bg-[#020202] text-white flex flex-col font-cairo overflow-hidden">
      {/* 🍯 Atmospheric Advertising Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-[#D97706]/20 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#FBBF24]/10 blur-[140px] rounded-full"></div>
        {/* Honeycomb Pattern Texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#FBBF24 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* 🚀 Header: Luxury Brand Console - Maximized */}
      <div className="h-[18%] bg-black/40 backdrop-blur-md flex items-center justify-between px-20 shadow-[0_20px_80px_rgba(0,0,0,0.9)] z-50 border-b border-[#D97706]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_10s_infinite] pointer-events-none"></div>
        
        {/* Left: 10% Promo - High Impact */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], filter: ["drop-shadow(0 0 10px rgba(251,191,36,0))", "drop-shadow(0 0 25px rgba(251,191,36,0.3))", "drop-shadow(0 0 10px rgba(251,191,36,0))"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="bg-gradient-to-br from-[#FBBF24] to-[#D97706] px-16 py-8 rounded-[2.5rem] border-4 border-white flex flex-col items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.2)]"
        >
          <span className="text-6xl font-black text-black leading-none uppercase tracking-tighter">خصم 10%</span>
          <span className="text-xl font-black text-black/60 mt-2">للمشتريات فوق 150 درهم</span>
        </motion.div>

        {/* Center: Brand Identity - Monumental */}
        <div className="flex flex-col items-center z-10 px-12">
          <motion.div className="flex items-center gap-10">
             <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center border-4 border-[#FBBF24] shadow-[0_0_60px_rgba(251,191,36,0.3)] relative transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <span className="text-7xl">🍯</span>
             </div>
             <div className="flex flex-col items-start px-2">
                <h1 className="text-8xl font-black text-white leading-none tracking-tight drop-shadow-2xl">بيت العسل</h1>
                <div className="bg-[#FBBF24] px-12 py-2 rounded-full mt-3 shadow-lg">
                   <span className="text-lg font-black text-black tracking-[0.5em] leading-none uppercase">Premium Honey House</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right: 15% Promo - High Impact */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], filter: ["drop-shadow(0 0 10px rgba(217,119,6,0))", "drop-shadow(0 0 25px rgba(217,119,6,0.4))", "drop-shadow(0 0 10px rgba(217,119,6,0))"] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="bg-black px-16 py-8 rounded-[2.5rem] border-4 border-[#D97706] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(217,119,6,0.3)] relative overflow-hidden"
        >
          <span className="text-6xl font-black text-[#D97706] leading-none uppercase tracking-tighter">خصم 15%</span>
          <span className="text-xl font-black text-white/40 mt-2">للمشتريات فوق 200 درهم</span>
        </motion.div>
      </div>

      {/* 🍯 Main Presentation Console - Gigantic Advertising Space */}
      <div className="flex-1 relative p-10 flex items-center justify-center">
        {/* Luxury Frame Borders - Expanded */}
        <div className="absolute inset-6 border-[2px] border-[#D97706]/20 rounded-[5rem] pointer-events-none"></div>
        <div className="absolute inset-10 border-[1px] border-white/10 rounded-[4.5rem] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-row-reverse items-center justify-center gap-20 max-w-[95vw] mx-auto px-20"
          >
            {/* 🖼️ Product Stage - Monumental Image Scaling */}
            <div className="w-[58%] h-full flex items-center justify-center relative">
              <motion.div
                animate={{ 
                  y: [0, -40, 0],
                  rotate: [-3, 3, -3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[1000px] aspect-square flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.3),transparent_75%)] animate-pulse rounded-full blur-3xl"></div>
                <img 
                  src={product.image} 
                  alt={product.titleAr}
                  className="max-w-[130%] max-h-[130%] object-contain drop-shadow-[0_100px_150px_rgba(0,0,0,0.95)] z-10 brightness-110 contrast-[1.05]"
                />
              </motion.div>
            </div>

            {/* 📝 Content Area - Massive Editorial Typography */}
            <div className="w-[42%] flex flex-col justify-center text-right space-y-16" dir="rtl">
              <div className="relative group">
                <motion.h2 
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-9xl lg:text-[11rem] font-black text-[#FBBF24] leading-[0.85] drop-shadow-[0_0_80px_rgba(251,191,36,0.4)] tracking-tighter"
                >
                  {product.titleAr}
                </motion.h2>
                <div className="h-4 w-72 bg-gradient-to-l from-[#FBBF24] to-transparent rounded-full mt-10 shadow-[0_0_40px_rgba(251,191,36,0.5)]"></div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-5xl lg:text-6xl text-white font-black leading-[1.1] pr-16 border-r-[24px] border-[#D97706] py-10 drop-shadow-xl"
              >
                {product.descriptionAr}
              </motion.p>
 
              {/* Price Cards - Monumental Presence */}
              <div className="grid grid-cols-2 gap-12 w-full pt-16">
                {product.prices.map((price, idx) => (
                  <motion.div 
                    key={price.id}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + (idx * 0.2), type: "spring", stiffness: 60 }}
                    className="group bg-white/5 backdrop-blur-3xl p-14 rounded-[4.5rem] border-2 border-white/10 flex flex-col items-center justify-center shadow-[0_40px_80px_rgba(0,0,0,0.6)] hover:border-[#FBBF24]/50 hover:bg-white/10 transition-all duration-700 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-4xl text-white/40 font-black mb-6 uppercase tracking-[0.3em]">{price.sizeAr}</span>
                    <div className="flex items-baseline gap-6 scale-110">
                       <span className="text-9xl font-black text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{price.price}</span>
                       <span className="text-5xl font-black text-[#FBBF24]">درهم</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 📜 Bottom Footer: Immersive Control Rail */}
      <div className="h-[12%] bg-black/95 backdrop-blur-3xl border-t-2 border-[#D97706]/40 flex items-center justify-between px-24 relative overflow-hidden">
        <div className="flex items-center gap-20">
           {/* Exit Button - Discreet but accessible */}
           <button 
             onClick={() => { window.location.hash = ""; window.location.reload(); }}
             className="group bg-red-600/10 hover:bg-red-600 text-red-500/60 hover:text-white px-10 py-3 rounded-full text-sm font-black tracking-widest border border-red-500/20 hover:border-red-500 transition-all uppercase"
           >
              Exit Display
           </button>

          <div className="flex flex-col">
            <span className="text-sm uppercase text-white/30 font-black tracking-[0.6em] mb-2">OFFICIAL STORE POLICIES</span>
            <span className="text-5xl font-black text-[#FBBF24] drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">تطبق الخصومات تلقائياً عند الكاونتر ✦</span>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex gap-8 items-center">
          {PRODUCTS.map((_, idx) => (
            <motion.div 
              key={idx} 
              animate={currentIndex === idx ? { scale: 1.4, backgroundColor: "#D97706" } : { scale: 1, backgroundColor: "rgba(255,255,255,0.15)" }}
              className={`h-4 rounded-full transition-all duration-1000 ${currentIndex === idx ? 'w-48 shadow-[0_0_35px_rgba(217,119,6,0.8)]' : 'w-8'}`} 
            />
          ))}
        </div>

        {/* High-Precision Progress Bar */}
        <div className="absolute top-0 left-0 h-[8px] bg-white/5 w-full overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full bg-gradient-to-r from-transparent via-[#FBBF24] to-[#D97706] w-full shadow-[0_0_30px_rgba(217,119,6,1)]"
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
      `}</style>
    </div>
  );
};

export default DisplayComponent;
