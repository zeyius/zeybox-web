import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }, // used by your trigger
          },
        });
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Login" : "Create account"}
          </h1>
          <button
            type="button"
            className="text-sm font-semibold hover:underline"
            onClick={() => {
              setMsg(null);
              setMode(mode === "login" ? "signup" : "login");
            }}
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </div>

        <p className="mt-2 text-gray-600 text-sm">
          {mode === "login"
            ? "Access your vouchers, bookings, and account."
            : "Create your ZEYBOX account in seconds."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="you@email.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create account"}
          </button>
        </form>

        {msg && (
          <div className="mt-4 text-sm rounded-xl border border-gray-200 p-3">
            {msg}
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500">
          By continuing you agree to ZEYBOX terms.
        </div>
      </div>
    </div>
  );
}