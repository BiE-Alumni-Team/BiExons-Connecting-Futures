// app/alumni/[slug]/page.jsx  (read-only profile, no edit buttons)
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { alumni, getAlumniBySlug, fullName } from "../../alumnidata";

export function generateStaticParams() {
  return alumni.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const person = getAlumniBySlug(slug);
  return { title: person ? `${fullName(person)} | Alumni` : "Alumni" };
}

const NA = <span className="text-red-500">Not provided</span>;

function Card({ title, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 border-b border-gray-100 pb-3 text-sm font-semibold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div className="rounded-md bg-gray-50 p-3">
      <p className="text-[10px] font-semibold uppercase text-gray-500">{label}</p>
      <p className="mt-0.5 break-words text-xs font-medium text-gray-900">{children || NA}</p>
    </div>
  );
}

export default async function AlumniDetailPage({ params }) {
  const { slug } = await params;
  const a = getAlumniBySlug(slug);
  if (!a) notFound();

  const initials = `${a.firstName[0] ?? ""}${a.lastName[0] ?? ""}`;

  return (
    <main className="mx-auto max-w-5xl space-y-4 px-4 py-8">
      <Link href="/alumni" className="inline-flex items-center gap-1 text-sm text-green-700 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to directory
      </Link>

      {/* Header */}
      <section className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {a.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.image} alt={fullName(a)} className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-xl font-semibold text-green-700">
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900">{fullName(a)}</h1>
          <p className="text-sm text-gray-700">{a.designation}</p>
          <p className="text-xs text-blue-600">{a.company}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" /> {a.location || "Location not provided"}
          </p>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card title="Personal Information">
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="First name">{a.firstName}</Field>
              <Field label="Last name">{a.lastName}</Field>
              <Field label="Email">{a.email}</Field>
              <Field label="Phone">{a.phone}</Field>
              <Field label="Location">{a.location}</Field>
              <Field label="Session">{a.session}</Field>
              <div className="sm:col-span-2"><Field label="About me">{a.about}</Field></div>
            </div>
          </Card>

          <Card title="Professional Experience & Skills">
            {a.experience.length === 0 ? (
              <p className="text-xs text-gray-500">No experience added.</p>
            ) : (
              <div className="space-y-3">
                {a.experience.map((e, i) => (
                  <div key={i} className="rounded-md bg-gray-50 p-3">
                    <p className="text-sm font-semibold text-gray-900">{e.title}</p>
                    <p className="text-xs font-medium text-green-700">{e.company}</p>
                    <div className="mt-1 flex gap-2 text-[10px] text-gray-600">
                      <span className="rounded bg-white px-2 py-0.5 shadow-sm">{e.period}</span>
                      <span className="rounded bg-white px-2 py-0.5 shadow-sm">{e.type}</span>
                    </div>
                    {e.focus && (
                      <p className="mt-2 text-xs text-gray-700">
                        <span className="font-semibold">Primary focus: </span>{e.focus}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.skills.map((s) => (
                        <span key={s} className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] text-green-800">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Higher Education">
            {a.education.map((e, i) => (
              <div key={i} className="mb-2 rounded-md bg-gray-50 p-3 last:mb-0">
                <div className="flex justify-between gap-2">
                  <p className="text-xs font-semibold text-gray-900">{e.degree}</p>
                  <span className="text-[10px] text-gray-600">{e.period}</span>
                </div>
                <p className="text-sm font-semibold text-green-700">{e.institute}</p>
                <p className="text-xs text-blue-600">{e.department}</p>
                {e.specialization && (
                  <p className="mt-1 text-xs text-gray-700"><span className="font-semibold">Specialization:</span> {e.specialization}</p>
                )}
              </div>
            ))}
          </Card>

          <Card title="Publications & Research Output">
            {a.publications.length === 0 ? (
              <p className="text-xs text-gray-500">No publications added.</p>
            ) : (
              a.publications.map((p, i) => (
                <div key={i} className="mb-2 border-l-4 border-green-700 bg-gray-50 p-3 last:mb-0">
                  <p className="text-xs font-semibold text-gray-900">{p.title}</p>
                  <p className="text-[11px] text-gray-500">{p.venue} • {p.year}</p>
                </div>
              ))
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Networking & Availability">
            {[["Mentorship", a.networking.mentorship], ["Job Referrals", a.networking.jobReferrals]].map(([label, on]) => (
              <div key={label} className={`mb-2 flex justify-between rounded-md p-2.5 text-xs last:mb-0 ${on ? "bg-green-50" : "bg-gray-50"}`}>
                <span className="font-semibold text-gray-900">{label}</span>
                <span className={on ? "font-semibold text-green-700" : "text-gray-500"}>{on ? "Available" : "Unavailable"}</span>
              </div>
            ))}
          </Card>

          <Card title="Professional Links">
            {a.links.length === 0 ? (
              <p className="text-xs text-gray-500">No links added.</p>
            ) : (
              a.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="mb-2 block rounded-md bg-gray-50 p-3 last:mb-0 hover:bg-green-50">
                  <p className="text-xs font-semibold text-gray-900">{l.label}</p>
                  <p className="truncate text-[11px] text-gray-500">{l.url}</p>
                </a>
              ))
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
