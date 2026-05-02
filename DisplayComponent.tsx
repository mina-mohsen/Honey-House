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
    <div className="fixed inset-0 bg-[#020202] text-white flex flex-col font-cairo overflow-hidden selection:bg-amber-500/30">
      {/* 🌌 Luxury Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vh] bg-amber-900/15 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vh] bg-amber-600/5 blur-[100px] rounded-full"></div>
      </div>

      {/* 🚀 Header: Slim Luxury Rail - Responsive Height */}
      <div className="h-[12vh] min-h-[80px] bg-black/40 backdrop-blur-md flex items-center justify-between px-6 md:px-12 lg:px-20 border-b border-white/5 z-50 overflow-hidden">
        {/* Brand */}
        <div className="flex items-center gap-4 md:gap-6">
           <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center border border-amber-500 shadow-xl shrink-0">
              <span className="text-2xl md:text-4xl">🍯</span>
           </div>
           <div className="flex flex-col">
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">بيت العسل</h1>
              <span className="text-[8px] md:text-[10px] font-bold text-amber-500 tracking-[0.4em] uppercase mt-1">Premium Al-Asal House</span>
           </div>
        </div>

        {/* Dynamic Promo Tags - Responsive Scaling */}
        <div className="flex gap-4 md:gap-10">
           <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl font-black text-white px-4 md:px-8 py-1 md:py-2 rounded-full border border-white/10 bg-white/5 leading-none">10% OFF</span>
              <span className="text-[8px] md:text-[11px] font-bold text-white/40 mt-1 uppercase">AED 150+ ORDERS</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl font-black text-amber-500 px-4 md:px-8 py-1 md:py-2 rounded-full border border-amber-500/30 bg-amber-500/5 leading-none">15% OFF</span>
              <span className="text-[8px] md:text-[11px] font-bold text-amber-500/40 mt-1 uppercase">AED 200+ ORDERS</span>
           </div>
        </div>
      </div>

      {/* 🍯 Advertising Canvas: Strictly Contained Layout */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-8 md:px-16 lg:px-24 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center content-center"
          >
            {/* Left Column: Product Info */}
            <div className="flex flex-col justify-center text-right space-y-6 md:space-y-8 lg:space-y-10 order-2 lg:order-1" dir="rtl">
              <div className="space-y-2 md:space-y-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="h-1.5 w-32 bg-amber-500 origin-right rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                />
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                  {product.titleAr}
                </h2>
              </div>

              <motion.p 
                className="text-xl md:text-3xl lg:text-4xl text-white/90 font-bold leading-relaxed border-r-8 border-amber-500/60 pr-8"
              >
                {product.descriptionAr}
              </motion.p>
 
              {/* Pricing Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4">
                {product.prices.map((p, idx) => (
                  <motion.div 
                    key={p.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="bg-white/5 backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center shadow-2xl group hover:border-amber-500/50 transition-all"
                  >
                    <span className="text-xs md:text-sm font-black text-amber-500 uppercase tracking-widest mb-2">{p.sizeAr}</span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-4xl md:text-6xl lg:text-7xl font-black text-white group-hover:text-amber-400 transition-colors">{p.price}</span>
                       <span className="text-base md:text-2xl font-bold text-white/30 lowercase">درهم</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual - contained and centered */}
            <div className="h-full flex items-center justify-center relative order-1 lg:order-2 overflow-visible">
               <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0.5, -0.5, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-[35vh] lg:h-full flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full"></div>
                <img 
                  src={product.image} 
                  alt={product.titleAr}
                  className="max-w-[120%] max-h-[120%] object-contain drop-shadow-[0_80px_100px_rgba(0,0,0,0.85)] z-10"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 📜 Footer: Robust Status Rail */}
      <div className="h-[10vh] min-h-[70px] bg-black/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-10 md:px-20 relative shrink-0">
        <div className="flex items-center gap-12 overflow-hidden">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] uppercase text-white/20 font-black tracking-widest mb-1">PREMIUM SCALE HOUSE</span>
            <span className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">تطبق الخصومات تلقائياً عند الكاونتر ✦</span>
          </div>
          <div className="hidden lg:block w-px h-10 bg-white/10 mx-4"></div>
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden xl:block text-2xl font-bold text-amber-500"
          >
            جودة تستحق الثقة لبيت العسل 🍯
          </motion.span>
        </div>

        <div className="flex gap-4 items-center">
          {/* Controls */}
          <button 
             onClick={() => { window.location.hash = ""; window.location.reload(); }}
             className="text-[10px] font-black text-white/20 hover:text-white transition-colors tracking-widest uppercase mr-6"
          >
            CloseView
          </button>

          {PRODUCTS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2.5 rounded-full transition-all duration-700 ${currentIndex === idx ? 'w-24 bg-amber-500' : 'w-4 bg-white/10'}`} 
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 h-[3px] bg-white/5 w-full">
           <motion.div 
              key={currentIndex}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className="h-full bg-amber-500 w-full shadow-[0_0_15px_rgba(245,158,11,0.6)]"
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
