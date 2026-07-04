import { Product, Language } from './types';

export const WHATSAPP_NUMBER = '971568326116';
export const INSTAGRAM_URL = 'https://www.instagram.com/honeyhouse247/';

export interface ProductExtended extends Product {
  benefitsAr: string[];
  benefitsEn: string[];
}

export const PRODUCTS: ProductExtended[] = [
  {
    id: 'citrus-blossom-saim',
    titleAr: 'عسل زهرة الموالح الصائم',
    titleEn: 'Citrus Blossom Saim Honey',
    descriptionAr: 'عسل زهرة الموالح الصائم الفاخر، يُنتج من رحيق أزهار الحمضيات والموالح الفواحة. يتميز بأنه عسل "صائم" تماماً، أي أن النحل لم يتغذى على أي محاليل سكرية طوال الموسم، مما يضمن نقاءً مطلقاً وجودة علاجية فائقة بنسبة سكريات مضافة صفرية. غني بالفيتامينات والمعادن وله نكهة حمضية منعشة وخفيفة.',
    descriptionEn: 'Premium Citrus Blossom Saim Honey, harvested from aromatic citrus orchards. It is strictly "Saim" (produced without any sugar syrup feeding), guaranteeing absolute purity, maximum bio-activity, and zero added sugars. Rich in vitamin C and essential minerals, it offers a refreshing, mildly citrus-scented taste.',
    image: 'https://imgur.com/SZsIZEg.jpeg',
    images: [
      'https://imgur.com/SZsIZEg.jpeg'
    ],
    benefitsAr: [
      'طبيعي وصائم 100%',
      'بدون أي محاليل سكرية طوال الموسم',
      'زيرو سكريات مضافة',
      'غني بالفيتامينات ومقوي فائق للمناعة'
    ],
    benefitsEn: [
      '100% Pure & Saim',
      'No Sugar Feeding All Season',
      'Zero Added Sugars',
      'Immune Boosting & Rich in Vitamins'
    ],
    prices: [
      { id: 'saim_1_2', sizeAr: '½ كيلو', sizeEn: '½ KG', price: 35, originalPrice: 70 },
      { id: 'saim_1_2_squeeze', sizeAr: '½ كيلو سكويز', sizeEn: '½ KG Squeeze', price: 40, originalPrice: 75 },
      { id: 'saim_1', sizeAr: '1 كيلو', sizeEn: '1 KG', price: 75, originalPrice: 150 },
    ]
  },
  {
    id: 'teaser-hook',
    titleAr: 'جاري فحص الجودة...',
    titleEn: 'Scanning Quality...',
    descriptionAr: 'استعد لاكتشاف أنقى أنواع العسل في الإمارات. فحص النقاء: 100% عسل خام.',
    descriptionEn: 'Get ready to discover the purest honey in UAE. Purity Check: 100% Raw Honey.',
    image: 'https://images.unsplash.com/photo-1558611997-d60293774640?q=80&w=2070&auto=format&fit=crop',
    benefitsAr: [],
    benefitsEn: [],
    prices: []
  },
  {
    id: 'squeeze-honey',
    titleAr: 'عسل طبيعي (عبوة اسكويز)',
    titleEn: 'Natural Honey (Squeeze Bottle)',
    descriptionAr: 'عسلنا النقي في عبوة "اسكويز" العصرية. رفيقك المثالي لتقوية مناعة أطفالك وحمايتهم يومياً من نوبات البرد المتكررة بلمسة واحدة سهلة.',
    descriptionEn: 'Pure honey in a modern squeeze bottle. Your perfect companion to strengthen your children\'s immunity and protect them daily from recurring colds with one easy squeeze.',
    image: 'https://imgur.com/vIdADYw.jpeg',
    benefitsAr: ['سهل الاستخدام', 'غني بالأنزيمات'],
    benefitsEn: ['Mess-free', 'Enzyme Rich'],
    prices: [
      { id: 'squeeze_1_4', sizeAr: '¼ كيلو', sizeEn: '¼ KG', price: 20, originalPrice: 30 },
      { id: 'squeeze_1_2', sizeAr: '½ كيلو', sizeEn: '½ KG', price: 35, originalPrice: 50 },
    ]
  },
  {
    id: 'clover-honey',
    titleAr: 'عسل نحل طبيعي بالشمع الفاخر',
    titleEn: 'Natural Honey with Premium Comb',
    descriptionAr: 'عسل طبيعي فاخر مباشرة من المنحل مع الشمع. يعتبر مضاداً حيوياً طبيعياً جباراً يحمي صدرك وجهازك التنفسي من الحساسية والكحة.',
    descriptionEn: 'Luxurious natural honey direct from the apiary with comb. Acts as a powerful natural antibiotic that protects your chest and respiratory system from allergies and cough.',
    image: 'https://imgur.com/8ozxEOZ.jpeg',
    benefitsAr: ['مقوي للمناعة', 'مضاد حيوي طبيعي'],
    benefitsEn: ['Immunity Boost', 'Natural Antibiotic'],
    prices: [
      { id: 'clover_1_4', sizeAr: '¼ كيلو', sizeEn: '¼ KG', price: 15, originalPrice: 25 },
      { id: 'clover_1_2', sizeAr: '½ كيلو', sizeEn: '½ KG', price: 30, originalPrice: 45 },
      { id: 'clover_1', sizeAr: '1 كيلو', sizeEn: '1 KG', price: 50, originalPrice: 85 },
    ]
  },
  {
    id: 'health-offer',
    titleAr: 'عرض الطاقة القصوى والصحة الشاملة',
    titleEn: 'Ultimate Energy & Holistic Health Offer',
    descriptionAr: 'الحل الشامل والمثالي للخمول والضعف العام؛ يمُدك بطاقة وحيوية مضاعفة ويقضي على الإجهاد الذهني والبدني بفضل غذاء الملكات.',
    descriptionEn: 'The holistic solution for lethargy and general weakness; provides doubled energy and vitality, eliminating mental and physical stress thanks to royal jelly.',
    image: 'https://imgur.com/QCqn0kZ.jpeg',
    benefitsAr: ['طاقة فورية', 'تنشيط ذهني'],
    benefitsEn: ['Instant Energy', 'Mental Focus'],
    featuresAr: ['500 جم عسل برسيم نقي', '20 جم حبوب لقاح طبيعية', '10 جم غذاء ملكات النحل الأصلي'],
    featuresEn: ['500g Pure Clover Honey', '20g Natural Bee Pollen', '10g Original Royal Jelly'],
    prices: [
      { id: 'health_full', sizeAr: 'عرض كامل', sizeEn: 'Full Package', price: 50, originalPrice: 100 }
    ]
  },
  {
    id: 'honeycomb',
    titleAr: 'شهد العسل الطبيعي',
    titleEn: 'Natural Honeycomb',
    descriptionAr: 'قرص العسل الطبيعي كما بناه النحل. علاج مثالي لالتهابات اللثة والحلق، ومصدر خام 100% غني بالأنزيمات الحية.',
    descriptionEn: 'Natural honeycomb as built by bees. Perfect treatment for gum and throat infections, and a 100% raw source rich in live enzymes.',
    image: 'https://imgur.com/GNhW77E.jpeg',
    benefitsAr: ['صحي لللثة', 'خام وغير مصفى'],
    benefitsEn: ['Gum Health', 'Raw & Unfiltered'],
    prices: [
      { id: 'honeycomb_1_2', sizeAr: '½ كيلو', sizeEn: '½ KG', price: 40, originalPrice: 65 },
    ]
  },
  {
    id: 'royal-nuts',
    titleAr: 'عسل بالمكسرات الملكية',
    titleEn: 'Royal Nuts Honey',
    descriptionAr: 'قنبلة من الفيتامينات والمعادن! بديل صحي ومقوي للأعصاب، يساعد في بناء العضلات وتعويض النقص الغذائي بطعم ملكي.',
    descriptionEn: "A vitamins and minerals bomb! A healthy nerve-strengthening alternative that helps build muscle and compensate for nutritional deficiency with a royal taste.",
    image: 'https://imgur.com/FSyDB82.jpeg',
    benefitsAr: ['بديل صحي للحلويات', 'غني بالأوميغا'],
    benefitsEn: ['Healthy Dessert', 'Omega Rich'],
    prices: [
      { id: 'royal_nuts_1_2', sizeAr: '½ كيلو', sizeEn: '½ KG', price: 50, originalPrice: 80 },
    ]
  },
  {
    id: 'brand-manifesto-hook',
    titleAr: 'لماذا يختار النخبة "بيت العسل"؟',
    titleEn: 'Why Choose Honey House?',
    descriptionAr: 'لأننا نمتلك مناحلنا منذ أكثر من 25 عاماً. خبرة عريقة تضمن لك عسلاً خاماً لم تمسه يد العبث، من الخلية إلى مائدتك مباشرة.',
    descriptionEn: "Because we have owned our apiaries for over 25 years. A long-standing heritage that guarantees you raw honey untouched by tampering, straight from the hive to your table.",
    image: 'https://images.unsplash.com/photo-1558611997-d60293774640?q=80&w=2070&auto=format&fit=crop',
    benefitsAr: ['25 عاماً من الخبرة', 'مناحلنا الخاصة', 'عسل خام 100%', 'تغليف فاخر'],
    benefitsEn: ['25 Years Experience', 'Own Apiaries', '100% Raw Honey', 'Premium Packaging'],
    prices: [],
  },
  {
    id: 'full-menu-summary',
    titleAr: 'قائمة الأسعار والعروض',
    titleEn: 'Price List & Offers',
    descriptionAr: 'كل ما تحتاجه في مكان واحد! استمتع بصحة عائلتك مع أفضل أنواع العسل.',
    descriptionEn: 'Everything you need in one place! Enjoy your family health with the best honey types.',
    image: 'https://imgur.com/tpBWWTy.jpeg',
    benefitsAr: ['خصم 10% للطلبات فوق 250 درهم', 'توصيل مجاني'],
    benefitsEn: ['10% OFF over 250 AED', 'Free Delivery'],
    prices: []
  }
];

