// components/AlumniCommunityStrip.jsx
// Small strip with icons + text about the alumni community.
import { Users, Handshake, Briefcase, GraduationCap } from "lucide-react";

const items = [
  { icon: Users, title: "Connect", text: "Find and reach fellow alumni" },
  { icon: Handshake, title: "Mentorship", text: "Guidance from experienced graduates" },
  { icon: Briefcase, title: "Job referrals", text: "Career openings shared by alumni" },
  { icon: GraduationCap, title: "Every session", text: "Batches from all years, one place" },
];

export default function AlumniCommunityStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900">Our alumni community</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-600">
          Our alumni are graduates of Bioinformatics Engineering who now work in research,
          industry and higher studies around the world. This community helps them stay
          connected, support current students and open doors for each other.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
