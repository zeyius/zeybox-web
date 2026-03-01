import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Box = {
  id: string;
  name: string;
  description: string | null;
  validity_days: number;
  price_dzd: number;
};

export default function BestSellers() {
  const { t, i18n } = useTranslation();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("boxes")
        .select("id,name,description,validity_days,price_dzd")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      setBoxes((data ?? []) as Box[]);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Mobile-optimized Header */}
      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
        {t('nav_best_sellers')}
      </h1>

      {/* FIXED: Horizontal Scrollable Category Bar for Mobile */}
      <div className="mt-6 flex overflow-x-auto pb-2 gap-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {["All boxes", "Weekend", "Restaurants", "Wellness", "Adventure"].map((cat) => (
          <button
            key={cat}
            className="flex-none px-5 py-2 rounded-full border border-gray-200 text-sm font-medium hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all whitespace-nowrap active:scale-95"
          >
            {i18n.language === 'en' ? cat : (
              cat === "All boxes" ? "كل الصناديق" :
              cat === "Weekend" ? "عطلة نهاية الأسبوع" :
              cat === "Restaurants" ? "مطاعم" :
              cat === "Wellness" ? "عناية واسترخاء" : "مغامرة"
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Hidden on Mobile, Visible on Desktop */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-3xl border border-gray-100 p-6 bg-gray-50/50">
              <div className="font-bold text-gray-900">{t('filter_title')}</div>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="font-semibold text-gray-400 uppercase text-[10px] tracking-widest">{t('filter_budget')}</div>
                {["< 5000 DZD", "5000–10000", "10000–20000", "20000+"].map((b) => (
                  <label key={b} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <span className="group-hover:text-black transition-colors">{b}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Real boxes grid: FIXED for Mobile (2 columns) */}
        <section className="lg:col-span-9">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : boxes.length === 0 ? (
            <p className="text-gray-500 text-center py-10">{i18n.language === 'en' ? 'No boxes yet.' : 'لا توجد صناديق بعد.'}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
              {boxes.map((b) => (
                <div
                  key={b.id}
                  className="group relative rounded-2xl md:rounded-3xl border border-gray-100 p-3 md:p-5 transition-all duration-300 hover:shadow-2xl hover:border-yellow-400 bg-white flex flex-col"
                >
                  {/* Modern Red/Yellow Badge */}
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-red-600 text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-tighter md:tracking-widest shadow-lg shadow-red-200">
                    {i18n.language === 'en' ? 'Hot' : 'ساخن'}
                  </div>

                  {/* Box Image with Hover Animation */}
                  <div className="aspect-square rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-yellow-50 overflow-hidden">
                    <img 
                      src="/images/box.png" 
                      className="w-16 md:w-28 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" 
                      alt={b.name} 
                    />
                  </div>

                  {/* Content scaled for Mobile */}
                  <div className="mt-3 flex-grow">
                    <h3 className="font-bold text-sm md:text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-1">
                      {b.name}
                    </h3>
                    <p className="mt-1 text-[10px] md:text-sm text-gray-400 line-clamp-1 md:line-clamp-2">
                      {b.description}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <span className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1 font-medium">
                      <span className="text-yellow-500">★</span> 
                      {b.validity_days}d
                    </span>
                    <span className="font-black text-xs md:text-base text-black">
                      {b.price_dzd.toLocaleString()} <span className="text-[10px]">DA</span>
                    </span>
                  </div>

                  <Link
                    to={`/box/${b.id}`}
                    className="mt-3 block text-center w-full py-2 md:py-3 rounded-lg md:rounded-xl bg-black text-white text-[10px] md:text-sm font-bold transition-all hover:bg-red-600 active:scale-95 shadow-md"
                  >
                    {t('btn_view_box')}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}