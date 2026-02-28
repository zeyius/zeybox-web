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
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{t('nav_best_sellers')}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All boxes", "Weekend", "Restaurants", "Wellness", "Adventure"].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
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
        {/* Filters UI */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="font-semibold">{t('filter_title')}</div>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="font-medium">{t('filter_budget')}</div>
                {["< 5000 DZD", "5000–10000", "10000–20000", "20000+"].map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-black" />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="font-medium text-sm">{t('filter_sort')}</div>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-red-600/20">
                <option>{t('sort_newest')}</option>
                <option>{t('sort_price_low')}</option>
                <option>{t('sort_price_high')}</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Real boxes grid */}
        <section className="lg:col-span-9">
          {loading ? (
            <p className="text-gray-600 italic">{i18n.language === 'en' ? 'Loading...' : 'جار التحميل...'}</p>
          ) : boxes.length === 0 ? (
            <p className="text-gray-600">{i18n.language === 'en' ? 'No boxes yet.' : 'لا توجد صناديق بعد.'}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {boxes.map((b) => (
                <div
                  key={b.id}
                  className="group relative rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-400 bg-white"
                >
                  {/* Badge position flips with 'end-4' */}
                  <div className="absolute top-4 end-4 z-10 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                    {i18n.language === 'en' ? 'Popular' : 'شائع'}
                  </div>

                  <div className="h-40 rounded-2xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-red-50">
                    <div className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <img src="/images/box.png" className="w-24 drop-shadow-md" alt={b.name} />
                    </div>
                  </div>

                  <h3 className="mt-4 font-bold text-lg group-hover:text-red-600 transition-colors">
                    {b.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {b.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1 font-medium">
                      <span className="text-yellow-500 text-base">★</span> 
                      {i18n.language === 'en' ? `Valid ${b.validity_days} days` : `صالح لمدة ${b.validity_days} يوم`}
                    </span>
                    <span className="font-black text-black">
                      {b.price_dzd.toLocaleString()} DZD
                    </span>
                  </div>

                  <Link
                    to={`/box/${b.id}`}
                    className="mt-5 block text-center w-full px-4 py-3 rounded-xl bg-black text-white text-sm font-bold transition-all hover:bg-red-600 active:scale-95 shadow-lg shadow-black/5"
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