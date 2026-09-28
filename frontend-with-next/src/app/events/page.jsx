import Image from "next/image";
import Link from "next/link";
import {
    FiAlertCircle,
    FiArrowRight,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiUsers,
} from "react-icons/fi";

import { eventsData, getEventSlug, isRegistrationOpen } from "../eventsdata";

// Re-check upcoming/past status at most once per hour
export const revalidate = 3600;

// --------------------------------------------------
// Helpers
// --------------------------------------------------
function isUpcoming(event) {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventDate >= today;
}

function sortByDate(list, direction = "asc") {
    return [...list].sort((a, b) => {
        const diff = new Date(a.date) - new Date(b.date);
        return direction === "asc" ? diff : -diff;
    });
}

// --------------------------------------------------
// Event Card (display only)
// --------------------------------------------------
function EventCard({ event, past = false }) {
    return (
        <article
            className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${past ? "opacity-80" : ""
                }`}
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={`object-cover transition duration-500 group-hover:scale-105 ${past ? "grayscale" : ""
                        }`}
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700 shadow">
                    {event.type}
                </span>

                {past && (
                    <span className="absolute right-4 top-4 rounded-full bg-gray-800 px-3 py-1 text-xs font-bold text-white shadow">
                        Ended
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="line-clamp-2 text-lg font-bold leading-7 text-gray-800 transition group-hover:text-green-700">
                    {event.title}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                        <FiCalendar className="shrink-0 text-green-700" />
                        {event.date}
                    </p>

                    <p className="flex items-center gap-2">
                        <FiClock className="shrink-0 text-green-700" />
                        {event.time}
                    </p>

                    <p className="flex items-center gap-2">
                        <FiMapPin className="shrink-0 text-green-700" />
                        {event.location}
                    </p>

                    <p className="flex items-center gap-2">
                        <FiUsers className="shrink-0 text-green-700" />
                        Organized by {event.organizer}
                    </p>

                    {!past && event.registrationOpen && event.registrationDeadline && (
                        <p className="flex items-center gap-2 font-semibold text-amber-700">
                            <FiAlertCircle className="shrink-0" />
                            Register by {event.registrationDeadline}
                        </p>
                    )}
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {event.description}
                </p>

                {/* Buttons: Details always, Register only when open */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                        href={`/events/${getEventSlug(event)}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-4 py-2 text-sm font-bold text-green-700 transition hover:bg-green-50"
                    >
                        Details
                    </Link>

                    {isRegistrationOpen(event) && (
                        <a
                            href={event.registerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-800"
                        >
                            Register
                            <FiArrowRight />
                        </a>
                    )}

                    {!past && event.registrationOpen && !isRegistrationOpen(event) && (
                        <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-500">
                            Registration closed
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}

// --------------------------------------------------
// Section wrapper
// --------------------------------------------------
function EventsSection({ title, subtitle, events, past = false, emptyText }) {
    return (
        <div className="mt-12 first:mt-0">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            </div>

            {events.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} past={past} />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl bg-white py-14 text-center shadow-sm">
                    <p className="text-sm text-gray-500">{emptyText}</p>
                </div>
            )}
        </div>
    );
}

// ==================================================
// EVENTS PAGE
// ==================================================
export default function EventsPage() {
    const upcomingEvents = sortByDate(eventsData.filter(isUpcoming), "asc");
    const pastEvents = sortByDate(
        eventsData.filter((event) => !isUpcoming(event)),
        "desc"
    );

    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
                    <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                        BiExON Community
                    </span>

                    <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                        Events
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-green-50 md:text-lg">
                        Workshops, seminars, and gatherings for the BAU
                        Bioinformatics community.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <EventsSection
                    title="Upcoming Events"
                    subtitle="Mark your calendar for what's coming next."
                    events={upcomingEvents}
                    emptyText="No upcoming events right now. Please check back soon."
                />

                {pastEvents.length > 0 && (
                    <EventsSection
                        title="Past Events"
                        subtitle="A look back at what we've already held."
                        events={pastEvents}
                        past
                    />
                )}
            </section>

        </main>
    );
}
