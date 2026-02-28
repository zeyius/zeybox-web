import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

type Box = {
  id: string;
  name: string;
  price_dzd: number;
  description: string | null;
  validity_days: number;
};

const ORBIT_ITEMS = [
  { image: null, emoji: "🏨", labelKey: "Weekend", color: "bg-blue-50" },
  { image: null, emoji: "🍽️", labelKey: "Dining", color: "bg-red-50" },
  { image: null, emoji: "💆", labelKey: "Wellness", color: "bg-teal-50" },
  { image: null, emoji: "🏔️", labelKey: "Adventure", color: "bg-orange-50" },
];

const CATEGORIES = ["Weekend", "Restaurants", "Wellness", "Adventure"];

// Carousel Content
const HERO_SLIDES = [
  {
    image: "/images/hero1.png", 
    titleEn: "The Promise of a Perfect Gift",
    titleAr: "وعد بهدية مثالية",
  },
  {
    image: "/images/hero2.png",
    titleEn: "Unforgettable Memories",
    titleAr: "ذكريات لا تُنسى",
  },
  {
    image: "/images/hero3.png",
    titleEn: "Experiences Made for You",
    titleAr: "تجارب صُنعت لك",
  },
  {
    image: "/images/hero4.png",
    titleEn: "Discover Algeria Together",
    titleAr: "اكتشفوا الجزائر معاً",
  }
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const explorerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBoxes = async () => {
      const { data } = await supabase
        .from("boxes")
        .select("id, name, price_dzd, description, validity_days")
        .eq("is_active", true);
      setBoxes((data as Box[]) || []);
    };
    loadBoxes();
  }, []);

  const scrollToExplorer = () => {
    explorerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-white">
      {/* TOP IMAGE CAROUSEL SECTION */}
      <section className="w-full h-[450px] md:h-[550px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full"
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Overlay for text contrast */}
                <div className="absolute inset-0 bg-black/20 z-10" />
                
                <img 
                  src={slide.image} 
                  alt="Zeybox Promo" 
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                  <h2 className="text-white text-4xl md:text-6xl font-black uppercase italic tracking-tighter drop-shadow-2xl">
                    {i18n.language === 'en' ? slide.titleEn : slide.titleAr}
                  </h2>
                  <div className="mt-6 h-1.5 w-24 bg-yellow-400 rounded-full shadow-lg" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* EXISTING HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full mb-6 italic">
              {t('hero_badge')}
            </p>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-black">
              {i18n.language === 'en' ? (
                <>Gift memories, <br /><span className="text-red-600 italic">not just things.</span></>
              ) : (
                <>أهدِ ذكريات، <br /><span className="text-red-600 italic">ليس مجرد أشياء.</span></>
              )}
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
              {t('hero_desc')}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={scrollToExplorer}
                className="px-10 py-5 bg-black text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                {t('btn_explore')} <span className={`text-xl ${i18n.language === 'ar' ? 'rotate-180' : ''}`}>↓</span>
              </button>
            </div>
          </div>

          {/* 3D PERSPECTIVE STAGE */}
          <div className="relative flex justify-center items-center h-[500px] [perspective:1200px]">
            <div className="absolute w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[120px] animate-pulse" />
            
            <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] animate-carousel-3d">
              {ORBIT_ITEMS.map((item, index) => {
                const startRotation = (index * 360) / ORBIT_ITEMS.length;
                return (
                  <div
                    key={item.labelKey}
                    className="absolute [transform-style:preserve-3d]"
                    style={{ 
                      transform: `rotateY(${startRotation}deg) translateZ(280px)` 
                    }}
                  >
                    <div className={`
                      w-24 h-24 ${item.color} rounded-2xl shadow-xl 
                      flex flex-col items-center justify-center 
                      border border-white/80 backdrop-blur-sm
                      animate-counter-spin overflow-hidden
                    `}>
                      {item.image ? (
                        <img src={item.image} alt={item.labelKey} className="w-full h-full object-contain p-2" />
                      ) : (
                        <>
                          <span className="text-3xl filter drop-shadow-sm">{item.emoji}</span>
                          <span className="text-[9px] font-black uppercase mt-1 text-gray-500 tracking-tighter text-center px-1">
                            {i18n.language === 'en' ? item.labelKey : (
                              item.labelKey === "Weekend" ? "عطلة" :
                              item.labelKey === "Dining" ? "مطاعم" :
                              item.labelKey === "Wellness" ? "استرخاء" : "مغامرة"
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS & CATEGORY SLIDERS */}
      <section ref={explorerRef} className="bg-gray-50 py-24 rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter italic">
                {t('section_collections')}
              </h2>
              <div className="h-2 w-24 bg-yellow-400 mt-2 rounded-full" />
            </div>
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-red-600 text-white font-black px-4 py-1 rounded-lg italic tracking-tighter">
                  {t('label_new')}
                </span>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  {i18n.language === 'en' ? cat : (
                    cat === "Weekend" ? "عطلة نهاية الأسبوع" :
                    cat === "Restaurants" ? "مطاعم" :
                    cat === "Wellness" ? "عناية واسترخاء" : "مغامرة"
                  )}
                </h3>
              </div>
              
              <div className="flex gap-8 overflow-x-auto pb-10 snap-x no-scrollbar">
                {boxes.length === 0 ? (
                  <div className="h-64 w-full bg-gray-200 animate-pulse rounded-[3rem]" />
                ) : (
                  boxes.map((b) => (
                    <Link to={`/box/${b.id}`} key={b.id} className="min-w-[320px] md:min-w-[380px] snap-start group">
                      <div className="bg-white rounded-[3rem] border border-gray-100 p-8 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 relative overflow-hidden">
                        <div className={`absolute top-6 ${i18n.language === 'ar' ? 'left-8' : 'right-8'} font-black text-red-600 text-sm italic`}>
                          DZD
                        </div>
                        <div className="h-56 rounded-[2.5rem] bg-gray-50 flex items-center justify-center mb-8">
                          <img src="/images/box.png" className="w-36 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 drop-shadow-xl" alt={b.name} />
                        </div>
                        <h4 className="font-bold text-xl text-black">{b.name}</h4>
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2">{b.description}</p>
                        <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                          <span className="text-2xl font-black text-black">{b.price_dzd.toLocaleString()}</span>
                          <span className="bg-yellow-400 text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                            {t('btn_view_box')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}