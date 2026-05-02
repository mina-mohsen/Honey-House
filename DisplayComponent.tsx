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
      <div className="h-[20%] bg-black flex items-center justify-between px-16 shadow-[0_20px_80px_rgba(0,0,0,0.9)] z-50 border-b-[10px] border-[#D97706] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.1),transparent)] pointer-events-none"></div>
        
        {/* Left: 10% Promo */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-[#FBBF24] p-8 rounded-[3rem] border-[6px] border-white flex flex-col items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.4)]"
        >
          <span className="text-[5rem] font-black text-black leading-none tracking-tighter">10% OFF</span>
          <span className="text-3xl font-black text-black/60 bg-black/5 px-6 rounded-full mt-2">MIN AED 150</span>
        </motion.div>

        {/* Center: Brand Identity */}
        <div className="flex flex-col items-center z-10">
          <motion.div 
             animate={{ scale: [1, 1.05, 1] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="flex items-center gap-10"
          >
             <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-8 border-[#FBBF24] shadow-2xl">
                <span className="text-7xl">🐝</span>
             </div>
             <div className="flex flex-col text-left">
                <h1 className="text-9xl font-black text-white leading-none tracking-tight drop-shadow-[0_10px_20px_rgba(217,119,6,0.5)]">بيت العسل</h1>
                <div className="flex items-center gap-4 mt-2">
                   <div className="h-1 flex-1 bg-[#FBBF24]"></div>
                   <span className="text-4xl font-black text-[#FBBF24] tracking-[0.3em]">HONEY HOUSE</span>
                   <div className="h-1 flex-1 bg-[#FBBF24]"></div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Right: 15% Promo */}
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="bg-[#D97706] p-8 rounded-[3rem] border-[6px] border-white flex flex-col items-center justify-center shadow-[0_0_60px_rgba(217,119,6,0.4)]"
        >
          <span className="text-[5rem] font-black text-white leading-none tracking-tighter">15% OFF</span>
          <span className="text-3xl font-black text-white/60 bg-black/20 px-6 rounded-full mt-2">MIN AED 200</span>
        </motion.div>
      </div>

      {/* 🍯 Main Presentation Console - Strictly Contained Within Frame */}
      <div className="flex-1 relative p-12 overflow-hidden">
        {/* Decorative Frame */}
        <div className="absolute inset-12 border-[20px] border-[#D97706]/10 rounded-[5rem] pointer-events-none"></div>
        <div className="absolute inset-16 border-4 border-[#D97706]/20 rounded-[4.5rem] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-row-reverse items-center justify-center gap-20 max-w-7xl mx-auto px-12"
          >
            {/* 🖼️ Product Stage */}
            <div className="w-[45%] h-[80%] flex items-center justify-center relative">
              <motion.div
                animate={{ 
                   rotate: [0, 2, -2, 0],
                   scale: [1, 1.05, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="relative w-full aspect-square bg-gradient-to-b from-white/10 to-transparent rounded-[4rem] flex items-center justify-center border-4 border-white/5 shadow-[0_0_150px_rgba(217,119,6,0.2)]"
              >
                <img 
                  src={product.image} 
                  alt={product.titleAr} 
                  className="max-w-[75%] max-h-[75%] object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,1)] z-10"
                />
                
                {/* Visual Focus Spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.2),transparent_70%)] rounded-full"></div>
              </motion.div>
            </div>

            {/* 📝 Content Area */}
            <div className="w-[55%] flex flex-col justify-center text-right space-y-12" dir="rtl">
              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute -bottom-4 right-0 h-4 bg-[#FBBF24]/30 rounded-full"
                ></motion.div>
                <h2 className="text-[12rem] font-black text-[#FBBF24] leading-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                  {product.titleAr}
                </h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-6xl text-white font-bold leading-tight drop-shadow-md"
              >
                {product.descriptionAr}
              </motion.p>

              {/* Price Cards */}
              <div className="flex gap-10 w-full pt-8">
                {product.prices.map((price, idx) => (
                  <motion.div 
                    key={price.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="flex-1 bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border-4 border-white/10 flex flex-col items-center justify-center shadow-2xl"
                  >
                    <span className="text-4xl text-white/50 font-black mb-6">{price.sizeAr}</span>
                    <div className="flex items-baseline gap-4">
                       <span className="text-[10rem] font-black text-[#FBBF24] leading-none">{price.price}</span>
                       <span className="text-5xl font-bold text-[#FBBF24]">درهم</span>
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
