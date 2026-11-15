import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-7xl p-12">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h1 className="text-xl font-bold text-slate-900">
          Product niet gevonden
        </h1>
        <p className="mt-2 text-slate-600">
          Het product dat je zoekt bestaat niet of is niet meer beschikbaar.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-lg border bg-indigo-600 px-4 py-2 text-white shadow-sm"
        >
          Terug naar producten
        </Link>
      </div>
    </main>
  );
}
