export default function Voucher() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">I have a voucher</h1>
      <p className="mt-2 text-gray-600">
        Enter your code to check validity and book an experience.
      </p>

      <div className="mt-8 rounded-3xl border border-gray-200 p-8">
        <label className="text-sm font-medium">Voucher code</label>
        <input
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          placeholder="ZBX-xxxxxxxxxxxxxxxxxxxx"
        />
        <button className="mt-4 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-800">
          Continue
        </button>
      </div>
    </main>
  );
}