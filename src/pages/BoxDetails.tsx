import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Box = {
  id: string;
  name: string;
  description: string | null;
  validity_days: number;
  price_dzd: number;
};

type Experience = {
  id: string;
  title: string;
  description: string | null;
  city: string | null;
  duration_minutes: number | null;
  price_dzd: number;
  partner: { name: string } | null;
};

export default function BoxDetails() {
  const { id } = useParams();
  const [box, setBox] = useState<Box | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);

      const { data: boxData, error: boxErr } = await supabase
        .from("boxes")
        .select("id,name,description,validity_days,price_dzd")
        .eq("id", id)
        .single();

      if (boxErr) console.error(boxErr);
      setBox((boxData as Box) ?? null);

      const { data: expData, error: expErr } = await supabase
        .from("box_experiences")
        .select(
          `
          experiences:experience_id (
            id, title, description, city, duration_minutes, price_dzd,
            partner:partners ( name )
          )
        `
        )
        .eq("box_id", id);

      if (expErr) console.error(expErr);

      const mapped =
        (expData ?? [])
          .map((row: any) => row.experiences)
          .filter(Boolean) as Experience[];

      setExperiences(mapped);
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (!box) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-gray-600">Box not found.</p>
        <Link className="underline" to="/best-sellers">
          Back to best sellers
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/best-sellers" className="text-sm font-semibold hover:underline">
        ← Back to best sellers
      </Link>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Box */}
        <section className="lg:col-span-7">
          <div className="rounded-3xl border border-gray-200 p-8">
            <div className="h-56 rounded-2xl bg-gray-100 flex items-center justify-center">
              <div className="text-6xl">🎁</div>
            </div>

            <h1 className="mt-6 text-3xl font-bold">{box.name}</h1>
            <p className="mt-3 text-gray-600">{box.description}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-2 rounded-full bg-gray-100">
                Valid {box.validity_days} days
              </span>
              <span className="px-3 py-2 rounded-full bg-gray-100">
                Unique QR voucher
              </span>
              <span className="px-3 py-2 rounded-full bg-gray-100">
                Book anytime before expiry
              </span>
            </div>
          </div>

          {/* Experiences included */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Included experiences</h2>
            <p className="mt-2 text-gray-600">
              Choose one of these partner experiences when redeeming your voucher.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((e) => (
                <div
                  key={e.id}
                  className="rounded-3xl border border-gray-200 p-6 hover:shadow-md transition"
                >
                  <div className="text-sm text-gray-500">
                    {e.partner?.name ?? "Partner"} • {e.city ?? "—"}
                  </div>
                  <div className="mt-2 font-semibold">{e.title}</div>
                  <div className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {e.description}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {e.duration_minutes ? `${e.duration_minutes} min` : "Duration varies"}
                    </span>
                    <span className="font-semibold">{e.price_dzd} DZD</span>
                  </div>
                </div>
              ))}
            </div>

            {experiences.length === 0 && (
              <p className="mt-4 text-gray-600">No experiences linked yet.</p>
            )}
          </div>
        </section>

        {/* Right: Purchase card (UI only for now) */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="mt-1 text-3xl font-bold">{box.price_dzd} DZD</div>

            <button className="mt-6 w-full px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800">
              Buy this box
            </button>

            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>Voucher validity</span>
                <span className="font-semibold">{box.validity_days} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Format</span>
                <span className="font-semibold">QR / digital</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Redemption</span>
                <span className="font-semibold">Online booking</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}