export const TRANSLATIONS = {
  ar: {
    companyName: 'بيت العسل',
    navSelections: 'مختاراتنا الفاخرة',
    navAi: 'خبير العسل',
    navReviews: 'آراء العملاء',
    navOrder: 'اطلب الآن',
    navFaq: 'الأسئلة الشائعة',
    navContact: 'تواصل معنا',
    slogan: 'من بيتنا لبيتك... عسل طبيعي مضمون من المنحل مباشرة 🐝',
    deliveryNote: '🚚 يوجد توصيل لكل الإمارات',
    grandOpening: '🎉 بمناسبة الافتتاح... عروض خيالية 🎉',
    limitedTime: 'لفترة محدودة! لا تفوت الفرصة!',
    orderNow: '📦 اطلب الآن!',
    fillForm: 'املأ النموذج أدناه لإرسال طلبك مباشرة عبر واتساب.',
    nameLabel: 'اسم العميل:',
    namePlaceholder: 'الاسم كاملاً',
    phoneLabel: 'رقم الهاتف:',
    phonePlaceholder: '+971XXXXXXXX',
    locationLabel: 'موقع التوصيل:',
    locationPlaceholder: 'المدينة، المنطقة، العنوان بالتفصيل',
    productSelectLabel: 'اختر المنتج:',
    quantityLabel: 'الكمية:',
    total: 'الإجمالي:',
    currency: 'درهم',
    sendOrder: 'إرسال الطلب عبر واتساب',
    inquiry: 'استفسار عام عبر واتساب',
    addProduct: '+ أضف منتج آخر',
    remove: 'إزالة',
    chooseSize: 'اختر الحجم:',
    errorFields: 'الرجاء ملء جميع الحقول المطلوبة.',
    whyChooseUs: 'لماذا بيت العسل؟',
    natural: '100% طبيعي ونقي',
    labTested: 'مفحوص ومضمون',
    direct: 'من المنحل لبيتك',
    fastDelivery: 'توصيل سريع للإمارات',
    faqTitle: 'الأسئلة الشائعة',
    aiAssistantTitle: 'خبير العسل الذكي',
    aiAssistantDesc: 'اسألني أي شيء عن فوائد العسل أو اطلب نصيحة للاختيار!',
    aiPlaceholder: 'مثلاً: أحتاج عسل للمناعة...',
    aiThinking: 'جاري التفكير...',
    howItWorks: 'خطوات الطلب',
    step1Title: 'اختر',
    step1Desc: 'تصفح التشكيلة.',
    step2Title: 'اطلب',
    step2Desc: 'عبر واتساب.',
    step3Title: 'استلم',
    step3Desc: 'لباب بيتك.',
    tickerMsg1: '🚚 توصيل مجاني للطلبات فوق 200 درهم!',
    tickerMsg2: '🍯 عروض خاصة على عسل الشمع والمكسرات!',
    tickerMsg3: '✨ عسل نحل طبيعي 100% من المنحل مباشرة ✨',
    aiPrompt1: 'عسل للمناعة؟',
    aiPrompt2: 'أفضل عسل للأطفال؟',
    aiPrompt3: 'فوائد غذاء الملكات؟',
    reviewsTitle: 'آراء العملاء',
    leaveReview: 'أضف تقييمك',
    reviewSubmitted: 'تم إرسال تقييمك بنجاح! شكراً لك.',
    reviewError: 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.',
    reviewNameLabel: 'اسمك:',
    reviewCommentLabel: 'تعليقك:',
    reviewRatingLabel: 'التقييم:',
    reviewSubmit: 'إرسال التقييم',
    reviewCancel: 'إلغاء',
    reviewLoading: 'جاري تحميل التقييمات...',
    reviewEmpty: 'لا توجد تقييمات بعد. كن أول من يقيّم!',
    reviewDate: 'التاريخ',
    reviewAverage: 'متوسط التقييم',
    reviewCount: 'عدد التقييمات',
    reviewSort: 'ترتيب حسب',
    reviewSortNewest: 'الأحدث',
    reviewSortHighest: 'الأعلى تقييماً',
    reviewSortLowest: 'الأقل تقييماً',
    whatsappReviewTemplate: 'مرحباً بيت العسل، أود مشاركة تقييمي: \nالتقييم: ⭐⭐⭐⭐⭐ \nالتعليق: ',
    whatsappOrderHeader: 'طلب جديد من موقع بيت العسل:',
    whatsappName: 'الاسم:',
    whatsappPhone: 'الهاتف:',
    whatsappLocation: 'الموقع:',
    whatsappTotal: 'الإجمالي:',
    contactUs: 'تواصل معنا',
    chatWhatsApp: 'تواصل عبر واتساب',
    followInstagram: 'تابعنا على انستجرام',
    copyright: 'جميع الحقوق محفوظة',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'الإنجليزية',
  },
  en: {
    companyName: 'Honey House',
    navSelections: 'Luxury Selections',
    navAi: 'AI Expert',
    navReviews: 'Reviews',
    navOrder: 'Order Now',
    navFaq: 'FAQ',
    navContact: 'Contact',
    slogan: 'From our home to yours... Guaranteed natural honey directly from the apiary 🐝',
    deliveryNote: '🚚 Delivery available to all Emirates',
    grandOpening: '🎉 Grand Opening Special Offers 🎉',
    limitedTime: 'Limited Time! Don\'t Miss the Opportunity!',
    orderNow: '📦 Order Now!',
    fillForm: 'Fill the form below to send your experience via WhatsApp.',
    nameLabel: 'Customer Name:',
    namePlaceholder: 'Full Name',
    phoneLabel: 'Phone Number:',
    phonePlaceholder: '+971XXXXXXXX',
    locationLabel: 'Delivery Location:',
    locationPlaceholder: 'City, Area, Detailed Address',
    productSelectLabel: 'Select Product:',
    quantityLabel: 'Quantity:',
    total: 'Total:',
    currency: 'AED',
    sendOrder: 'Send Order via WhatsApp',
    inquiry: 'General Inquiry via WhatsApp',
    addProduct: '+ Add Another Product',
    remove: 'Remove',
    chooseSize: 'Choose Size:',
    errorFields: 'Please fill all required fields.',
    whyChooseUs: 'Why Honey House?',
    natural: '100% Natural & Pure',
    labTested: 'Tested & Guaranteed',
    direct: 'Direct from Apiary',
    fastDelivery: 'Fast UAE Delivery',
    faqTitle: 'Frequently Asked Questions',
    aiAssistantTitle: 'AI Honey Sommelier',
    aiAssistantDesc: 'Ask me anything about honey benefits or get a recommendation!',
    aiPlaceholder: 'Ex: I need honey for energy...',
    aiThinking: 'Thinking...',
    howItWorks: 'Order Steps',
    step1Title: 'Select',
    step1Desc: 'Pick your honey.',
    step2Title: 'WhatsApp',
    step2Desc: 'Confirm order.',
    step3Title: 'Receive',
    step3Desc: 'Fast delivery.',
    tickerMsg1: '🚚 Free delivery on orders over 200 AED!',
    tickerMsg2: '🍯 Special offers on Comb & Nut honey!',
    tickerMsg3: '✨ 100% Natural honey direct from the apiary ✨',
    aiPrompt1: 'Immunity honey?',
    aiPrompt2: 'Best for kids?',
    aiPrompt3: 'Royal Jelly benefits?',
    reviewsTitle: 'Customer Reviews',
    leaveReview: 'Add Your Review',
    reviewSubmitted: 'Review submitted successfully! Thank you.',
    reviewError: 'Error submitting review. Please try again.',
    reviewNameLabel: 'Your Name:',
    reviewCommentLabel: 'Your Comment:',
    reviewRatingLabel: 'Rating:',
    reviewSubmit: 'Submit Review',
    reviewCancel: 'Cancel',
    reviewLoading: 'Loading reviews...',
    reviewEmpty: 'No reviews yet. Be the first to review!',
    reviewDate: 'Date',
    reviewAverage: 'Average Rating',
    reviewCount: 'Review Count',
    reviewSort: 'Sort by',
    reviewSortNewest: 'Newest',
    reviewSortHighest: 'Highest Rated',
    reviewSortLowest: 'Lowest Rated',
    whatsappReviewTemplate: 'Hello Honey House, I would like to share my review: \nRating: ⭐⭐⭐⭐⭐ \nComment: ',
    whatsappOrderHeader: 'New Order from Honey House:',
    whatsappName: 'Name:',
    whatsappPhone: 'Phone:',
    whatsappLocation: 'Location:',
    whatsappTotal: 'Total:',
    contactUs: 'Contact Us',
    chatWhatsApp: 'Chat on WhatsApp',
    followInstagram: 'Follow on Instagram',
    copyright: 'All rights reserved',
    language: 'Language',
    arabic: 'Arabic',
    english: 'English',
  }
};

