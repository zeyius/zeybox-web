import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

type Box = {
  id: string;
  name: string;
  description: string | null;
  validity_days: number;
  price_dzd: number;
};

export default function BestSellers() {
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
      <h1 className="text-3xl font-bold">Best sellers</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All boxes", "Weekend", "Restaurants", "Wellness", "Adventure"].map((t) => (
          <button
            key={t}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters UI (later will be real) */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="font-semibold">Filters</div>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="font-medium">Budget</div>
                {["< 5000 DZD", "5000–10000", "10000–20000", "20000+"].map((b) => (
                  <label key={b} className="flex items-center gap-2">
                    <input type="checkbox" />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="font-medium text-sm">Sort</div>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-sm">
                <option>Newest</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Real boxes grid */}
        <section className="lg:col-span-9">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : boxes.length === 0 ? (
            <p className="text-gray-600">No boxes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {boxes.map((b) => (
                <div
                  key={b.id}
                  className="rounded-3xl border border-gray-200 p-6 hover:shadow-md transition"
                >
                  <div className="h-40 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <div className="text-5xl">🎁</div>
                  </div>

                  <h3 className="mt-4 font-semibold">{b.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {b.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Valid {b.validity_days} days
                    </span>
                    <span className="font-bold">{b.price_dzd} DZD</span>
                  </div>

                  <Link
                    to={`/box/${b.id}`}
                    className="mt-5 block text-center w-full px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800"
                  >
                    View box
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