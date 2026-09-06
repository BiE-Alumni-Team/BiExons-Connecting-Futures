import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-green-200 via-green-100 to-emerald-50 mt-10">

            {/* Background Decorations */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />

            <div className="relative mx-auto flex min-h-[450px] max-w-7xl flex-col items-center justify-between gap-10 px-6 py-12 md:flex-row md:px-12">

                {/* LEFT CONTENT */}
                <div className="max-w-xl text-center md:text-left">

                    {/* Badge */}
                    <span className="inline-block rounded-full border border-green-700/20 bg-white/40 px-4 py-2 text-sm font-semibold text-green-800 backdrop-blur-sm">
                        🎓 Alumni Network
                    </span>

                    {/* Heading */}
                    <h1 className="mt-5 text-4xl font-extrabold leading-tight text-green-950 md:text-5xl lg:text-6xl">
                        Connecting
                        <span className="block text-green-700">
                            Minds & Memories
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-5 text-base leading-7 text-green-950/70 md:text-lg">
                        Stay connected with your university community,
                        discover opportunities, share experiences, and
                        build meaningful connections with fellow alumni.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">

                        <Link href="/registration"
                            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl"
                        >
                            Join Our Community
                        </Link>

                        <button
                            className="rounded-xl border border-green-700/30 bg-white/50 px-6 py-3 font-semibold text-green-800 backdrop-blur-sm transition duration-300 hover:bg-white/80"
                        >
                            Explore Alumni
                        </button>

                    </div>

                </div>

                {/* RIGHT IMAGE */}
                <div className="relative w-full max-w-md">

                    {/* Image Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-green-400/30 blur-2xl" />

                    <div className="relative overflow-hidden rounded-3xl border border-white/50 shadow-2xl">

                        <Image
                            src="/hero.png"
                            alt="University students"
                            width={900}
                            height={600}
                            className="h-[280px] w-full object-cover md:h-[340px]"
                            priority
                        />

                    </div>

                    {/* Floating Alumni Card */}
                    <div className="absolute -bottom-5 -left-5 rounded-2xl border border-green-100 bg-white/95 p-4 text-green-900 shadow-xl backdrop-blur-sm">

                        <p className="text-2xl font-bold">
                            1,000+
                        </p>

                        <p className="text-sm text-gray-500">
                            Alumni Connected
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Banner;