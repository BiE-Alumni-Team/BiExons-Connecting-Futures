import Link from "next/link";
import { notFound } from "next/navigation";

import {
    FiArrowLeft,
    FiBriefcase,
    FiCalendar,
    FiCheckCircle,
    FiLayers,
    FiMail,
    FiMapPin,
} from "react-icons/fi";

import {
    opportunitiesData,
    getOpportunitySlug,
    isOpportunityOpen,
} from "../../opportunitiesdata";


function getOpportunityBySlug(slug) {
    return opportunitiesData.find(
        (item) => getOpportunitySlug(item) === slug
    );
}


export default async function OpportunityDetailsPage({ params }) {
    const { slug } = await params;

    const item = getOpportunityBySlug(slug);

    console.log("URL SLUG:", slug);

    console.log(
        "AVAILABLE SLUGS:",
        opportunitiesData.map((item) => getOpportunitySlug(item))
    );

    console.log("FOUND ITEM:", item);


    if (!item) {
        notFound();
    }


    const isOpen = isOpportunityOpen(item);


    const mailtoHref = item.contactEmail
        ? `mailto:${item.contactEmail}?subject=${encodeURIComponent(
            `Application: ${item.title}`
        )}`
        : null;


    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">

                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

                    <Link
                        href="/opportunity"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-100 hover:text-white"
                    >
                        <FiArrowLeft />
                        Back to Opportunities
                    </Link>


                    <div className="mt-8">

                        <div className="flex flex-wrap gap-3">

                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700">
                                {item.type}
                            </span>


                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${isOpen
                                    ? "bg-green-300 text-green-900"
                                    : "bg-gray-900 text-white"
                                    }`}
                            >
                                {isOpen ? "Open" : "Closed"}
                            </span>

                        </div>


                        <h1 className="mt-5 text-3xl font-extrabold text-white md:text-5xl">
                            {item.title}
                        </h1>


                        <p className="mt-4 flex items-center gap-2 text-lg font-semibold text-green-50">
                            <FiBriefcase />
                            {item.organization}
                        </p>


                        <div className="mt-6 flex flex-wrap gap-6 text-sm text-green-100">

                            <span className="flex items-center gap-2">
                                <FiLayers />
                                {item.field}
                            </span>


                            <span className="flex items-center gap-2">
                                <FiMapPin />
                                {item.location}

                                {item.workMode
                                    ? ` · ${item.workMode}`
                                    : ""}
                            </span>


                            <span className="flex items-center gap-2">
                                <FiCalendar />
                                Deadline: {item.deadline}
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* CONTENT */}
            <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

                <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">


                    {/* MAIN CONTENT */}
                    <article className="rounded-2xl bg-white p-6 shadow-sm md:p-10">

                        <h2 className="text-2xl font-bold text-gray-800">
                            About This Opportunity
                        </h2>


                        <p className="mt-5 text-lg leading-8 text-gray-600">
                            {item.description}
                        </p>


                        {item.content && (
                            <div className="mt-8">

                                {item.content
                                    .split(/\n\s*\n/)
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="mb-6 text-base leading-8 text-gray-600"
                                        >
                                            {paragraph.trim()}
                                        </p>
                                    ))}

                            </div>
                        )}


                        {item.requirements?.length > 0 && (
                            <div className="mt-10 border-t border-gray-100 pt-8">

                                <h2 className="text-xl font-bold text-gray-800">
                                    Requirements
                                </h2>


                                <ul className="mt-5 space-y-4">

                                    {item.requirements.map(
                                        (requirement, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-gray-600"
                                            >
                                                <FiCheckCircle className="mt-1 shrink-0 text-green-700" />

                                                <span>
                                                    {requirement}
                                                </span>
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>
                        )}

                    </article>


                    {/* SIDEBAR */}
                    <aside className="h-fit space-y-6">


                        <div className="rounded-2xl bg-white p-6 shadow-sm">

                            <h2 className="text-lg font-bold text-gray-800">
                                Opportunity Details
                            </h2>


                            <div className="mt-6 space-y-6">

                                <div className="flex gap-3">
                                    <FiBriefcase className="mt-1 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400">
                                            Type
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {item.type}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-3">
                                    <FiLayers className="mt-1 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400">
                                            Field
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {item.field}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-3">
                                    <FiMapPin className="mt-1 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400">
                                            Location
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {item.location}

                                            {item.workMode
                                                ? ` · ${item.workMode}`
                                                : ""}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-3">
                                    <FiCalendar className="mt-1 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400">
                                            Deadline
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {item.deadline}
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-3">
                                    <FiCheckCircle className="mt-1 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400">
                                            Status
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {isOpen
                                                ? "Open"
                                                : "Closed"}
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>


                        {/* CONTACT */}
                        <div
                            className={`rounded-2xl p-6 ${isOpen
                                ? "bg-green-50"
                                : "bg-gray-100"
                                }`}
                        >

                            <h2 className="text-lg font-bold text-gray-800">
                                {isOpen
                                    ? "Interested?"
                                    : "Application Closed"}
                            </h2>


                            {isOpen && item.contactEmail ? (

                                <>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Contact the organization using
                                        the email below.
                                    </p>

                                    <a
                                        href={mailtoHref}
                                        className="mt-5 flex items-center gap-2 break-all text-sm font-bold text-green-700 hover:underline"
                                    >
                                        <FiMail />
                                        {item.contactEmail}
                                    </a>
                                </>

                            ) : (

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    This opportunity is currently
                                    closed.
                                </p>

                            )}

                        </div>

                    </aside>

                </div>


                <div className="mt-8">

                    <Link
                        href="/opportunity"
                        className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-5 py-3 text-sm font-bold text-green-700 hover:bg-green-50"
                    >
                        <FiArrowLeft />
                        Back to All Opportunities
                    </Link>

                </div>

            </section>

        </main>
    );
}