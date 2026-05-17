import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Square, Download, Settings, Info } from 'lucide-react';
import { PRODUCTS } from './constants';

const DisplayComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isStandardMode, setIsStandardMode] = useState(false);
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
    // Check if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      alert("⚠️ ميزة التسجيل المباشر تعمل بشكل أفضل على أجهزة الكمبيوتر. \n\nعلى الموبايل: يرجى استخدام ميزة 'تسجيل الشاشة' (Screen Record) الموجودة في إعدادات موبايلك للحصول على أفضل جودة فيديو.");
      return;
    }

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
        title: lang === 'ar' ? "25 عاماً من الخبرة" : "25 Years of Experience", 
        desc: lang === 'ar' ? "أصالة بدأت منذ ربع قرن في إنتاج أجود أنواع العسل." : "Began a quarter-century ago producing the finest honey.", 
        icon: "🏅",
        color: "from-amber-600/30 to-amber-900/40"
      },
      { 
        title: lang === 'ar' ? "مناحلنا الخاصة" : "Our Own Apiaries", 
        desc: lang === 'ar' ? "نمتلك مناحلنا ونشرف على كل قطرة تخرج منها لضمان الجودة." : "We own our apiaries and oversee every drop to ensure quality.", 
        icon: "🐝",
        color: "from-amber-500/20 to-amber-700/30"
      },
      { 
        title: lang === 'ar' ? "نقاء مطلق" : "Absolute Purity", 
        desc: lang === 'ar' ? "عسل خام 100% غير مسخن يحافظ على الإنزيمات الحية." : "100% raw unheated honey that preserves live enzymes.", 
        icon: "🛡️",
        color: "from-white/10 to-amber-900/20"
      },
      { 
        title: lang === 'ar' ? "شفاء طبيعي" : "Natural Healing", 
        desc: lang === 'ar' ? "يستخدم كدرع لمناعتك ومصدر طبيعي مستدام للطاقة." : "Used as an immunity shield and sustainable energy source.", 
        icon: "✨",
        color: "from-amber-600/20 to-amber-800/40"
      }
    ];

    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-4 md:py-10 px-4 md:px-12 lg:px-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-16 items-center w-full max-w-[1600px] flex-1">
          
          {/* Visual Side: Logo + Slogan */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col items-center ${lang === 'ar' ? 'lg:items-start text-center lg:text-right' : 'lg:items-end text-center lg:text-left'} space-y-6 md:space-y-8`}
          >
             <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-10 bg-gradient-to-tr from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-full blur-3xl opacity-60"
                />
                <img 
                  src="https://imgur.com/tpBWWTy.jpeg" 
                  alt="Honey House Legacy" 
                  className="w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40 object-contain relative z-10 drop-shadow-[0_0_50px_rgba(245,158,11,0.4)]"
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 ${lang === 'ar' ? '-right-1' : '-left-1'} bg-amber-500 text-black font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full border-2 border-black z-20 text-[10px] md:text-sm rotate-12`}
                >
                  {lang === 'ar' ? 'منذ ٢٠٠١' : 'Since 2001'}
                </motion.div>
             </div>
             <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                  <span className="text-amber-500">{lang === 'ar' ? '25 عاماً' : '25 Years'}</span> {lang === 'ar' ? 'من الخبرة' : 'of Expertise'} <br/> {lang === 'ar' ? 'بين يديك.' : 'in Your Hands.'}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-white/60 font-bold max-w-xl">
                  {lang === 'ar' ? 'خلاصة الطبيعة والخبرة في كل عبوة عسل.' : 'Nature\'s essence and expertise in every honey jar.'}
                </p>
             </div>
          </motion.div>

          {/* Bento Grid Side: Values */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6">
             {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-3 md:p-6 lg:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-white/10 bg-gradient-to-br ${v.color} backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/50 transition-all duration-500 shadow-2xl flex flex-col justify-center h-full min-h-[100px] md:min-h-[200px]`}
                >
                  <div className="absolute top-0 right-0 p-2 md:p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                    <span className="text-4xl md:text-8xl">{v.icon}</span>
                  </div>
                  <span className="text-xl md:text-4xl mb-1 md:mb-4 block">{v.icon}</span>
                  <h3 className="text-sm md:text-2xl font-black text-white mb-0.5 md:mb-2">{v.title}</h3>
                  <p className="text-white/60 text-[9px] md:text-lg font-bold leading-tight md:leading-relaxed">{v.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>

        {/* Global Assurance Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 md:mt-12 py-2 md:py-4 px-6 md:px-12 rounded-full border border-amber-500/30 bg-amber-500/5 flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
           <span className="text-amber-500 font-black text-sm md:text-xl">✦ {lang === 'ar' ? 'خبرة ربع قرن' : 'Quarter Century of Experience'} ✦</span>
           <div className="hidden md:block h-4 w-px bg-amber-500/30"></div>
           <span className="text-white/60 font-bold uppercase tracking-widest text-[9px] md:text-sm">Certified Pure & Bio-Active Selection</span>
        </motion.div>
      </div>
    );
  };

  const QualityTeaser = () => {
    const [step, setStep] = useState(0);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const messages = [
      { 
        text: lang === 'ar' ? "تعبت من المنتجات المغشوشة، عايز عسل يرفع مناعتي بجد؟ 💔" : "Tired of fake products, I want honey that really boosts my immunity? 💔", 
        sender: "user" 
      },
      { 
        text: lang === 'ar' ? "جرب 'خلاصة المنحل'.. عسل خام 100% غير مسخن، مفعوله جبار للنشاط والصحة! 🔥" : "Try 'Apiary Essence'.. 100% raw unheated honey, powerful for energy and health! 🔥", 
        sender: "ai" 
      },
      { 
        text: lang === 'ar' ? "الأسعار غالية في المتاجر، كيف أسعاركم وجودتكم؟ 💸" : "Prices are high in stores, how about your prices and quality? 💸", 
        sender: "user" 
      },
      { 
        text: lang === 'ar' ? "أفضل جودة وأقل سعر في الإمارات! خصومات كبرى الآن.. اطلب قبل نفاذ الكمية! 🏃‍♂️💨" : "Best quality and lowest price in UAE! Big discounts now.. Order before stock runs out! 🏃‍♂️💨", 
        sender: "ai" 
      }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setStep(prev => (prev < messages.length ? prev + 1 : prev));
      }, 2000); // Faster sequence to fit 10s
      return () => clearInterval(interval);
    }, [lang]);

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [step]);

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 lg:p-12 xl:p-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center flex-1 h-full max-h-[85vh]">
          
          {/* Simulation Chat Box - Fluid Height Intelligence */}
          <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[1.5rem] md:rounded-[3rem] p-4 md:p-8 border border-amber-500/20 shadow-[0_0_100px_rgba(245,158,11,0.1)] space-y-3 md:space-y-4 h-full min-h-[280px] md:min-h-[400px] lg:min-h-[500px] flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
               <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
               <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
               <span className={`text-[9px] md:text-xs text-amber-500 font-black uppercase tracking-[0.2em] ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}>Wellness Advisor</span>
            </div>
            
            <div 
              ref={chatContainerRef}
              className="flex-1 space-y-3 md:space-y-6 overflow-y-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
               <AnimatePresence mode="popLayout">
                 {messages.slice(0, step).map((msg, i) => (
                   <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                   >
                      <div className={`max-w-[85%] p-3 md:p-6 rounded-[1.2rem] md:rounded-[2rem] text-xs md:text-lg lg:text-xl font-bold shadow-xl overflow-hidden relative
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
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col items-center ${lang === 'ar' ? 'lg:items-start text-center lg:text-right' : 'lg:items-end text-center lg:text-left'} space-y-8 lg:space-y-12`}
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
                  className="w-24 h-24 md:w-44 md:h-44 xl:w-56 xl:h-56 object-contain relative z-10 drop-shadow-[0_0_80px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-black px-4 py-1 rounded-full border-2 border-black z-20 text-[10px] md:text-sm shadow-2xl skew-x-[-10deg]`}>
                  {lang === 'ar' ? 'مـنـذ ٢٠٠١' : 'Since 2001'}
                </div>
             </div>
             <div className="space-y-4">
                <h2 className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight">
                  {lang === 'ar' ? 'بيت العسل:' : 'Honey House:'} <br/> <span className="text-amber-500">{lang === 'ar' ? 'صحتك هي استثمارك' : 'Your Health is Your Investment'}</span>
                </h2>
                <p className="text-lg md:text-2xl lg:text-3xl text-white/40 font-bold max-w-2xl mx-auto lg:mx-0 leading-relaxed italic">
                  {lang === 'ar' ? '"عسل خام، نقي، ومضمون.. أقوى عروض التعافي والنشاط تبدأ من هنا!"' : '"Raw, pure, guaranteed honey.. The strongest recovery and vitality offers start here!"'}
                </p>
             </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 md:mt-10 flex flex-col items-center gap-2"
        >
           <span className="text-amber-500/60 font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">{lang === 'ar' ? 'Scroll For Products' : 'Scroll For Products'}</span>
           <div className="w-px h-6 md:h-10 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </div>
    );
  };

  const FullMenuSummary = () => {
    const productsList = PRODUCTS.filter(p => !['teaser-hook', 'brand-manifesto-hook', 'full-menu-summary'].includes(p.id));
    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1600px] w-full flex flex-col items-center gap-6"
        >
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-amber-500 uppercase tracking-tight">
              {lang === 'ar' ? 'قائمة الأسعار والأوزان الرئيسية' : 'Main Price List & Weights'}
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="bg-green-600/20 text-green-500 border border-green-500/30 px-6 py-2 rounded-full font-black text-sm md:text-xl">
                {lang === 'ar' ? 'توصيل مجاني 🚚' : 'Free Delivery 🚚'}
              </span>
              <span className="bg-amber-500 text-black px-6 py-2 rounded-full font-black text-sm md:text-xl shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                {lang === 'ar' ? '10% خصم للمبيعات فوق 250 درهم 🔥' : '10% OFF on orders over 250 AED 🔥'}
              </span>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
            {productsList.map((prod, pIdx) => (
              <motion.div 
                key={prod.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: pIdx * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-[1.5rem] p-4 flex flex-col gap-3 group hover:border-amber-500/30 transition-all hover:bg-white/[0.08]"
              >
                 <div className={`flex items-center gap-4 ${lang === 'ar' ? '' : 'flex-row-reverse text-left'}`}>
                   <img src={prod.image} className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform" alt="" />
                   <div className="flex-1">
                     <h3 className="text-sm md:text-lg font-black text-white">{lang === 'ar' ? prod.titleAr : prod.titleEn}</h3>
                     <p className="text-[10px] md:text-xs text-white/40 font-bold leading-tight line-clamp-2 mt-0.5">{lang === 'ar' ? prod.descriptionAr : prod.descriptionEn}</p>
                   </div>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {prod.prices.map(price => (
                      <div key={price.id} className="bg-black/40 border border-white/5 px-3 py-2 rounded-xl flex items-center justify-between flex-1 min-w-[120px]">
                        <span className="text-[10px] md:text-xs font-black text-amber-500">{lang === 'ar' ? price.sizeAr : price.sizeEn}</span>
                        <div className="flex flex-col items-end">
                           <span className="text-sm md:text-lg font-black text-white">{price.originalPrice || price.price} {lang === 'ar' ? 'درهم' : 'AED'}</span>
                           {price.originalPrice && !isStandardMode && (
                             <span className="text-[8px] md:text-[10px] text-white/20 line-through">{lang === 'ar' ? 'خصم خاص' : 'Special Discount'}</span>
                           )}
                        </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
             <span className="text-white/40 font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">Trusted and Certified Honey House</span>
             <div className="w-px h-8 bg-gradient-to-b from-amber-500 to-transparent" />
          </div>
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
              <div className={`relative overflow-hidden rounded-full border border-white/10 ${isStandardMode ? 'bg-green-600/20 border-green-500/30' : 'bg-white/5'} px-6 md:px-10 py-1.5 md:py-2.5`}>
                <motion.div 
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[35deg] pointer-events-none"
                />
                <span className={`text-xl md:text-2xl font-black ${isStandardMode ? 'text-green-500' : 'text-white'} leading-none relative z-10`}>
                  {isStandardMode 
                    ? (lang === 'ar' ? 'توصيل مجاني 🚚' : 'Free Delivery 🚚') 
                    : (lang === 'ar' ? 'الحق العرض اليوم' : 'Grab Today\'s Offer')}
                </span>
              </div>
              <span className={`text-xs md:text-sm font-bold ${isStandardMode ? 'text-green-500/50' : 'text-white/50'} mt-1 uppercase tracking-wider`}>
                {isStandardMode ? 'FREE UAE DELIVERY' : 'LIMITED QUANTITY'}
              </span>
           </div>
           
           <div className="flex flex-col items-center group relative">
              <div className="relative overflow-hidden rounded-full border border-amber-500/30 bg-amber-500/5 px-6 md:px-10 py-1.5 md:py-2.5">
                <motion.div 
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent skew-x-[35deg] pointer-events-none"
                />
                <span className="text-xl md:text-2xl font-black text-amber-500 leading-none relative z-10">
                  {isStandardMode 
                    ? (lang === 'ar' ? 'خصم %10 فوق 250د.إ' : '10% OFF over 250 AED') 
                    : (lang === 'ar' ? 'خصم خاص وحصري' : 'Exclusive Discount')}
                </span>
              </div>
              <span className="text-xs md:text-sm font-bold text-amber-500/50 mt-1 uppercase tracking-wider">
                {isStandardMode ? 'LOYALTY DISCOUNT' : 'LIMITED TIME PROMO'}
              </span>
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
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-4 md:px-16 lg:px-24 py-6 md:py-12">
        <AnimatePresence mode="wait">
          {product.id === 'brand-manifesto-hook' ? (
            <motion.div
              key="brand-manifesto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <BrandManifesto />
            </motion.div>
          ) : product.id === 'teaser-hook' ? (
            <motion.div
              key="teaser-hook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <QualityTeaser />
            </motion.div>
          ) : product.id === 'full-menu-summary' ? (
            <motion.div
              key="full-menu-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <FullMenuSummary />
            </motion.div>
          ) : (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-24 items-center content-center"
            >
            {/* Left Column: Product Info */}
            <div className={`flex flex-col justify-center ${lang === 'ar' ? 'text-right' : 'text-left'} space-y-4 md:space-y-6 lg:space-y-10 order-2 lg:order-1`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <div className="space-y-2 md:space-y-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className={`h-1 md:h-2 w-24 md:w-32 bg-gradient-to-r from-amber-600 to-amber-400 ${lang === 'ar' ? 'origin-right' : 'origin-left'} rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]`}
                />
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-200 to-amber-500 leading-tight tracking-tight drop-shadow-2xl"
                >
                  {lang === 'ar' ? product.titleAr : product.titleEn}
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-base md:text-2xl lg:text-3xl text-white/80 font-bold leading-relaxed ${lang === 'ar' ? 'border-r-4 md:border-r-8' : 'border-l-4 md:border-l-8'} border-amber-500 ${lang === 'ar' ? 'pr-5' : 'pl-5'}`}
              >
                {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
              </motion.p>

              {/* Pricing Grid - Balanced & Eye-Catching */}
              <div className="grid grid-cols-2 gap-2 md:gap-5 xl:gap-8 pt-2 md:pt-4">
                {product.prices.map((p, idx) => (
                   <motion.div 
                    key={p.id}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className={`bg-gradient-to-br transition-all duration-500 backdrop-blur-3xl p-3 md:p-8 xl:p-12 rounded-[1.2rem] md:rounded-[3rem] border border-white/10 flex flex-col items-center justify-center shadow-lg group relative overflow-hidden ${
                      product.prices.length === 1 
                      ? 'col-span-2 from-amber-500/20 to-amber-950/40 border-amber-500/50 scale-[1.02] md:scale-105' 
                      : 'from-white/10 to-amber-950/20 hover:border-amber-500/30'
                    }`}
                  >
                    {p.originalPrice && !isStandardMode && (
                      <div className={`absolute top-1.5 ${lang === 'ar' ? 'right-3 md:right-6' : 'left-3 md:left-6'} md:top-3 flex flex-col items-end gap-0.5 md:gap-1`}>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] md:text-xl font-bold text-white/30 line-through decoration-red-500/50 decoration-1 md:decoration-2">
                             {p.originalPrice}
                          </span>
                          <span className="text-[8px] md:text-sm text-white/40">{lang === 'ar' ? 'درهم' : 'AED'}</span>
                        </div>
                        <div className="bg-red-500 text-[8px] md:text-sm font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
                          {lang === 'ar' ? 'وفر' : 'Save'} {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                        </div>
                      </div>
                    )}

                    <span className={`font-black uppercase tracking-widest mb-1 md:mb-2 ${product.prices.length === 1 ? 'text-lg md:text-4xl text-white' : 'text-sm md:text-3xl text-amber-500'}`}>
                      {lang === 'ar' ? p.sizeAr : p.sizeEn}
                    </span>
                    
                    {(isStandardMode ? (p.originalPrice || p.price) : p.price) > 0 && (
                      <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <motion.span 
                            animate={{ 
                              textShadow: isStandardMode ? [] : ['0 0 10px rgba(251,191,36,0)', '0 0 30px rgba(251,191,36,0.8)', '0 0 10px rgba(251,191,36,0)'],
                              scale: isStandardMode ? [1] : [1, 1.08, 1]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                            className={`text-2xl md:text-7xl lg:text-8xl xl:text-9xl font-black ${isStandardMode ? 'text-white' : 'text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]'}`}
                          >
                            {isStandardMode ? (p.originalPrice || p.price) : p.price}
                          </motion.span>
                          <span className="text-[10px] md:text-2xl lg:text-3xl font-bold text-white/60 lowercase">{lang === 'ar' ? 'درهم' : 'AED'}</span>
                        </div>
                        <span className="text-[8px] md:text-base font-black text-amber-500/50 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1 md:mt-4">
                          {isStandardMode 
                            ? (lang === 'ar' ? 'السعر الأساسي' : 'Standard Price') 
                            : (lang === 'ar' ? 'السعر النهائي' : 'Final Price')}
                        </span>
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
                className="relative w-full h-[40vh] md:h-[50vh] lg:h-full flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full"></div>
                <img 
                  src={product.image} 
                  alt={product.titleAr}
                  className="max-w-[130%] max-h-[130%] object-contain drop-shadow-[0_80px_100px_rgba(0,0,0,0.85)] z-10"
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
            <span className="text-base md:text-xl font-bold text-white whitespace-nowrap">
              {lang === 'ar' ? 'عسل طبيعي 100% من المنحل مباشرة إلى منزلك في الإمارات' : '100% Natural Honey from the Apiary directly to your home in UAE'}
            </span>
          </div>
          <div className="hidden lg:block w-px h-8 bg-white/10 mx-2"></div>
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden xl:block text-xl font-bold text-amber-500/80"
          >
            {lang === 'ar' ? 'جودة تستحق الثقة لبيت العسل 🍯' : 'Quality You Can Trust at Honey House 🍯'}
          </motion.span>
        </div>

        <div className="flex gap-4 items-center">
          {/* Controls */}
          <button 
             onClick={() => { window.location.hash = ""; window.location.reload(); }}
             className="text-[10px] font-black text-white/20 hover:text-white transition-colors tracking-widest uppercase mr-6"
          >
            {lang === 'ar' ? 'إغلاق الشاشة' : 'Close View'}
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
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl border bg-amber-500 text-black border-amber-500 hover:bg-amber-400"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>

          <button
            onClick={() => setIsStandardMode(!isStandardMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl border ${
              isStandardMode 
              ? 'bg-white text-black border-white' 
              : 'bg-black/40 text-amber-500 border-amber-500/30 hover:bg-black/60'
            }`}
          >
            {isStandardMode 
              ? (lang === 'ar' ? 'شاشة العروض' : 'Promo View') 
              : (lang === 'ar' ? 'شاشة العرض الأساسية' : 'Standard View')}
          </button>

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
              {isRecording 
                ? (lang === 'ar' ? 'إيقاف التسجيل' : 'Stop Recording') 
                : (lang === 'ar' ? 'حفظ كفيديو' : 'Save Video')}
            </button>

            {!isRecording && (
              <div className="absolute bottom-full left-0 mb-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl">
                   <div className="flex items-start gap-2">
                     <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
                     <p className="text-[10px] text-white/60 leading-relaxed font-bold">
                       {lang === 'ar' ? (
                         <>
                           لتحويل الشاشة إلى فيديو لمشاركته على واتساب: <br/>
                           ١. اضغط "حفظ كفيديو"<br/>
                           ٢. اختر <span className="text-amber-500">هذه العلامة (Current Tab)</span><br/>
                           ٣. اختر <span className="text-amber-500">مشاركة (Share)</span><br/>
                           ٤. سيبدأ التسجيل فوراً ويحفظ تلقائياً عند الإيقاف.
                         </>
                       ) : (
                         <>
                           To convert screen to video: <br/>
                           1. Click "Save Video"<br/>
                           2. Select <span className="text-amber-500">This Tab (Current Tab)</span><br/>
                           3. Click <span className="text-amber-500">Share</span><br/>
                           4. Recording starts and saves automatically on stop.
                         </>
                       )}
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
