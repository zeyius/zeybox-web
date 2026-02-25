import { Link, Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Announcement bar */}
      <div className="w-full bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center">
          🎁 Unique QR voucher • 365 days validity • Algeria-wide partners
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-black" />
            <span className="text-xl font-bold tracking-tight">ZEYBOX</span>
          </Link>

          {/* Search (UI only for now) */}
          <div className="hidden md:flex flex-1">
            <div className="w-full max-w-xl relative">
              <input
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="Search experiences, cities, themes…"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800">
                Search
              </button>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link className="text-gray-700 hover:text-black" to="/best-sellers">
              Best sellers
            </Link>
            <Link className="text-gray-700 hover:text-black" to="/gift-ideas">
              Gift ideas
            </Link>
            <Link className="text-gray-700 hover:text-black" to="/enterprise">
              Enterprise
            </Link>
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/voucher"
              className="hidden md:inline-flex px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50"
            >
              I have a voucher
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="md:hidden px-4 pb-4">
          <input
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="Search experiences…"
          />
        </div>
      </header>

      <Outlet />
    </div>
  );
}