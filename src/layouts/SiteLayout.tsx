import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";

export default function SiteLayout() {
  const { t, i18n } = useTranslation();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="w-full bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center font-medium">
          {t('footer_text')}
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-red-600 shadow-sm" />
            <span className="text-xl font-black tracking-tighter">ZEYBOX</span>
          </Link>

          <div className="hidden md:flex flex-1">
            <div className="w-full max-w-xl relative">
              <input
                className="w-full rounded-xl border border-gray-200 ps-4 pe-12 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder={t('search_placeholder')}
              />
              <button className="absolute inset-y-2 end-2 px-3 rounded-lg bg-black text-white text-xs font-bold hover:bg-red-600 transition-colors">
                {t('search_btn')}
              </button>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-widest">
            <Link className="text-gray-500 hover:text-red-600 transition-colors" to="/best-sellers">
              {t('nav_best_sellers')}
            </Link>
            <Link className="text-gray-500 hover:text-red-600 transition-colors" to="/gift-ideas">
              {t('nav_gift_ideas')}
            </Link>
          </nav>

          <div className="flex items-center gap-3 ms-auto">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all text-sm font-bold"
            >
              <span className="text-base">🌐</span>
              <span className="hidden sm:inline">
                {i18n.language === "en" ? "العربية" : "English"}
              </span>
            </button>

            <Link
              to="/voucher"
              className="hidden md:inline-flex px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-all"
            >
              {t('nav_voucher')}
            </Link>

            {session ? (
              <Link
                to="/account"
                className="px-5 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-red-600 transition-all"
              >
                {i18n.language === 'en' ? 'Account' : 'حسابي'}
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-black text-white text-sm font-bold hover:bg-red-600 transition-all"
              >
                {i18n.language === 'en' ? 'Login' : 'دخول'}
              </Link>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}