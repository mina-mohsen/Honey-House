import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Square, Download, Settings, Info } from 'lucide-react';
import { PRODUCTS } from './constants';

const DisplayComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isManifesto = PRODUCTS[currentIndex]?.id === 'brand-manifesto-hook';
    const isTeaser = PRODUCTS[currentIndex]?.id === 'teaser-hook';
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 10000); // 10s for all slides as requested
    return () => clearInterval(timer);
  }, [currentIndex]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'browser',
        },
        audio: false
      });

      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `HoneyHouse_Promo_${new Date().getTime()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setRecordDuration(0);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      recorder.start();
      setIsRecording(true);
      
      // Start duration counter
      timerRef.current = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Recording error:", err);
      alert("عذراً، يجب اختيار 'هذه العلامة' (Current Tab) لبدء التسجيل بنجاح.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const product = PRODUCTS[currentIndex];

  const BrandManifesto = () => {
    const values = [
      { 
        title: "25 عاماً من الخبرة", 
        desc: "أصالة بدأت منذ ربع قرن في إنتاج أجود أنواع العسل.", 
        icon: "🏅",
        color: "from-amber-600/30 to-amber-900/40"
      },
      { 
        title: "مناحلنا الخاصة", 
        desc: "نمتلك مناحلنا ونشرف على كل قطرة تخرج منها لضمان الجودة.", 
        icon: "🐝",
        color: "from-amber-500/20 to-amber-700/30"
      },
      { 
        title: "نقاء مطلق", 
        desc: "عسل خام 100% غير مسخن يحافظ على الإنزيمات الحية.", 
        icon: "🛡️",
        color: "from-white/10 to-amber-900/20"
      },
      { 
        title: "شفاء طبيعي", 
        desc: "يستخدم كدرع لمناعتك ومصدر طبيعي مستدام للطاقة.", 
        icon: "✨",
        color: "from-amber-600/20 to-amber-800/40"
      }
    ];

    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-10 px-6 lg:px-20" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-[1400px]">
          
          {/* Visual Side: Logo + Slogan */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-right space-y-8"
          >
             <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-10 bg-gradient-to-tr from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-full blur-3xl"
                />
                <img 
                  src="https://imgur.com/tpBWWTy.jpeg" 
                  alt="Honey House Legacy" 
                  className="w-24 h-24 md:w-36 md:h-36 object-contain relative z-10 drop-shadow-[0_0_50px_rgba(245,158,11,0.4)]"
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-amber-500 text-black font-black px-3 py-1 rounded-full border-2 border-black z-20 text-xs md:text-sm rotate-12"
                >
                  منذ ٢٠٠١
                </motion.div>
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  <span className="text-amber-500">25 عاماً</span> من الخبرة <br/> بين يديك.
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-bold max-w-xl">
                  بدأنا بمناحلنا الخاصة منذ ربع قرن، لنقدم لكم اليوم خلاصة الطبيعة والخبرة في كل عبوة عسل.
                </p>
             </div>
          </motion.div>

          {/* Bento Grid Side: Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br ${v.color} backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/50 transition-all duration-500 shadow-2xl`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl">{v.icon}</span>
                  </div>
                  <span className="text-4xl mb-4 block">{v.icon}</span>
                  <h3 className="text-2xl font-black text-white mb-2">{v.title}</h3>
                  <p className="text-white/60 text-lg font-bold leading-relaxed">{v.desc}</p>
                </motion.div>
             ))}
          </div>

        </div>

        {/* Global Assurance Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 py-4 px-12 rounded-full border border-amber-500/30 bg-amber-500/5 flex items-center gap-6"
        >
           <span className="text-amber-500 font-black text-xl">✦ خبرة 25 عاماً في المناحل ✦</span>
           <div className="h-4 w-px bg-amber-500/30"></div>
           <span className="text-white/60 font-bold uppercase tracking-widest text-sm">Laboratories Certified Organic & Bio-Active</span>
        </motion.div>
      </div>
    );
  };

  const QualityTeaser = () => {
    const [step, setStep] = useState(0);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const messages = [
      { text: "تعبت من المنتجات المغشوشة، عايز عسل يرفع مناعتي بجد؟ 💔", sender: "user" },
      { text: "جرب 'خلاصة المنحل'.. عسل خام 100% غير مسخن، مفعوله جبار للنشاط والصحة! 🔥", sender: "ai" },
      { text: "الأسعار غالية في المتاجر، كيف أسعاركم وجودتكم؟ 💸", sender: "user" },
      { text: "أفضل جودة وأقل سعر في الإمارات! خصومات كبرى الآن.. اطلب قبل نفاذ الكمية! 🏃‍♂️💨", sender: "ai" }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setStep(prev => (prev < messages.length ? prev + 1 : prev));
      }, 2000); // Faster sequence to fit 10s
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [step]);

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 lg:p-8" dir="rtl">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full max-h-[75vh]">
          
          {/* Simulation Chat Box - Tighter for fitting */}
          <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-amber-500/20 p-6 shadow-[0_0_100px_rgba(245,158,11,0.1)] space-y-4 h-[400px] lg:h-[450px] flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-1">
               <div className="w-2 h-2 rounded-full bg-red-500/50" />
               <div className="w-2 h-2 rounded-full bg-amber-500/50" />
               <div className="w-2 h-2 rounded-full bg-green-500/50" />
               <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em] mr-auto">Wellness Advisor</span>
            </div>
            
            <div 
              ref={chatContainerRef}
              className="flex-1 space-y-4 overflow-y-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
               <AnimatePresence mode="popLayout">
                 {messages.slice(0, step).map((msg, i) => (
                   <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                   >
                      <div className={`max-w-[90%] p-4 md:p-5 rounded-[1.8rem] text-sm md:text-base lg:text-lg font-bold shadow-xl overflow-hidden relative
                        ${msg.sender === 'user' 
                          ? 'bg-white/5 text-white/60 border border-white/10 rounded-tr-none' 
                          : 'bg-gradient-to-br from-amber-500 to-amber-600 text-black border border-amber-400 rounded-tl-none shadow-[0_8px_25px_rgba(245,158,11,0.2)]'
                        }`}
                      >
                         {msg.text}
                         {msg.sender === 'ai' && (
                           <motion.div 
                            animate={{ x: ['100%', '-100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white/10 skew-x-12 pointer-events-none"
                           />
                         )}
                      </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </div>

          {/* Marketing Visuals: The Legacy */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-right space-y-10"
          >
             <div className="relative group">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-12 bg-gradient-to-tr from-amber-500/0 via-amber-500/10 to-amber-500/0 rounded-full blur-[60px]"
                />
                <img 
                  src="https://imgur.com/tpBWWTy.jpeg" 
                  alt="Honey House Logo" 
                  className="w-28 h-28 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-[0_0_80px_rgba(245,158,11,0.6)] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-black px-3 py-0.5 rounded-full border-2 border-black z-20 text-xs shadow-2xl skew-x-[-10deg]">
                  مـنـذ ٢٠٠١
                </div>
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  بيت العسل: <br/> <span className="text-amber-500">صحتك هي استثمارك</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/40 font-bold max-w-2xl mx-auto lg:mx-0 leading-relaxed italic">
                  "عسل خام، نقي، ومضمون.. أقوى عروض التعافي والنشاط تبدأ من هنا!"
                </p>
             </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 flex flex-col items-center gap-2"
        >
           <span className="text-amber-500/60 font-black text-[10px] tracking-[0.4em] uppercase">Scroll For Products</span>
           <div className="w-px h-8 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#020202] text-white flex flex-col font-cairo overflow-hidden selection:bg-amber-500/30">
      {/* 🌌 Luxury Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vh] bg-amber-900/15 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vh] bg-amber-600/5 blur-[100px] rounded-full"></div>
      </div>

      {/* 🚀 Header: Slim Luxury Rail - Unified Branding on Right */}
      <div className="h-[12vh] min-h-[80px] bg-black/40 backdrop-blur-md flex items-center justify-between px-6 md:px-12 lg:px-20 border-b border-white/5 z-50 overflow-hidden">
        {/* Left: Dynamic Promo Tags */}
        <div className="flex gap-4 md:gap-8">
           <div className="flex flex-col items-center group relative">
              <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 md:px-10 py-1.5 md:py-2.5">
                <motion.div 
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[35deg] pointer-events-none"
                />
                <span className="text-xl md:text-2xl font-black text-white leading-none relative z-10">الحق العرض اليوم</span>
              </div>
              <span className="text-xs md:text-sm font-bold text-white/50 mt-1 uppercase tracking-wider">LIMITED QUANTITY</span>
           </div>
           
           <div className="flex flex-col items-center group relative">
              <div className="relative overflow-hidden rounded-full border border-amber-500/30 bg-amber-500/5 px-6 md:px-10 py-1.5 md:py-2.5">
                <motion.div 
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent skew-x-[35deg] pointer-events-none"
                />
                <span className="text-xl md:text-2xl font-black text-amber-500 leading-none relative z-10">خصم خاص وحصري</span>
              </div>
              <span className="text-xs md:text-sm font-bold text-amber-500/50 mt-1 uppercase tracking-wider">LIMITED TIME PROMO</span>
           </div>
        </div>

        {/* Right: Brand Identity - English Only */}
        <div className="flex items-center gap-4 md:gap-6 flex-row-reverse">
           <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-amber-500 shadow-2xl shrink-0 p-1">
              <img 
                src="https://imgur.com/tpBWWTy.jpeg" 
                alt="Honey House Logo" 
                className="w-full h-full object-contain"
              />
           </div>
           <div className="flex flex-col text-right">
              <h1 className="text-xl md:text-3xl font-black text-white tracking-widest leading-none uppercase">Honey House</h1>
              <span className="text-[8px] md:text-[9px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200 tracking-[0.4em] uppercase mt-1">Premium Quality Selection</span>
           </div>
        </div>
      </div>

      {/* 🍯 Advertising Canvas: Strictly Contained Layout */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-8 md:px-16 lg:px-24 py-10">
        <AnimatePresence mode="wait">
          {product.id === 'brand-manifesto-hook' ? (
            <motion.div
              key="brand-manifesto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <BrandManifesto />
            </motion.div>
          ) : product.id === 'teaser-hook' ? (
            <motion.div
              key="teaser-hook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <QualityTeaser />
            </motion.div>
          ) : (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center content-center"
            >
            {/* Left Column: Product Info */}
            <div className="flex flex-col justify-center text-right space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1" dir="rtl">
              <div className="space-y-2 md:space-y-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="h-1 w-24 bg-gradient-to-r from-amber-600 to-amber-400 origin-right rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                />
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-200 to-amber-500 leading-[1.1] tracking-tight drop-shadow-2xl"
                >
                  {product.titleAr}
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg lg:text-xl text-white/80 font-bold leading-relaxed border-r-4 border-amber-500 pr-5"
              >
                {product.descriptionAr}
              </motion.p>

              {/* Pricing Grid - Balanced & Eye-Catching */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
                {product.prices.map((p, idx) => (
                   <motion.div 
                    key={p.id}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className={`bg-gradient-to-br transition-all duration-500 backdrop-blur-3xl p-4 md:p-5 rounded-[1.5rem] border border-white/10 flex flex-col items-center justify-center shadow-lg group relative overflow-hidden ${
                      product.prices.length === 1 
                      ? 'col-span-2 from-amber-500/20 to-amber-950/40 border-amber-500/50 scale-105' 
                      : 'from-white/10 to-amber-950/20 hover:border-amber-500/30'
                    }`}
                  >
                    {p.originalPrice && (
                      <div className="absolute top-2 right-4 flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-xs md:text-sm font-bold text-white/30 line-through decoration-red-500/50 decoration-2">
                             {p.originalPrice}
                          </span>
                          <span className="text-[10px] text-white/40">درهم</span>
                        </div>
                        <div className="bg-red-500 text-[9px] md:text-[11px] font-black px-2 py-0.5 rounded-full text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
                          وفر {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                        </div>
                      </div>
                    )}

                    <span className={`font-black uppercase tracking-widest mb-1 ${product.prices.length === 1 ? 'text-2xl md:text-3xl text-white' : 'text-xl md:text-2xl text-amber-500'}`}>
                      {p.sizeAr}
                    </span>
                    
                    {p.price > 0 && (
                      <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-1">
                          <motion.span 
                            animate={{ 
                              textShadow: ['0 0 10px rgba(251,191,36,0)', '0 0 30px rgba(251,191,36,0.8)', '0 0 10px rgba(251,191,36,0)'],
                              scale: [1, 1.08, 1]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-black text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                          >
                            {p.price}
                          </motion.span>
                          <span className="text-sm md:text-xl font-bold text-white/60 lowercase">درهم</span>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-amber-500/50 uppercase tracking-[0.2em] mt-1">Special Offer Price</span>
                      </div>
                    )}
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
          )}
        </AnimatePresence>
      </div>

      {/* 📜 Footer: Robust Status Rail */}
      <div className="h-[10vh] min-h-[60px] bg-black/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-10 md:px-20 relative shrink-0">
        <div className="flex items-center gap-10 overflow-hidden">
          <div className="flex flex-col shrink-0">
            <span className="text-[9px] uppercase text-white/20 font-black tracking-widest mb-0.5">PREMIUM SELECTION VIEW</span>
            <span className="text-base md:text-xl font-bold text-white whitespace-nowrap">عسل طبيعي 100% من المنحل مباشرة إلى منزلك في الإمارات</span>
          </div>
          <div className="hidden lg:block w-px h-8 bg-white/10 mx-2"></div>
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden xl:block text-xl font-bold text-amber-500/80"
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

        {/* 🎥 Recording Controls - Floating Left */}
        <div className="absolute left-6 bottom-4 md:left-12 md:bottom-6 flex items-center gap-3">
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 bg-red-600 px-4 py-2 rounded-full border border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Recording </span>
                <span className="text-xs font-mono font-bold text-white/80">
                  {Math.floor(recordDuration / 60)}:{String(recordDuration % 60).padStart(2, '0')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="relative group">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl ${
                isRecording 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-amber-500 text-black hover:bg-amber-400 hover:scale-105 active:scale-95'
              }`}
            >
              {isRecording ? <Square size={14} fill="currentColor" /> : <Video size={14} fill="currentColor" />}
              {isRecording ? 'إيقاف التسجيل' : 'حفظ كفيديو'}
            </button>

            {!isRecording && (
              <div className="absolute bottom-full left-0 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl">
                   <div className="flex items-start gap-2">
                     <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
                     <p className="text-[10px] text-white/60 leading-relaxed font-bold">
                       لتحويل الشاشة إلى فيديو لمشاركته على واتساب: <br/>
                       ١. اضغط "حفظ كفيديو"<br/>
                       ٢. اختر <span className="text-amber-500">هذه العلامة (Current Tab)</span><br/>
                       ٣. اختر <span className="text-amber-500">مشاركة (Share)</span><br/>
                       ٤. سيبدأ التسجيل فوراً ويحفظ تلقائياً عند الإيقاف.
                     </p>
                   </div>
                </div>
                <div className="w-3 h-3 bg-black/90 rotate-45 border-r border-b border-white/10 ml-6 -mt-1.5" />
              </div>
            )}
          </div>
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
