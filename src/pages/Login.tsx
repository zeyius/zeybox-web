export default function Login() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Access your vouchers, bookings, and account.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-semibold text-black hover:underline">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}