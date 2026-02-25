export default function GiftIdeas() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Gift ideas</h1>

      {/* Occasion chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["For her", "For him", "Couple", "Birthday", "Parents", "Kids & teens"].map((c) => (
          <button key={c} className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50">
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="font-semibold">Filters</div>
            <div className="mt-4 text-sm text-gray-700">
              <div className="font-medium">Budget</div>
              <div className="mt-2 flex gap-2">
                <input className="w-1/2 rounded-xl border border-gray-200 px-3 py-2" placeholder="Min" />
                <input className="w-1/2 rounded-xl border border-gray-200 px-3 py-2" placeholder="Max" />
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="h-40 rounded-2xl bg-gray-100" />
                <h3 className="mt-4 font-semibold">Gift idea #{i}</h3>
                <p className="mt-1 text-sm text-gray-600">Theme + quick description</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold">10 000 DZD</span>
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