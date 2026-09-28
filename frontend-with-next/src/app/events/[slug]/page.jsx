import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    FiAlertCircle,
    FiArrowLeft,
    FiArrowRight,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiUsers,
} from "react-icons/fi";

import { eventsData, getEventSlug, isRegistrationOpen } from "../../eventsdata";

// Keep the upcoming/past check fresh
export const revalidate = 3600;

function getEventBySlug(slug) {
    return eventsData.find((item) => getEventSlug(item) === slug);
}

export function generateStaticParams() {
    return eventsData.map((item) => ({ slug: getEventSlug(item) }));
}

export default async function EventDetailsPage({ params }) {
    const { slug } = await params;

    const event = getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = new Date(event.date) < today;

    const canRegister = isRegistrationOpen(event);
    const registrationClosed =
        !isPast && event.registrationOpen && !canRegister;

    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">
                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-100 transition hover:text-white"
                    >
                        <FiArrowLeft />
                        Back to Events
                    </Link>

                    <div className="mt-8">
                        <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700">
                            {event.type}
                        </span>

                        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                            {event.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-green-100">
                            <span className="flex items-center gap-2">
                                <FiCalendar />
                                {event.date}
                            </span>

                            <span className="flex items-center gap-2">
                                <FiClock />
                                {event.time}
                            </span>

                            <span className="flex items-center gap-2">
                                <FiMapPin />
                                {event.location}
                            </span>

                            <span className="flex items-center gap-2">
                                <FiUsers />
                                Organized by {event.organizer}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE */}
            <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

                <article className="overflow-hidden rounded-2xl bg-white shadow-sm">

                    <div className="relative h-[300px] md:h-[500px]">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="p-6 md:p-10">

                        <p className="text-xl font-semibold leading-9 text-gray-700">
                            {event.description}
                        </p>

                        <div className="mt-10">
                            {event.content
                                ? event.content
                                    .split(/\n\s*\n/)
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="mb-6 text-base leading-8 text-gray-600"
                                        >
                                            {paragraph.trim()}
                                        </p>
                                    ))
                                : null}
                        </div>

                        {/* Organizer */}
                        <div className="mb-6 rounded-xl bg-green-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                                Organizer
                            </p>
                            <p className="mt-1 text-base font-semibold text-gray-800">
                                {event.organizer}
                            </p>
                        </div>

                        {/* Deadline */}
                        {!isPast && event.registrationOpen && event.registrationDeadline && (
                            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-amber-700">
                                <FiAlertCircle />
                                Registration deadline: {event.registrationDeadline}
                            </p>
                        )}

                        {/* Register */}
                        {canRegister && (
                            <a
                                href={event.registerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800"
                            >
                                Register Now
                                <FiArrowRight />
                            </a>
                        )}

                        {registrationClosed && (
                            <p className="mt-4 text-sm font-semibold text-gray-500">
                                Registration is closed for this event.
                            </p>
                        )}

                        {isPast && (
                            <p className="mt-4 text-sm font-semibold text-gray-500">
                                This event has ended.
                            </p>
                        )}
                    </div>

                </article>

                <div className="mt-8">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50"
                    >
                        <FiArrowLeft />
                        Back to All Events
                    </Link>
                </div>

            </section>

        </main>
    );
}
