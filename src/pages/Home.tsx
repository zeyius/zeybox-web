export default function Home() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-gray-100 px-3 py-2 rounded-full">
              ✨ Experience gifting, made for Algeria
            </p>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
              Gift unforgettable experiences — not objects.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Choose a box, send a unique QR voucher, and let them book before expiry.
            </p>
          </div>

          <div className="aspect-[4/3] rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl">🎁</div>
              <div className="mt-3 font-semibold">ZEYBOX Gift Box</div>
              <div className="text-sm text-gray-600">Premium experiences inside</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}