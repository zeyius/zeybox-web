import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [box, setBox] = useState<Box | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const [buying, setBuying] = useState(false);

  // Guest checkout UI state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [paymentReference, setPaymentReference] = useState("");

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
              Choose one of these partner experiences
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

        {/* Right: Purchase card */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="mt-1 text-3xl font-bold">{box.price_dzd} DZD</div>

            {/* Guest checkout opens modal */}
            <button
              onClick={() => setCheckoutOpen(true)}
              className="mt-6 w-full px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800"
            >
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

      {/* Checkout modal */}
      {checkoutOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-lg rounded-3xl bg-white border border-gray-200 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">Checkout</div>
          <h3 className="text-xl font-bold mt-1">{box.name}</h3>
          <div className="text-sm text-gray-600 mt-1">
            {box.price_dzd} DZD • Valid {box.validity_days} days
          </div>
        </div>

        <button
          onClick={() => setCheckoutOpen(false)}
          className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
        >
          ✕
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Buyer email *</label>
          <input
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Buyer name</label>
          <input
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Recipient name</label>
          <input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Recipient email</label>
          <input
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Payment method *</label>
          <select
            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="CASH">Cash</option>
            <option value="BARIDPAY_QR">BaridiMob</option>
          </select>
        </div>

        {(paymentMethod === "BARIDPAY_QR") && (
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Transaction reference *</label>
            {paymentMethod === "BARIDPAY_QR" && (
            <div className="sm:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              <div className="font-semibold">BaridiMob payment</div>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Pay the exact amount: <span className="font-semibold">{box.price_dzd} DZD</span></li>
                <li>• In the payment “message / note”, write: <span className="font-semibold">ZEYBOX-{box.id.slice(0, 6).toUpperCase()}</span></li>
                <li>• After payment, paste the transaction reference above.</li>
              </ul>
            </div>
          )}
            <input
              value={paymentReference}
              onChange={(e) => setPaymentReference(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}
      </div>

      <button
        disabled={buying}
        onClick={async () => {
          if (!buyerEmail.trim()) {
            alert("Buyer email is required.");
            return;
          }

          if (
            (paymentMethod === "BARIDPAY_QR" || paymentMethod === "CARD_SATIM") &&
            !paymentReference.trim()
          ) {
            alert("Transaction reference is required.");
            return;
          }

          setBuying(true);

          const { data: userData } = await supabase.auth.getUser();
          const user = userData.user;

          const { data: order, error: orderErr } = await supabase
            .from("orders")
            .insert({
              customer_user_id: user?.id ?? null,
              status: "PENDING",
              payment_method: paymentMethod,
              currency: "DZD",
              total_dzd: box.price_dzd,
              buyer_email: buyerEmail.trim(),
              buyer_name: buyerName.trim() || null,
              recipient_email: recipientEmail.trim() || buyerEmail.trim(),
              recipient_name: recipientName.trim() || null,
              payment_reference:
                paymentMethod === "CASH" ? null : paymentReference.trim(),
            })
            .select("id")
            .single();

          if (orderErr || !order) {
            console.error(orderErr);
            alert("Could not create order.");
            setBuying(false);
            return;
          }

          await supabase.from("order_items").insert({
            order_id: order.id,
            item_type: "BOX",
            box_id: box.id,
            qty: 1,
            unit_price_dzd: box.price_dzd,
            line_total_dzd: box.price_dzd,
          });

          setBuying(false);
          setCheckoutOpen(false);
          alert("Order created. Awaiting admin confirmation.");
        }}
        className="mt-6 w-full px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 disabled:opacity-60"
      >
        {buying ? "Processing..." : "Confirm order"}
      </button>
    </div>
  </div>
)}
    </main>
  );
}