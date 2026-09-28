
"use client";

import { useState } from "react";
import Link from "next/link";

import {
    FiArrowRight,
    FiBriefcase,
    FiCalendar,
    FiLayers,
    FiMail,
    FiMapPin,
    FiPlus,
} from "react-icons/fi";

import {
    opportunitiesData,
    getOpportunitySlug,
    isOpportunityOpen,
} from "../opportunitiesdata";

import PostOpportunity from "../../components/others/PostOpportunity";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function sortByDeadline(list, direction = "asc") {
    return [...list].sort((a, b) => {
        const diff = new Date(a.deadline) - new Date(b.deadline);
        return direction === "asc" ? diff : -diff;
    });
}

function typeBadgeClass(type) {
    return type === "Job"
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700";
}

// --------------------------------------------------
// Opportunity Card
// --------------------------------------------------

function OpportunityCard({ item, closed = false }) {
    return (
        <article
            className={`group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${closed ? "opacity-80" : ""
                }`}
        >
            {/* Badges */}
            <div className="flex items-center justify-between">
                <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${typeBadgeClass(
                        item.type
                    )}`}
                >
                    {item.type}
                </span>

                {closed && (
                    <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-bold text-white">
                        Closed
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-7 text-gray-800 transition group-hover:text-green-700">
                {item.title}
            </h3>

            {/* Organization */}
            <p className="mt-1 text-sm font-semibold text-gray-500">
                {item.organization}
            </p>

            {/* Information */}
            <div className="mt-4 space-y-2 text-sm text-gray-500">

                {/* Field */}
                <p className="flex items-center gap-2">
                    <FiLayers className="shrink-0 text-green-700" />
                    {item.field}
                </p>

                {/* Location */}
                <p className="flex items-center gap-2">
                    <FiMapPin className="shrink-0 text-green-700" />
                    {item.location}
                    {item.workMode ? ` · ${item.workMode}` : ""}
                </p>

                {/* Deadline */}
                <p
                    className={`flex items-center gap-2 ${closed ? "" : "font-semibold text-amber-700"
                        }`}
                >
                    <FiCalendar
                        className={`shrink-0 ${closed ? "text-green-700" : ""
                            }`}
                    />

                    Deadline:{" "}
                    {new Date(item.deadline + "T00:00:00").toLocaleDateString(
                        "en-US",
                        {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        }
                    )}
                </p>
            </div>

            {/* Description */}
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                {item.description}
            </p>

            {/* Footer */}
            <div className="mt-auto pt-5">

                {/* Contact email */}
                {!closed && item.contactEmail && (
                    <a
                        href={`mailto:${item.contactEmail}?subject=${encodeURIComponent(
                            `Application: ${item.title}`
                        )}`}
                        className="mb-4 flex items-center gap-2 break-all text-sm font-semibold text-green-700 hover:underline"
                    >
                        <FiMail className="shrink-0" />
                        {item.contactEmail}
                    </a>
                )}

                {/* Details */}
                <Link
                    href={`/opportunity/${getOpportunitySlug(item)}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition-all hover:gap-3"
                >
                    View Details
                    <FiArrowRight />
                </Link>
            </div>
        </article>
    );
}

// --------------------------------------------------
// Opportunities Page
// --------------------------------------------------

export default function OpportunitiesPage() {

    const [showClosed, setShowClosed] = useState(false);

    // Keep opportunities in React state
    const [opportunities, setOpportunities] =
        useState(opportunitiesData);

    // Show / hide post form
    const [showPostForm, setShowPostForm] = useState(false);

    // --------------------------------------------------
    // Add new opportunity
    // --------------------------------------------------

    const handlePostOpportunity = (data) => {

        const newOpportunity = {
            ...data,

            // Generate unique ID
            id: Date.now(),

            // Date when posted
            postedDate: new Date()
                .toISOString()
                .split("T")[0],
        };

        // Add new opportunity at the beginning
        setOpportunities((prev) => [
            newOpportunity,
            ...prev,
        ]);

        // Close form
        setShowPostForm(false);

        // Automatically show Open opportunities
        setShowClosed(false);
    };

    // --------------------------------------------------
    // Open opportunities
    // --------------------------------------------------

    const openItems = sortByDeadline(
        opportunities.filter(isOpportunityOpen),
        "asc"
    );

    // --------------------------------------------------
    // Closed opportunities
    // --------------------------------------------------

    const closedItems = sortByDeadline(
        opportunities.filter(
            (item) => !isOpportunityOpen(item)
        ),
        "desc"
    );

    // Currently displayed opportunities
    const displayedItems = showClosed
        ? closedItems
        : openItems;

    return (
        <main className="min-h-screen bg-gray-50">



            {/* ==================================================
                HERO
            ================================================== */}

            <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">

                {/* Decorative circles */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">

                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                        <FiBriefcase />
                        BiExON Community
                    </span>

                    {/* Title */}
                    <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                        Opportunities
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-green-50 md:text-lg">
                        Jobs and internships shared by the BAU Bioinformatics
                        community. Interested? Contact the poster by email.
                    </p>

                    {/* Post button */}
                    <button
                        type="button"
                        onClick={() => setShowPostForm(true)}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50"
                    >
                        <FiPlus />
                        Post a Job or Internship
                    </button>
                </div>
            </section>

            {/* ==================================================
                POST OPPORTUNITY FORM
            ================================================== */}

            {showPostForm && (
                <PostOpportunity
                    onClose={() => setShowPostForm(false)}
                    onPost={handlePostOpportunity}
                />
            )}

            {/* ==================================================
                CONTENT
            ================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* ==================================================
                    OPEN / CLOSED TOGGLE
                ================================================== */}

                <div className="mb-10 flex justify-center">

                    <div className="inline-flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">

                        {/* Open */}
                        <button
                            type="button"
                            onClick={() => setShowClosed(false)}
                            className={`rounded-lg px-6 py-3 text-sm font-bold transition ${!showClosed
                                ? "bg-green-700 text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Open

                            <span
                                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${!showClosed
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {openItems.length}
                            </span>
                        </button>

                        {/* Closed */}
                        <button
                            type="button"
                            onClick={() => setShowClosed(true)}
                            className={`rounded-lg px-6 py-3 text-sm font-bold transition ${showClosed
                                ? "bg-gray-800 text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Closed

                            <span
                                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${showClosed
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {closedItems.length}
                            </span>
                        </button>

                    </div>
                </div>

                {/* ==================================================
                    SECTION TITLE
                ================================================== */}

                <div className="mb-6">

                    <h2 className="text-2xl font-bold text-gray-800">
                        {showClosed
                            ? "Closed Opportunities"
                            : "Open Opportunities"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {showClosed
                            ? "The application deadline for these opportunities has passed."
                            : "Applications are currently being accepted."}
                    </p>

                </div>

                {/* ==================================================
                    OPPORTUNITY CARDS
                ================================================== */}

                {displayedItems.length > 0 ? (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {displayedItems.map((item) => (

                            <OpportunityCard
                                key={item.id}
                                item={item}
                                closed={showClosed}
                            />

                        ))}

                    </div>

                ) : (

                    /* Empty state */

                    <div className="rounded-2xl bg-white py-16 text-center shadow-sm">

                        <FiBriefcase className="mx-auto text-4xl text-gray-300" />

                        <h3 className="mt-4 text-lg font-bold text-gray-700">
                            {showClosed
                                ? "No Closed Opportunities"
                                : "No Open Opportunities"}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {showClosed
                                ? "There are no closed opportunities available."
                                : "Please check back later for new opportunities."}
                        </p>

                    </div>
                )}

            </section>
        </main>
    );
}