export const FAQS = [
  {
    ar: { 
      q: 'هل العسل طبيعي 100%؟', 
      a: 'نعم، عسلنا نقي ومباشر من المناحل المصرية بدون أي إضافات أو معالجات حرارية. يتم فحصه مخبرياً لضمان الجودة والنقاء.' 
    },
    en: { 
      q: 'Is the honey 100% natural?', 
      a: 'Yes, our honey is pure and direct from Egyptian apiaries without any additives or heat treatments. It is laboratory tested to ensure quality and purity.' 
    }
  },
  {
    ar: { 
      q: 'كم يستغرق التوصيل؟', 
      a: 'التوصيل متاح لكل إمارات الدولة خلال 24-48 ساعة كحد أقصى. الطلبات قبل الساعة 2 ظهراً يتم توصيلها في نفس اليوم.' 
    },
    en: { 
      q: 'How long does delivery take?', 
      a: 'Delivery is available to all Emirates within 24-48 hours maximum. Orders before 2 PM are delivered on the same day.' 
    }
  },
  {
    ar: { 
      q: 'كيف يمكنني تخزين العسل؟', 
      a: 'يُحفظ العسل في درجة حرارة الغرفة بعيداً عن أشعة الشمس المباشرة. لا ينصح بوضعه في الثلاجة لأن البرودة قد تسبب تبلور العسل.' 
    },
    en: { 
      q: 'How should I store honey?', 
      a: 'Store at room temperature away from direct sunlight. Refrigeration is not recommended as cold temperatures may cause honey to crystallize.' 
    }
  },
  {
    ar: { 
      q: 'هل يوجد توصيل مجاني؟', 
      a: 'نعم، يوجد توصيل مجاني للطلبات التي تزيد عن 200 درهم إماراتي لجميع أنحاء الإمارات.' 
    },
    en: { 
      q: 'Is there free delivery?', 
      a: 'Yes, free delivery is available for orders over 200 AED to all Emirates.' 
    }
  },
  {
    ar: { 
      q: 'كيف يمكنني طلب المنتجات؟', 
      a: 'يمكنك الطلب مباشرة عبر الواتساب على الرقم الموجود في الموقع، أو من خلال النموذج الموجود في صفحة "اطلب الآن".' 
    },
    en: { 
      q: 'How can I order products?', 
      a: 'You can order directly via WhatsApp using the number on the website, or through the form on the "Order Now" page.' 
    }
  },
  {
    ar: { 
      q: 'هل يمكنني استرجاع أو استبدال المنتجات؟', 
      a: 'نعم، في حال وجود أي مشكلة في المنتج يمكنك التواصل معنا خلال 48 ساعة من الاستلام لاستبدال أو استرجاع المنتج.' 
    },
    en: { 
      q: 'Can I return or exchange products?', 
      a: 'Yes, if there is any issue with the product, you can contact us within 48 hours of delivery for replacement or return.' 
    }
  }
];

