export default function Enterprise() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Corporate gifting & incentives — made simple
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Reward teams, clients, and partners with flexible experience gifts.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="px-6 py-4 rounded-2xl bg-black text-white font-semibold hover:bg-gray-800">
                Request a quote
              </button>
              <button className="px-6 py-4 rounded-2xl border border-gray-200 font-semibold hover:bg-gray-50">
                Talk to sales
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <div className="text-sm font-semibold">What you get</div>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>• Customizable gifting campaigns</li>
              <li>• Bulk vouchers (QR / digital)</li>
              <li>• Reporting & partner coverage</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold">Why choose ZEYBOX</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Fast delivery / instant e-voucher", "Exclusive boxes", "Easy redemption"].map((t) => (
            <div key={t} className="rounded-3xl border border-gray-200 p-6">
              <div className="font-semibold">{t}</div>
              <div className="mt-2 text-sm text-gray-600">Short explanation here.</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}