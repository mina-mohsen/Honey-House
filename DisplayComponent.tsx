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
    <div className="fixed inset-0 bg-[#050505] text-white flex flex-col font-cairo overflow-hidden">
      {/* 🚀 Header: Luxury Brand Console */}
      <div className="h-[15%] bg-black flex items-center justify-between px-10 shadow-[0_10px_50px_rgba(0,0,0,0.9)] z-50 border-b-2 border-[#D97706] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.1),transparent)] pointer-events-none"></div>
        
        {/* Left: 10% Promo */}
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-[#FBBF24] px-6 py-3 rounded-[1.5rem] border-2 border-white flex flex-col items-center justify-center shadow-lg"
        >
          <span className="text-3xl font-black text-black leading-none uppercase">10% OFF</span>
          <span className="text-sm font-black text-black/60 mt-0.5">AED 150+</span>
        </motion.div>

        {/* Center: Brand Identity */}
        <div className="flex flex-col items-center z-10">
          <motion.div 
             className="flex items-center gap-4"
          >
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-[#FBBF24] shadow-xl relative">
                <span className="text-3xl">🍯</span>
             </div>
             <div className="flex flex-col items-center">
                <h1 className="text-4xl font-black text-white leading-none tracking-tight">بيت العسل</h1>
                <div className="bg-[#FBBF24] px-4 py-0.5 rounded-full mt-1">
                   <span className="text-sm font-black text-black tracking-[0.2em] leading-none">HONEY HOUSE</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right: 15% Promo */}
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className="bg-[#D97706] px-6 py-3 rounded-[1.5rem] border-2 border-white flex flex-col items-center justify-center shadow-lg"
        >
          <span className="text-3xl font-black text-white leading-none uppercase">15% OFF</span>
          <span className="text-sm font-black text-white/60 mt-0.5">AED 200+</span>
        </motion.div>
      </div>

      {/* 🍯 Main Presentation Console - Strictly Contained Within Frame */}
      <div className="flex-1 relative p-8 flex items-center justify-center">
        {/* Decorative Frame */}
        <div className="absolute inset-8 border-[12px] border-[#D97706]/10 rounded-[3rem] pointer-events-none"></div>
        <div className="absolute inset-10 border-2 border-[#D97706]/20 rounded-[2.5rem] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-row-reverse items-center justify-center gap-12 max-w-7xl mx-auto px-10"
          >
            {/* 🖼️ Product Stage */}
            <div className="w-[50%] h-[85%] flex items-center justify-center relative">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-full aspect-square bg-gradient-to-b from-white/10 to-transparent rounded-[4rem] flex items-center justify-center border-2 border-white/5 shadow-2xl"
              >
                <img 
                  src={product.image} 
                  alt={product.titleAr}
                  className="max-w-[95%] max-h-[95%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-10"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)] rounded-full"></div>
              </motion.div>
            </div>

            {/* 📝 Content Area */}
            <div className="w-[50%] flex flex-col justify-center text-right space-y-4" dir="rtl">
              <div className="relative">
                <h2 className="text-6xl font-black text-[#FBBF24] leading-tight drop-shadow-2xl">
                  {product.titleAr}
                </h2>
                <div className="h-1.5 w-24 bg-[#FBBF24]/30 rounded-full mt-1"></div>
              </div>

              <motion.p 
                className="text-2xl text-white/90 font-bold leading-relaxed pr-4 border-r-4 border-[#FBBF24]/50"
              >
                {product.descriptionAr}
              </motion.p>

              {/* Price Cards */}
              <div className="flex gap-4 w-full pt-4">
                {product.prices.map((price, idx) => (
                  <motion.div 
                    key={price.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="flex-1 bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center shadow-xl"
                  >
                    <span className="text-lg text-white/40 font-black mb-1">{price.sizeAr}</span>
                    <div className="flex items-baseline gap-1">
                       <span className="text-5xl font-black text-[#FBBF24]">{price.price}</span>
                       <span className="text-lg font-bold text-[#FBBF24]">درهم</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 📜 Bottom Footer: Terms & Progress */}
      <div className="h-[10%] bg-black/60 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-16 relative">
        {/* ❌ Exit Button - Small at bottom left */}
        <button 
          onClick={() => { window.location.hash = ""; window.location.reload(); }}
          className="bg-red-600/80 hover:bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg transition-all z-[100] border border-white/20 active:scale-95"
        >
           إغلاق ✕
        </button>

        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="text-xs uppercase text-white/40 font-bold tracking-widest">Discount Terms</span>
            <span className="text-xl font-bold text-[#FBBF24]">تطبق الخصومات تلقائياً عند الكاونتر</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <p className="text-xl font-medium text-white/70">تذوق مجاني لجميع الأنواع! 🍯</p>
        </div>

        <div className="flex gap-3">
          {PRODUCTS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-12 bg-[#FBBF24]' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="absolute top-0 left-0 h-[2px] bg-[#FBBF24]/30 w-full overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full bg-[#FBBF24] w-full"
          />
        </div>
      </div>
    </div>

  );
};

export default DisplayComponent;