export const MOCK_REVIEWS = [
  { 
    id: 'review_1',
    name: 'نانسي',
    comment: 'حقيقى عسل طبيعى 💯 جربت محلات وسوبر ماركت كتير وأنواع مختلفة ما لاقيت ذى جرب وإعرف الفرق الله يوفقكم ويبارك فيكم 💪👍',
    rating: 5,
    date: '2024-12-15T10:30:00Z',
    lang: 'ar'
  },
  { 
    id: 'review_2',
    name: 'توني',
    comment: 'انا عاوز ااكد انا كمان على جوده العسل حقيقي حاجه عظمة 👌❤️',
    rating: 5,
    date: '2024-12-10T14:20:00Z',
    lang: 'ar'
  },
  { 
    id: 'review_3',
    name: 'كيرلس',
    comment: 'حقيقي العسل اكتر من رائع (عن تجربة) 😍😍',
    rating: 5,
    date: '2024-12-05T09:15:00Z',
    lang: 'ar'
  },
  { 
    id: 'review_4',
    name: 'ايهاب أسعد',
    comment: 'بجد ربنا يبارك العسل حلو اوي ربنا يبارك و يزيدك و تبقي من كبار تجار العسل في الامارات',
    rating: 5,
    date: '2024-11-28T16:45:00Z',
    lang: 'ar'
  },
  { 
    id: 'review_5',
    name: 'إريني',
    comment: 'عاوزة اشكرك جدا على العسل.. بجد تحفة.. و بالذات اللي بغذاء الملكات.. ربنا يباركلك 🙏🙏🙏',
    rating: 5,
    date: '2024-11-20T11:10:00Z',
    lang: 'ar'
  },
  { 
    id: 'review_6',
    name: 'مريم عادل',
    comment: 'العسل تحفففففه و الشمع كنت بقولك مش عايزاه ده طلع تحفه احنا تقريبا خلصناه 😂',
    rating: 5,
    date: '2024-11-15T13:25:00Z',
    lang: 'ar'
  },
  { 
    id: 'review_7',
    name: 'Sarah Ahmed',
    comment: 'Best honey I\'ve ever tasted! Pure, natural, and delivered so fast. Will definitely order again!',
    rating: 5,
    date: '2024-11-10T10:00:00Z',
    lang: 'en'
  },
  { 
    id: 'review_8',
    name: 'Mohammed Ali',
    comment: 'Excellent quality honey. The comb honey is amazing! Thank you for the fast delivery.',
    rating: 5,
    date: '2024-11-05T15:30:00Z',
    lang: 'en'
  }
];

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Review Configuration
export const REVIEW_CONFIG = {
  MAX_REVIEWS_PER_PAGE: 10,
  MIN_REVIEW_LENGTH: 10,
  MAX_REVIEW_LENGTH: 500,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  RATING_OPTIONS: [1, 2, 3, 4, 5],
};

