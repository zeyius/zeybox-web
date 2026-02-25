export default function BestSellers() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Best sellers</h1>

      {/* Tabs (like categories row) */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["All boxes", "Web exclusive", "Best sellers", "New", "Weekend", "Restaurants", "Wellness", "Adventure"].map(
          (t) => (
            <button
              key={t}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
            >
              {t}
            </button>
          )
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters */}
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
                <option>Featured</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="h-40 rounded-2xl bg-gray-100" />
                <h3 className="mt-4 font-semibold">Box title #{i}</h3>
                <p className="mt-1 text-sm text-gray-600">Short highlights (1–2 lines)</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold">15 000 DZD</span>
                  <button className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:bg-gray-800">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}