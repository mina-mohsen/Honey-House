import React, { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Language, CartItem } from "./types";
import DisplayComponent from "./DisplayComponent";
import {
  PRODUCTS,
  TRANSLATIONS,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  MOCK_REVIEWS,
  DELIVERY_INFO,
} from "./constants";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  lang: Language;
  createdAt: string;
  updatedAt?: string;
  approved?: boolean; // false => hidden
};

const ADMIN_KEY_STORAGE = "honeyhouse_admin_key_v1";

interface ProductCardProps {
  product: any;
  lang: Language;
  t: any;
  addToCart: (productId: string, priceId: string, productTitle: string, priceSize: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang, t, addToCart }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div
      className="bg-gradient-to-b from-white to-amber-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100 overflow-hidden flex flex-col justify-between"
    >
      <div className="relative group overflow-hidden">
        <img
          src={images[activeImgIndex]}
          alt={lang === "ar" ? product.titleAr : product.titleEn}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://imgur.com/vIdADYw.jpeg";
          }}
        />
        <div className="absolute top-2 left-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          🏷️ {lang === "ar" ? "أفضل بيع" : "Best Seller"}
        </div>

        {/* Gallery switcher dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === activeImgIndex ? "bg-amber-500 scale-125" : "bg-white/60"
                }`}
                title={`Image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-black text-lg mb-2 text-amber-900 line-clamp-1">
            {lang === "ar" ? product.titleAr : product.titleEn}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
            {lang === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>

          <div className="mb-4">
            <h4 className="font-bold text-amber-800 text-sm mb-2">
              {lang === "ar" ? "الفوائد:" : "Benefits:"}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(lang === "ar" ? product.benefitsAr : product.benefitsEn).slice(0, 3).map((benefit: string, idx: number) => (
                <span key={idx} className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-amber-800 text-sm mb-2">{t.chooseSize}:</h4>
          <div className="space-y-2">
            {product.prices.map((price: any) => (
              <div
                key={price.id}
                className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-100/50"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-amber-900">{lang === "ar" ? price.sizeAr : price.sizeEn}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-600">
                      {price.price} {t.currency}
                    </span>
                    {price.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {price.originalPrice} {t.currency}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    addToCart(
                      product.id,
                      price.id,
                      lang === "ar" ? product.titleAr : product.titleEn,
                      lang === "ar" ? price.sizeAr : price.sizeEn
                    )
                  }
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-bold text-sm flex items-center gap-2"
                >
                  <span>🛒</span>
                  <span>{lang === "ar" ? "أضف" : "Add"}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>("ar");
  const [route, setRoute] = useState(window.location.hash || "#/");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleRoute = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", handleRoute);
    return () => {
      window.removeEventListener("hashchange", handleRoute);
    };
  }, []);

  const isDisplayRoute = route.includes("display");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  /* ================= Cart / Order ================= */
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", location: "" });
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLTextAreaElement>(null);

  /* ================= AI ================= */
  const [aiMessage, setAiMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  /* ================= Reviews ================= */
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openReviews, setOpenReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  /* ================= Review Edit ================= */
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  /* ================= Products ================= */
  const [openProducts, setOpenProducts] = useState(true);

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  /* RTL / LTR */
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  /* Load admin key */
  useEffect(() => {
    const savedKey =
      sessionStorage.getItem(ADMIN_KEY_STORAGE) ||
      localStorage.getItem(ADMIN_KEY_STORAGE);
    if (savedKey) setIsAdmin(true);
  }, []);

  const getAdminKey = () =>
    sessionStorage.getItem(ADMIN_KEY_STORAGE) ||
    localStorage.getItem(ADMIN_KEY_STORAGE) ||
    "";

  /* Load reviews from KV */
  const loadReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      const list: Review[] = Array.isArray(data?.reviews) ? data.reviews : [];
      setReviews(list);
    } catch {
      // fallback فقط لو الـ API وقع
      const fallback: Review[] = (MOCK_REVIEWS || []).map((r: any, idx: number) => ({
        id: r.id || `mock_${idx}`,
        name: (r.name || r?.ar?.name || r?.en?.name || "Customer") as string,
        rating: Number(r.rating || 5),
        comment: (r.comment || r?.ar?.comment || r?.en?.comment || "") as string,
        lang: (r.lang || "ar") as Language,
        createdAt: r.createdAt || new Date().toISOString(),
        approved: r.approved ?? true,
      }));
      setReviews(fallback);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  /* Toast auto-hide */
  useEffect(() => {
    if (!showCartNotification) return;
    const timer = setTimeout(() => setShowCartNotification(false), 3000);
    return () => clearTimeout(timer);
  }, [showCartNotification]);

  /* Calculate total price */
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return total;
      const price = product.prices.find((p) => p.id === item.priceId);
      if (!price) return total;
      return total + price.price * item.quantity;
    }, 0);
  }, [cartItems]);

  const approvedReviews = useMemo(
    () => reviews.filter((r) => r.approved !== false),
    [reviews]
  );

  const avgRating = useMemo(() => {
    if (!approvedReviews.length) return "0.0";
    const sum = approvedReviews.reduce((a, r) => a + (r.rating || 0), 0);
    return (sum / approvedReviews.length).toFixed(1);
  }, [approvedReviews]);

  /* ================= Admin ================= */
  const handleAdminLogin = () => {
    if (!adminKeyInput.trim()) {
      setAdminMessage(lang === "ar" ? "اكتب كود الادمن" : "Enter admin key");
      return;
    }
    sessionStorage.setItem(ADMIN_KEY_STORAGE, adminKeyInput.trim());
    localStorage.setItem(ADMIN_KEY_STORAGE, adminKeyInput.trim());
    setIsAdmin(true);
    setShowAdminLogin(false);
    setAdminKeyInput("");
    setAdminMessage(lang === "ar" ? "تم تسجيل الدخول كمدير ✅" : "Logged in as admin ✅");
    setTimeout(() => setAdminMessage(""), 2500);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    setIsAdmin(false);
    setAdminMessage(lang === "ar" ? "تم تسجيل الخروج" : "Logged out");
    setTimeout(() => setAdminMessage(""), 2500);
  };

  const startEditReview = (review: Review) => {
    setEditingReview({ ...review });
    setShowEditForm(true);
    setShowReviewForm(false);
  };

  const saveEditReview = async () => {
    if (!editingReview) return;
    if (!editingReview.name.trim() || !editingReview.comment.trim()) {
      alert(lang === "ar" ? "املأ الاسم والتعليق." : "Please fill name and comment.");
      return;
    }
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify({
          id: editingReview.id,
          patch: {
            name: editingReview.name.trim(),
            comment: editingReview.comment.trim(),
            rating: editingReview.rating,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");
      setShowEditForm(false);
      setEditingReview(null);
      setAdminMessage(lang === "ar" ? "تم تعديل التقييم ✅" : "Review updated ✅");
      setTimeout(() => setAdminMessage(""), 2500);
      loadReviews();
    } catch (e: any) {
      alert((lang === "ar" ? "فشل تعديل التقييم: " : "Failed to update: ") + (e?.message || ""));
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm(lang === "ar" ? "متأكد تحذف التقييم؟" : "Delete this review?")) return;
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setAdminMessage(lang === "ar" ? "تم حذف التقييم ✅" : "Review deleted ✅");
      setTimeout(() => setAdminMessage(""), 2500);
      loadReviews();
    } catch (e: any) {
      alert((lang === "ar" ? "فشل الحذف: " : "Failed to delete: ") + (e?.message || ""));
    }
  };

  const toggleApprove = async (id: string, approved: boolean) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify({ id, patch: { approved } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");
      loadReviews();
    } catch (e: any) {
      alert((lang === "ar" ? "فشل التعديل: " : "Failed: ") + (e?.message || ""));
    }
  };

  /* ================= Cart ================= */
  const addToCart = (productId: string, priceId: string, productName: string, sizeName: string) => {
    const existingItem = cartItems.find((i) => i.productId === productId && i.priceId === priceId);

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((it) => (it.id === existingItem.id ? { ...it, quantity: it.quantity + 1 } : it))
      );
      setNotificationMessage(
        `${lang === "ar" ? "تم زيادة الكمية لـ" : "Increased quantity for"} ${productName} (${sizeName})`
      );
    } else {
      const newItem: CartItem = { id: `${productId}_${priceId}_${Date.now()}`, productId, priceId, quantity: 1 };
      setCartItems((prev) => [...prev, newItem]);
      setNotificationMessage(
        `${lang === "ar" ? "تم إضافة" : "Added"} ${productName} (${sizeName}) ${lang === "ar" ? "إلى السلة" : "to cart"}`
      );
    }

    setShowCartNotification(true);
    setShowOrderForm(true);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
      return;
    }
    setCartItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i)));
  };

  const removeFromCart = (itemId: string) => setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  const clearCart = () => setCartItems([]);

  /* ================= WhatsApp Order ================= */
  const sendOrderViaWhatsApp = () => {
    if (!orderForm.name.trim()) {
      alert(lang === "ar" ? "الرجاء إدخال اسم العميل" : "Please enter customer name");
      nameInputRef.current?.focus();
      return;
    }
    if (!orderForm.phone.trim()) {
      alert(lang === "ar" ? "الرجاء إدخال رقم الهاتف" : "Please enter phone number");
      phoneInputRef.current?.focus();
      return;
    }
    if (!orderForm.location.trim()) {
      alert(lang === "ar" ? "الرجاء إدخال عنوان التوصيل" : "Please enter delivery address");
      locationInputRef.current?.focus();
      return;
    }
    if (cartItems.length === 0) {
      alert(lang === "ar" ? "السلة فارغة. أضف منتجات أولاً." : "Cart is empty. Add products first.");
      return;
    }

    let message = `*${lang === "ar" ? "طلب جديد من موقع بيت العسل" : "New Order from Honey House"}*\n\n`;
    message += `*${t.whatsappName}* ${orderForm.name}\n`;
    message += `*${t.whatsappPhone}* ${orderForm.phone}\n`;
    message += `*${t.whatsappLocation}* ${orderForm.location}\n\n`;
    message += `*${lang === "ar" ? "المنتجات المطلوبة" : "Order Items"}:*\n`;

    cartItems.forEach((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return;
      const price = product.prices.find((p) => p.id === item.priceId);
      if (!price) return;
      message += `- ${lang === "ar" ? product.titleAr : product.titleEn} (${lang === "ar" ? price.sizeAr : price.sizeEn}) x${item.quantity}: ${
        price.price * item.quantity
      } ${t.currency}\n`;
    });

    message += `\n*${t.whatsappTotal}* ${totalPrice} ${t.currency}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    setShowOrderForm(false);
    setOrderForm({ name: "", phone: "", location: "" });

    alert(lang === "ar" ? "تم إرسال الطلب بنجاح ✅" : "Order sent successfully ✅");
  };

  /* ================= AI ================= */
  const handleAiConsult = async () => {
    if (!aiMessage.trim()) {
      alert(lang === "ar" ? "الرجاء كتابة سؤال" : "Please enter a question");
      return;
    }

    setIsAiThinking(true);
    setAiResponse("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are a professional honey expert. Write a highly professional, beautifully structured, and detailed response.
Use Markdown formatting:
- Use clear headings (e.g., ### title) for different sections.
- Use bullet points (* or -) for key points, scientific analyses, or advice.
- Use bold text (**keyword**) to highlight important information.
- Use paragraph breaks (double newlines) so that the lines are very comfortable to read.
- Keep the style elegant, clean, and highly professional like an expert article.
User language: ${lang === 'ar' ? 'Arabic (العربية)' : 'English'}.
Question: ${aiMessage}`,
        }),
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("STATIC_HOSTING_ERROR");
        }
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "SERVER_ERROR");
      }

      const data = await res.json();
      setAiResponse(data.reply || "");
    } catch (err: any) {
      if (err?.message === "STATIC_HOSTING_ERROR") {
        setAiResponse(lang === "ar" 
          ? "تنبيه: ميزة خبير العسل الذكي تحتاج إلى خادم (Backend) للعمل. الاستضافات الساكنة مثل GitHub Pages لا تدعم تشغيل ميزات الذكاء الاصطناعي التفاعلية مباشرة. يرجى تفعيل الاستضافة الكاملة (Full-Stack) على منصة تدعم Node.js مثل Vercel أو Render أو السيرفر الخاص ببيت العسل للتمتع بكامل الميزات."
          : "Notice: The AI Expert feature requires a backend server to run. Static hosting services like GitHub Pages do not support running interactive AI backends. Please deploy to a full-stack platform like Vercel or Render to enable this feature.");
      } else {
        setAiResponse(lang === "ar" ? "خطأ في الاتصال بالذكاء الاصطناعي." : "Error connecting to AI.");
      }
    } finally {
      setIsAiThinking(false);
    }
  };

  /* ================= Submit Review -> KV ================= */
  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert(lang === "ar" ? "الرجاء ملء جميع الحقول المطلوبة." : "Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newReview.name.trim(),
          rating: newReview.rating,
          comment: newReview.comment.trim(),
          lang,
        }),
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(lang === "ar" 
            ? "الخادم (Backend) غير متوفر على الاستضافة الحالية مثل GitHub Pages. لا يمكن حفظ التقييمات على السيرفر بدون استضافة كاملة (Full-Stack)."
            : "The backend server is not available on this static hosting platform (e.g., GitHub Pages). Submitting reviews requires a full-stack deployment.");
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit");
      }

      const data = await res.json();
      setShowReviewForm(false);
      setNewReview({ name: "", rating: 5, comment: "" });

      await loadReviews();
      alert(lang === "ar" ? "تم إرسال تقييمك بنجاح! 🙏" : "Review submitted successfully! 🙏");
    } catch (error: any) {
      alert((lang === "ar" ? "حدث خطأ: " : "Error: ") + (error?.message || ""));
    }
  };

  if (isDisplayRoute) {
    return <DisplayComponent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-slate-900 font-cairo">
      {/* ================= ADMIN MESSAGE ================= */}
      {adminMessage && (
        <div className="fixed top-20 right-4 left-4 md:left-auto md:right-4 z-50 animate-slide-in">
          <div className="bg-blue-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-md mx-auto">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="font-bold">{adminMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= CART NOTIFICATION TOAST ================= */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 left-4 md:left-auto md:right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-md mx-auto">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold">{notificationMessage}</p>
              <p className="text-sm opacity-90">{lang === "ar" ? "تمت الإضافة إلى سلة الطلبات" : "Added to cart"}</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADMIN LOGIN MODAL ================= */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-black text-amber-900 mb-4">
              {lang === "ar" ? "تسجيل الدخول كمدير" : "Admin Login"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Key:</label>
                <input
                  type="password"
                  value={adminKeyInput}
                  onChange={(e) => setAdminKeyInput(e.target.value)}
                  placeholder={lang === "ar" ? "اكتب الكود" : "Enter key"}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600"
                >
                  {lang === "ar" ? "دخول" : "Login"}
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminKeyInput("");
                  }}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                >
                  {lang === "ar" ? "إلغاء" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT REVIEW MODAL ================= */}
      {showEditForm && editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-amber-900 mb-4">
              {lang === "ar" ? "تعديل التقييم" : "Edit Review"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "ar" ? "الاسم:" : "Name:"}
                </label>
                <input
                  type="text"
                  value={editingReview.name}
                  onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "ar" ? "التقييم:" : "Rating:"}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingReview({ ...editingReview, rating: star })}
                      className={`text-3xl ${star <= editingReview.rating ? "text-amber-500" : "text-gray-300"}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === "ar" ? "التعليق:" : "Comment:"}
                </label>
                <textarea
                  value={editingReview.comment}
                  onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveEditReview}
                  className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                >
                  {lang === "ar" ? "حفظ" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingReview(null);
                  }}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                >
                  {lang === "ar" ? "إلغاء" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PROMO BANNER ================= */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white text-center py-3 font-black text-sm md:text-base relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 animate-pulse bg-[radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3">
          <span className="inline-flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <span className="drop-shadow-sm">
              {lang === "ar" ? "توصيل خلال" : "Delivery within"}{" "}
              <b className="underline decoration-white/70">24h – 48h</b>
            </span>
          </span>
          <span className="opacity-90 hidden sm:inline">|</span>
          <span className="inline-flex items-center gap-2">
            <span className="text-lg">🎁</span>
            <span className="drop-shadow-sm">
              {lang === "ar" ? "توصيل مجاني فوق" : "Free delivery over"}{" "}
              <b className="underline decoration-white/70">
                {DELIVERY_INFO.FREE_THRESHOLD} {t.currency}
              </b>
            </span>
          </span>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-md z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* LOGO SECTION */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shadow-lg">
                  <img
                    src="https://imgur.com/tpBWWTy.jpeg"
                    alt="بيت العسل Honey House"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl md:text-2xl font-black text-amber-900 leading-tight">بيت العسل</h1>
                  <p className="text-xs text-amber-700 font-bold">Honey House</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={() => setShowOrderForm(!showOrderForm)}
                className="relative p-2 bg-amber-100 rounded-full hover:bg-amber-200 transition-colors"
              >
                <span className="text-xl">🛒</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Language Button */}
              <button
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="px-3 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors text-sm"
              >
                {lang === "ar" ? "EN" : "العربية"}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION */}
          <nav className="flex overflow-x-auto gap-2 mt-3 pb-2 no-scrollbar">
            <button
              onClick={() => {
                setOpenProducts(!openProducts);
              }}
              className={`px-5 py-2.5 rounded-full font-black whitespace-nowrap flex items-center gap-2 text-sm ${
                openProducts ? "bg-amber-500 text-white shadow" : "bg-amber-100 text-amber-900"
              }`}
            >
              <span className="text-lg">🍯</span>
              <span>{lang === "ar" ? "المنتجات" : "Products"}</span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-green-500 text-white rounded-full font-black whitespace-nowrap flex items-center gap-2 hover:bg-green-600 text-sm"
            >
              <span className="text-lg">📱</span>
              <span>{lang === "ar" ? "واتساب" : "WhatsApp"}</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* ================= ORDER FORM SECTION ================= */}
        {(showOrderForm || cartItems.length > 0) && (
          <section className="animate-slide-in">
            <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-black flex items-center gap-2">
                    🛒 {lang === "ar" ? "سلة الطلبات" : "Shopping Cart"}
                  </h2>
                  <div className="flex items-center gap-2">
                    {cartItems.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 text-sm"
                      >
                        {lang === "ar" ? "إفراغ السلة" : "Clear All"}
                      </button>
                    )}
                    <button
                      onClick={() => setShowOrderForm(false)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🛒</div>
                    <p className="text-gray-500 text-lg font-bold">
                      {lang === "ar" ? "سلة التسوق فارغة" : "Your cart is empty"}
                    </p>
                    <p className="text-gray-400 mt-2">
                      {lang === "ar" ? "أضف منتجات من قسم المنتجات" : "Add products from the products section"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const product = PRODUCTS.find((p) => p.id === item.productId);
                      const price = product?.prices.find((p) => p.id === item.priceId);
                      if (!product || !price) return null;

                      return (
                        <div key={item.id} className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-bold text-amber-900 text-sm md:text-base">
                                {lang === "ar" ? product.titleAr : product.titleEn}
                              </h3>
                              <p className="text-xs text-gray-600">
                                {lang === "ar" ? price.sizeAr : price.sizeEn} • {price.price} {t.currency}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                >
                                  −
                                </button>
                                <span className="font-bold w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-right min-w-20">
                                <p className="font-bold text-green-600">
                                  {price.price * item.quantity} {t.currency}
                                </p>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                                aria-label="remove"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <div className="border-t border-amber-100 p-4 bg-amber-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-amber-900">{lang === "ar" ? "الإجمالي" : "Subtotal"}:</span>
                    <span className="font-bold text-xl text-green-600">{totalPrice} {t.currency}</span>
                  </div>

                  {totalPrice >= DELIVERY_INFO.FREE_THRESHOLD ? (
                    <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-lg mb-4">
                      <span className="text-xl">🎉</span>
                      <span className="font-bold">{lang === "ar" ? "تهانينا! التوصيل مجاني" : "Congratulations! Free delivery"}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-amber-100 text-amber-800 rounded-lg mb-4">
                      <span className="text-xl">📦</span>
                      <span className="text-sm">
                        {lang === "ar" ? "أضف" : "Add"}{" "}
                        <span className="font-bold">{DELIVERY_INFO.FREE_THRESHOLD - totalPrice} {t.currency}</span>{" "}
                        {lang === "ar" ? "أخرى للحصول على توصيل مجاني" : "more for free delivery"}
                      </span>
                    </div>
                  )}

                  {/* Order Form */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-amber-900 flex items-center gap-2">
                      <span>📝</span>
                      {lang === "ar" ? "معلومات الطلب" : "Order Information"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.nameLabel} *</label>
                        <input
                          ref={nameInputRef}
                          type="text"
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                          placeholder={t.namePlaceholder}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.phoneLabel} *</label>
                        <input
                          ref={phoneInputRef}
                          type="tel"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                          placeholder={t.phonePlaceholder}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.locationLabel} *</label>
                      <textarea
                        ref={locationInputRef}
                        value={orderForm.location}
                        onChange={(e) => setOrderForm({ ...orderForm, location: e.target.value })}
                        placeholder={t.locationPlaceholder}
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={sendOrderViaWhatsApp}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <span className="text-xl">📱</span>
                        <span>{t.sendOrder}</span>
                      </button>

                      <button
                        onClick={() => setShowOrderForm(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                      >
                        {lang === "ar" ? "إغلاق" : "Close"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= AI SECTION ================= */}
        <section className="bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              {lang === "ar" ? "خبير العسل الذكي" : "AI Honey Expert"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder={lang === "ar" ? "اسأل عن العسل، الفوائد، التخزين..." : "Ask about honey, benefits, storage..."}
                className="flex-1 p-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm md:text-base"
                onKeyDown={(e) => e.key === "Enter" && handleAiConsult()}
              />
              <button
                onClick={handleAiConsult}
                disabled={isAiThinking}
                className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAiThinking ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{lang === "ar" ? "جاري التفكير..." : "Thinking..."}</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">🤔</span>
                    <span>{lang === "ar" ? "اسأل الآن" : "Ask Now"}</span>
                  </>
                )}
              </button>
            </div>
            {aiResponse && (
              <div className="mt-6 bg-amber-950/40 border border-amber-500/20 p-6 md:p-8 rounded-2xl shadow-inner">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5 select-none">💡</span>
                  <div className="markdown-body w-full">
                    <Markdown>{aiResponse}</Markdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
          <button onClick={() => setOpenProducts(!openProducts)} className="w-full text-start p-5 md:p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-black text-amber-900 flex items-center gap-2">
                <span className="text-2xl">🍯</span>
                {lang === "ar" ? "منتجاتنا المميزة" : "Our Premium Products"}
              </h2>
              <span className={`text-amber-500 text-xl transition-transform duration-300 ${openProducts ? "rotate-180" : ""}`}>▾</span>
            </div>
          </button>

          {openProducts && (
            <div className="px-5 md:px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {PRODUCTS.filter(p => !['teaser-hook', 'brand-manifesto-hook', 'full-menu-summary'].includes(p.id)).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    t={t}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </section>



        {/* ================= CONTACT SECTION ================= */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-black mb-6 text-center">{t.contactUs}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-green-500 rounded-xl text-center font-bold hover:bg-green-600 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <div className="text-lg">{t.chatWhatsApp}</div>
                  <div className="text-sm opacity-90">{WHATSAPP_NUMBER}</div>
                </div>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-center font-bold hover:opacity-90 transition-opacity flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl">📸</span>
                <div>
                  <div className="text-lg">{t.followInstagram}</div>
                  <div className="text-sm opacity-90">@honeyhouse247</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-amber-900 text-white py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-lg">
                <img src="https://imgur.com/tpBWWTy.jpeg" alt="بيت العسل Honey House" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            <h3 className="text-xl font-black mb-2">بيت العسل | Honey House</h3>
            <p className="opacity-80 mb-6 text-sm md:text-base">
              {lang === "ar"
                ? "عسل طبيعي 100% من المنحل مباشرة إلى منزلك في الإمارات"
                : "100% Natural honey delivered directly from the apiary to your home in UAE"}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                onClick={() => setLang("ar")}
                className={`px-4 py-2 rounded-lg ${lang === "ar" ? "bg-amber-500" : "bg-amber-800"} hover:bg-amber-600 transition-colors text-sm`}
              >
                {t.arabic}
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-2 rounded-lg ${lang === "en" ? "bg-amber-500" : "bg-amber-800"} hover:bg-amber-600 transition-colors text-sm`}
              >
                {t.english}
              </button>

              <button
                onClick={() => (isAdmin ? handleAdminLogout() : setShowAdminLogin(true))}
                className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors text-sm font-bold"
              >
                {isAdmin ? (lang === "ar" ? "خروج ادمن" : "Admin Logout") : (lang === "ar" ? "دخول ادمن" : "Admin Login")}
              </button>

              {isAdmin && (
                <button
                  onClick={() => { window.location.hash = "#/display"; }}
                  className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors text-sm font-black flex items-center gap-2 shadow-lg scale-110"
                >
                  🖥️ {lang === "ar" ? "شاشة عرض المتجر" : "Store Display Mode"}
                </button>
              )}
            </div>

            <p className="text-sm opacity-60">© {new Date().getFullYear()} بيت العسل. {t.copyright}.</p>
          </div>
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 md:left-auto md:right-4 bg-green-500 text-white p-3 rounded-full shadow-2xl hover:bg-green-600 transition-all z-50 animate-bounce"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <span className="hidden sm:inline font-bold">{lang === "ar" ? "اطلب الآن" : "Order Now"}</span>
        </div>
      </a>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap");

        .font-cairo { font-family: "Cairo", sans-serif; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }

        @keyframes slide-in {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default App;
