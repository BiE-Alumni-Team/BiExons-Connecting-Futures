"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FiArrowRight,
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
} from "react-icons/fi";

import { newsData, newsCategories } from "../newsdata";

// --------------------------------------------------
// Create URL-friendly slug from news title
// --------------------------------------------------
function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function getNewsSlug(news) {
    return news.slug || createSlug(news.title);
}

// --------------------------------------------------
// Category Button
// --------------------------------------------------
function CategoryButton({ category, active, onClick }) {
    return (
        <button
            type="button"
            onClick={() => onClick(category)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${active
                ? "bg-green-700 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
        >
            {category}
        </button>
    );
}

// --------------------------------------------------
// News Card
// --------------------------------------------------
function NewsCard({ news }) {
    const slug = getNewsSlug(news);

    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-700 shadow">
                    {news.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">

                <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <FiCalendar />
                        {news.date}
                    </span>

                    <span className="flex items-center gap-1">
                        <FiClock />
                        {news.readTime}
                    </span>
                </div>

                <h3 className="line-clamp-2 text-lg font-bold leading-7 text-gray-800 transition group-hover:text-green-700">
                    {news.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                    {news.description}
                </p>

                {/* FIX: was /news/${slug}, detail page lives at /experience/[slug] */}
                <Link
                    href={`/experience/${slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition-all hover:gap-3"
                >
                    Read More
                    <FiArrowRight />
                </Link>

            </div>
        </article>
    );
}

// --------------------------------------------------
// Latest News
// --------------------------------------------------
function LatestNews({ news }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                    Latest News
                </h2>
                <span className="h-1 w-10 rounded-full bg-green-700" />
            </div>

            <div className="space-y-5">
                {news.slice(0, 5).map((item) => {
                    const slug = getNewsSlug(item);

                    return (
                        // FIX: was /news/${slug}
                        <Link
                            key={item.id}
                            href={`/experience/${slug}`}
                            className="group flex gap-3"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Information */}
                            <div className="min-w-0">
                                <span className="text-xs font-bold text-green-700">
                                    {item.category}
                                </span>

                                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-gray-800 group-hover:text-green-700">
                                    {item.title}
                                </h3>

                                <p className="mt-1 text-xs text-gray-400">
                                    {item.date}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

// ==================================================
// MAIN NEWS PAGE
// ==================================================
export default function NewsPage() {

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    // --------------------------------------------------
    // Categories (always make sure "All" exists)
    // --------------------------------------------------
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                newsData
                    .map((item) => item.category)
                    .filter(Boolean)
            ),
        ];

        return ["All", ...uniqueCategories];
    }, []);

    // --------------------------------------------------
    // Filter news by category
    // --------------------------------------------------
    const filteredNews = useMemo(() => {
        if (selectedCategory === "All") {
            return newsData;
        }

        return newsData.filter(
            (item) =>
                item.category?.toLowerCase() ===
                selectedCategory.toLowerCase()
        );
    }, [selectedCategory]);

    // --------------------------------------------------
    // Featured article
    // Only pull out a big "featured" banner article when
    // browsing "All". For a specific category, every
    // matching article should just appear in the grid —
    // otherwise a category with only 1 article gets its
    // only match sliced out as "featured" and removed from
    // the grid below, making it look like nothing matched.
    // --------------------------------------------------
    const featuredNews =
        selectedCategory === "All"
            ? newsData.find((item) => item.featured) || newsData[0]
            : null;

    // --------------------------------------------------
    // Remove featured article from normal news
    // (no-op when featuredNews is null, i.e. any specific category)
    // --------------------------------------------------
    const normalNews = featuredNews
        ? filteredNews.filter((item) => item.id !== featuredNews.id)
        : filteredNews;

    // --------------------------------------------------
    // Pagination calculation
    // --------------------------------------------------
    const totalPages = Math.ceil(normalNews.length / ITEMS_PER_PAGE);

    const paginatedNews = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        return normalNews.slice(startIndex, endIndex);
    }, [normalNews, currentPage]);

    // --------------------------------------------------
    // Category change
    // --------------------------------------------------
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);

        setTimeout(() => {
            document
                .getElementById("news-results")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    };

    // --------------------------------------------------
    // Page change
    // --------------------------------------------------
    const handlePageChange = (page) => {
        setCurrentPage(page);

        setTimeout(() => {
            document
                .getElementById("news-results")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    };

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
                        News & Updates
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-green-50 md:text-lg">
                        Stay connected with the latest news, achievements,
                        research, events, and opportunities from the BAU
                        Bioinformatics community.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* FEATURED + LATEST */}
                {featuredNews && (
                    <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">

                        {/* Featured */}
                        <article className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="relative h-[320px] overflow-hidden md:h-[400px]">
                                <Image
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
                                        {featuredNews.category}
                                    </span>

                                    <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-white md:text-3xl">
                                        {featuredNews.title}
                                    </h2>

                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-200">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar />
                                            {featuredNews.date}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <FiClock />
                                            {featuredNews.readTime}
                                        </span>
                                    </div>

                                    {/* FIX: was /news/${getNewsSlug(featuredNews)} */}
                                    <Link
                                        href={`/experience/${getNewsSlug(featuredNews)}`}
                                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-green-700 transition hover:bg-green-50"
                                    >
                                        Read Full Story
                                        <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </article>

                        {/* Latest */}
                        <LatestNews news={filteredNews} />
                    </div>
                )}

                {/* CATEGORY FILTER */}
                <div className="mt-12">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Explore News
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Browse stories from across the BiExON community.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <CategoryButton
                                key={category}
                                category={category}
                                active={selectedCategory === category}
                                onClick={handleCategoryChange}
                            />
                        ))}
                    </div>
                </div>

                {/* NEWS RESULTS */}
                <div id="news-results" className="scroll-mt-24">
                    <div className="mt-8">
                        {normalNews.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {paginatedNews.map((news) => (
                                    <NewsCard key={news.id} news={news} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
                                <h3 className="text-lg font-bold text-gray-700">
                                    No news found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    There are no news articles in this category yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FiChevronLeft />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => handlePageChange(page)}
                                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${currentPage === page
                                        ? "bg-green-700 text-white"
                                        : "border border-gray-200 bg-white text-gray-600 hover:bg-green-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    )}
                </div>

            </section>

        </main>
    );
}