// Social Media Links
export const SOCIAL_LINKS = {
  WHATSAPP: `https://wa.me/${WHATSAPP_NUMBER}`,
  INSTAGRAM: INSTAGRAM_URL,
  FACEBOOK: 'https://www.facebook.com/honeyhouse247',
  TIKTOK: 'https://www.tiktok.com/@honeyhouse247',
  YOUTUBE: 'https://www.youtube.com/@honeyhouse247',
};

// Delivery Information
export const DELIVERY_INFO = {
  FREE_THRESHOLD: 200,
  MIN_DELIVERY_TIME: 24,
  MAX_DELIVERY_TIME: 48,
  DELIVERY_AREAS: [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Umm Al Quwain',
    'Ras Al Khaimah',
    'Fujairah',
    'Al Ain'
  ],
};

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'cod',
    nameAr: 'الدفع عند الاستلام',
    nameEn: 'Cash on Delivery',
    icon: '💰'
  },
  {
    id: 'bank_transfer',
    nameAr: 'تحويل بنكي',
    nameEn: 'Bank Transfer',
    icon: '🏦'
  }
];

// Company Information
export const COMPANY_INFO = {
  NAME_AR: 'بيت العسل',
  NAME_EN: 'Honey House',
  EMAIL: 'info@honeyhouse247.com',
  PHONE: '+971568326116',
  ADDRESS_AR: 'دبي، الإمارات العربية المتحدة',
  ADDRESS_EN: 'Dubai, United Arab Emirates',
  WORKING_HOURS_AR: 'السبت إلى الخميس: 9 صباحاً - 9 مساءً',
  WORKING_HOURS_EN: 'Saturday to Thursday: 9 AM - 9 PM',
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'pure-honey',
    nameAr: 'عسل نقي',
    nameEn: 'Pure Honey',
    icon: '🍯'
  },
  {
    id: 'honey-comb',
    nameAr: 'عسل بالشمع',
    nameEn: 'Honey with Comb',
    icon: '🧊'
  },
  {
    id: 'special-offers',
    nameAr: 'عروض خاصة',
    nameEn: 'Special Offers',
    icon: '🎁'
  },
  {
    id: 'honey-products',
    nameAr: 'منتجات العسل',
    nameEn: 'Honey Products',
    icon: '🛍️'
  }
];

// Features/Benefits of Honey
export const HONEY_BENEFITS = {
  ar: [
    'مضاد طبيعي للبكتيريا',
    'غني بمضادات الأكسدة',
    'يساعد في التئام الجروح',
    'مهدئ للسعال',
    'مصدر للطاقة الطبيعية',
    'يحسن الهضم',
    'يقوي المناعة',
    'مفيد للبشرة والشعر'
  ],
  en: [
    'Natural antibacterial',
    'Rich in antioxidants',
    'Helps wound healing',
    'Soothes cough',
    'Source of natural energy',
    'Improves digestion',
    'Boosts immunity',
    'Good for skin and hair'
  ]
};
