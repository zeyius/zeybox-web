import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function GiftIdeas() {
  const { t, i18n } = useTranslation();

  const occasions = [
    { en: "For her", ar: "لها" },
    { en: "For him", ar: "له" },
    { en: "Couple", ar: "للمتزوجين" },
    { en: "Birthday", ar: "عيد ميلاد" },
    { en: "Parents", ar: "للوالدين" },
    { en: "Kids & teens", ar: "للأطفال والمراهقين" }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Title with the theme's underline */}
      <div className="flex items-end gap-4 mb-8">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          {t('nav_gift_ideas')}
        </h1>
        <div className="h-2 w-16 bg-yellow-400 mb-2 rounded-full" />
      </div>

      {/* Occasion chips with theme styling */}
      <div className="flex flex-wrap gap-3">
        {occasions.map((c) => (
          <button 
            key={c.en} 
            className="px-6 py-2.5 rounded-full border border-gray-100 bg-white text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm active:scale-95"
          >
            {i18n.language === 'en' ? c.en : c.ar}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
              <div className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">
                {t('filter_title')}
              </div>
              
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-900 block">
                  {t('filter_budget')}
                </label>
                <div className="flex gap-3">
                  <input 
                    className="w-1/2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-600/20" 
                    placeholder={i18n.language === 'en' ? "Min" : "الأدنى"} 
                  />
                  <input 
                    className="w-1/2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-600/20" 
                    placeholder={i18n.language === 'en' ? "Max" : "الأقصى"} 
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Gift Ideas Grid */}
        <section className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="group relative rounded-[2.5rem] border border-gray-100 bg-white p-6 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2"
              >
                {/* Visual Placeholder */}
                <div className="h-48 rounded-[2rem] bg-gray-50 flex items-center justify-center overflow-hidden transition-colors group-hover:bg-red-50">
                   <div className="text-5xl transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
                    {i % 2 === 0 ? "🕯️" : "🥐"}
                   </div>
                </div>

                <div className="mt-6 px-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600 italic">
                      {t('label_new')}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-black group-hover:text-red-600 transition-colors">
                    {i18n.language === 'en' ? `Gift Selection #${i}` : `اقتراح هدية #${i}`}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2 font-medium">
                    {i18n.language === 'en' 
                      ? "A handpicked experience designed to make memories last forever." 
                      : "تجربة مختارة بعناية صُممت لتجعل الذكريات تدوم للأبد."}
                  </p>
                  
                  <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                    <span className="text-xl font-black text-black">10,000 DZD</span>
                    <Link 
                      to="/best-sellers" 
                      className="bg-black text-white text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg active:scale-95"
                    >
                      {i18n.language === 'en' ? "View" : "عرض"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}