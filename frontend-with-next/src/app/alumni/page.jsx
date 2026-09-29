
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { alumni, fullName } from "../alumnidata";

const SORTS = {
  "name-asc": { label: "Name (A–Z)", fn: (a, b) => fullName(a).localeCompare(fullName(b)) },
  "name-desc": { label: "Name (Z–A)", fn: (a, b) => fullName(b).localeCompare(fullName(a)) },
  "session-desc": { label: "Session (Newest)", fn: (a, b) => b.session.localeCompare(a.session) },
  "session-asc": { label: "Session (Oldest)", fn: (a, b) => a.session.localeCompare(b.session) },
};

function Avatar({ person }) {
  const initials = `${person.firstName[0] ?? ""}${person.lastName[0] ?? ""}`;
  return person.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={person.image} alt={fullName(person)} className="h-20 w-20 rounded-full object-cover" />
  ) : (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-xl font-semibold text-green-700">
      {initials}
    </div>
  );
}

export default function AlumniPage() {
  const [sort, setSort] = useState("name-asc");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return alumni
      .filter((a) => !q || `${fullName(a)} ${a.designation} ${a.location}`.toLowerCase().includes(q))
      .sort(SORTS[sort].fn);
  }, [sort, query]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Alumni Directory</h1>
          <p className="text-sm text-gray-500">{list.length} alumni</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, role, location"
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-green-600 sm:w-64"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort alumni"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
          >
            {Object.entries(SORTS).map(([key, s]) => (
              <option key={key} value={key}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
          No alumni match your search. Try a different name, role or location.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <article key={a.slug} className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
              <Avatar person={a} />
              <h2 className="mt-3 text-base font-semibold text-gray-900">{fullName(a)}</h2>
              <p className="text-sm text-gray-700">{a.designation || "Designation not provided"}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {a.location || "Location not provided"}
              </p>
              <Link
                href={`/alumni/${a.slug}`}
                className="mt-4 rounded-md bg-green-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-800"
              >
                Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
