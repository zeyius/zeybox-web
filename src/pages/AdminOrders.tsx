import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Order = {
  id: string;
  status: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED";
  payment_method: string;
  total_dzd: number;
  buyer_email: string | null;
  recipient_email: string | null;
  payment_reference: string | null;
  created_at: string;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id,status,payment_method,total_dzd,buyer_email,recipient_email,payment_reference,created_at"
      )
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    setOrders((data ?? []) as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin — Orders</h1>
        <button
          onClick={load}
          className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-semibold"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-gray-600">No orders yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">Created</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Method</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Buyer</th>
                <th className="text-left p-3">Recipient</th>
                <th className="text-left p-3">Ref</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-gray-200">
                  <td className="p-3 whitespace-nowrap">
                    {new Date(o.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 font-semibold">
                    {o.status === "PENDING" ? (
                        <button
                        onClick={async () => {
                            const { error } = await supabase.rpc(
                            "mark_order_paid_create_vouchers",
                            { order_id: o.id }
                            );

                            if (error) {
                            console.error(error);
                            alert("Failed to confirm payment.");
                            return;
                            }

                            alert("Payment confirmed. Voucher generated ✅");
                            load();
                        }}
                        className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700"
                        >
                        Confirm
                        </button>
                    ) : (
                        o.status
                    )}
                    </td>
                  <td className="p-3">{o.payment_method}</td>
                  <td className="p-3">{o.total_dzd} DZD</td>
                  <td className="p-3">{o.buyer_email ?? "—"}</td>
                  <td className="p-3">{o.recipient_email ?? "—"}</td>
                  <td className="p-3">{o.payment_reference ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}