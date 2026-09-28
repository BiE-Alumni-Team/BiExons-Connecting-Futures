import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    FiArrowLeft,
    FiCalendar,
    FiClock,
} from "react-icons/fi";

import { newsData } from "../../newsdata";

// --------------------------------------------------
// Create slug
// --------------------------------------------------
function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// --------------------------------------------------
// Find news
// --------------------------------------------------
function getNewsBySlug(slug) {
    return newsData.find((item) => {
        const itemSlug = item.slug || createSlug(item.title);
        return itemSlug === slug;
    });
}

// --------------------------------------------------
// Generate pages
// --------------------------------------------------
export function generateStaticParams() {
    return newsData.map((item) => ({
        slug: item.slug || createSlug(item.title),
    }));
}

// --------------------------------------------------
// Details Page
// --------------------------------------------------
export default async function NewsDetailsPage({ params }) {

    const { slug } = await params;

    const news = getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">
                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

                    <Link
                        href="/experience"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-100 transition hover:text-white"
                    >
                        <FiArrowLeft />
                        Back to News
                    </Link>

                    <div className="mt-8">
                        <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700">
                            {news.category}
                        </span>

                        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                            {news.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-green-100">
                            <span className="flex items-center gap-2">
                                <FiCalendar />
                                {news.date}
                            </span>

                            <span className="flex items-center gap-2">
                                <FiClock />
                                {news.readTime}
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
                            src={news.image}
                            alt={news.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="p-6 md:p-10">

                        <p className="text-xl font-semibold leading-9 text-gray-700">
                            {news.description}
                        </p>

                        <div className="mt-10">
                            {news.content ? (
                                news.content
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
                            ) : (
                                <p className="text-base leading-8 text-gray-600">
                                    {news.description}
                                </p>
                            )}
                        </div>

                    </div>

                </article>

                <div className="mt-8">
                    <Link
                        href="/experience"
                        className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
                    >
                        <FiArrowLeft />
                        Back to All News
                    </Link>
                </div>

            </section>

        </main>
    );
}
