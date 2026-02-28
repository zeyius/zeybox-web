import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav_best_sellers: "Best sellers",
      nav_gift_ideas: "Gift ideas",
      nav_voucher: "I have a voucher",
      hero_badge: "✨ Experience gifting, made for Algeria",
      hero_title: "Gift memories, not just things.",
      hero_desc: "Choose a ZEYBOX, send a digital voucher, and let them book their dream experience.",
      btn_explore: "Explore Boxes",
      section_collections: "Our Collections",
      label_new: "NEW",
      btn_view_box: "View Box",
      search_placeholder: "Search experiences...",
      search_btn: "Search",
      footer_text: "🎁 Unique QR voucher • 365 days validity • Algeria-wide partners",
      filter_title: "Filters",
      filter_budget: "Budget",
      filter_sort: "Sort",
      sort_newest: "Newest",
      sort_price_low: "Price: low to high",
      sort_price_high: "Price: high to low",
      btn_buy: "Buy this box",
      included_experiences: "Included experiences",
      checkout_title: "Checkout",
      label_buyer_name: "Buyer name",
      label_buyer_email: "Buyer email *",
      label_recipient_name: "Recipient name",
      label_recipient_email: "Recipient email",
      label_payment_method: "Payment method *",
      label_ref: "Transaction reference *",
      btn_confirm_order: "Confirm order",
      login_title: "Login",
      signup_title: "Create account",
      login_desc: "Access your vouchers, bookings, and account.",
      signup_desc: "Create your ZEYBOX account in seconds.",
      label_full_name: "Full name",
      label_email: "Email",
      label_password: "Password",
      btn_logout: "Logout",
      account_title: "Account",
      signed_in_as: "Signed in as",
      profile_role: "Role",
        }
  },
  ar: {
    translation: {
      nav_best_sellers: "الأكثر مبيعاً",
      nav_gift_ideas: "أفكار هدايا",
      nav_voucher: "لدي قسيمة",
      hero_badge: "✨ هدايا التجارب، صُنعت للجزائر",
      hero_title: "أهدِ ذكريات، لا مجرد أشياء.",
      hero_desc: "اختر ZEYBOX، وأرسل قسيمة رقمية، واترك لهم متعة حجز تجربة أحلامهم.",
      btn_explore: "تصفح الصناديق",
      section_collections: "مجموعاتنا",
      label_new: "جديد",
      btn_view_box: "عرض الصندوق",
      search_placeholder: "ابحث عن التجارب...",
      search_btn: "بحث",
      footer_text: "🎁 قسيمة QR فريدة • صلاحية 365 يومًا • شركاء في جميع أنحاء الجزائر",
      filter_title: "الفلاتر",
      filter_budget: "الميزانية",
      filter_sort: "ترتيب",
      sort_newest: "الأحدث",
      sort_price_low: "السعر: من الأقل إلى الأعلى",
      sort_price_high: "السعر: من الأعلى إلى الأقل",
      btn_buy: "شراء هذا الصندوق",
      included_experiences: "التجارب المشمولة",
      checkout_title: "إتمام الشراء",
      label_buyer_name: "اسم المشتري",
      label_buyer_email: "البريد الإلكتروني للمشتري *",
      label_recipient_name: "اسم المستلم",
      label_recipient_email: "البريد الإلكتروني للمستلم",
      label_payment_method: "طريقة الدفع *",
      label_ref: "رقم مرجع المعاملة *",
      btn_confirm_order: "تأكيد الطلب",
      login_title: "تسجيل الدخول",
      signup_title: "إنشاء حساب",
      login_desc: "الوصول إلى القسائم والحجوزات وحسابك.",
      signup_desc: "أنشئ حساب ZEYBOX الخاص بك في ثوانٍ.",
      label_full_name: "الاسم الكامل",
      label_email: "البريد الإلكتروني",
      label_password: "كلمة المرور",
      btn_logout: "تسجيل الخروج",
      account_title: "الحساب",
      signed_in_as: "مسجل الدخول كـ",
      profile_role: "الدور",
    }
  }
};

i18n
  .use(LanguageDetector) // Detects user browser language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

// Automatically handle Right-to-Left (RTL) for Arabic
i18n.on('languageChanged', (lng) => {
  document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;