import {
    QrCode,
    Play,
    Mail,
    MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#272b2c] text-gray-300">

            {/* Newsletter */}
            <div className="border-b border-[#3b3f40]">
                <div className="flex flex-col md:flex-row mx-auto max-w-7xl items-center justify-between gap-8 px-6 py-12">

                    <div>
                        <h2 className="text-2xl font-semibold text-[#9df58f]">
                            Stay connected with the BiE community
                        </h2>

                        <p className="mt-2 text-[16px] text-gray-400">
                            Get the latest updates on research, events, and alumni success
                            stories delivered to your inbox.
                        </p>
                    </div>

                    <form className="flex flex-col lg:flex-row shrink-0 gap-4 ">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-[51px] w-[268px] rounded-lg border-2 border-[#55595a]
                         bg-[#292d2e] px-4 text-gray-200 outline-none
                         placeholder:text-gray-500
                         focus:border-[#72d96b]"
                        />

                        <button
                            type="submit"
                            className="h-[51px] rounded-lg btn btn-success px-6
                         text-white transition font-semibold
                         hover:bg-[#177923]"
                        >
                            Subscribe
                        </button>

                    </form>

                </div>

            </div>


            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="grid grid-cols-2 gap-12 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">

                            {/* Logo */}
                            <div className="flex h-10 w-10 items-center justify-center
                              rounded-md bg-white text-xs font-bold text-[#17651d]">
                                ✳BiE
                            </div>

                            <span className="text-[30px] font-bold text-[#a1f293]">
                                BiE
                            </span>
                        </div>

                        <Link href="https://bau.edu.bd/" target="blank" className="mt-7 text-[16px] text-gray-400">
                            Bangladesh Agricultural University
                        </Link>

                        <p className="mt-5 max-w-[270px] leading-6 text-gray-400">
                            Connecting graduates, fostering research collaboration, and
                            advancing bioinformatics engineering worldwide.
                        </p>

                        {/* Social icons */}
                        <div className="mt-5 flex gap-4">

                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center
                           rounded-full bg-[#34393a] text-gray-300
                           transition hover:bg-[#414647]"
                            >
                                <QrCode size={19} />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center
                           rounded-full bg-[#34393a] text-gray-300
                           transition hover:bg-[#414647]"
                            >

                            </Link>

                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center
                           rounded-full bg-[#34393a] text-gray-300
                           transition hover:bg-[#414647]"
                            >
                                <Play size={19} fill="currentColor" />
                            </Link>

                            <Link
                                href="mailto:bie.alumni@bau.edu.bd"
                                className="flex h-10 w-10 items-center justify-center
                           rounded-full bg-[#34393a] text-gray-300
                           transition hover:bg-[#414647]"
                            >
                                <Mail size={19} />
                            </Link>

                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="mb-4 inline-block border-b border-[#45494a]
                           pb-3 text-lg font-semibold text-white">
                            Explore
                        </h3>

                        <ul className="space-y-5 text-[16px]">
                            <li><Link href="/" className="hover:text-[#9df58f]">Home</Link></li>
                            <li><Link href="/alumni" className="hover:text-[#9df58f]">Alumni Directory</Link></li>
                            <li><Link href="https://csm.bau.edu.bd/pages/faculty" className="hover:text-[#9df58f]">Faculty</Link></li>
                            <li><Link href="/opportunity" className="hover:text-[#9df58f]">Opportunities</Link></li>
                            <li><Link href="/events" className="hover:text-[#9df58f]">Events Archive</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">About Us</Link></li>
                        </ul>
                    </div>


                    {/* Community */}
                    <div>
                        <h3 className="mb-4 inline-block border-b border-[#45494a]
                           pb-3 text-lg font-semibold text-white">
                            Community
                        </h3>

                        <ul className="space-y-5 text-[16px]">
                            <li><Link href="/registration" className="hover:text-[#9df58f]">Join the Network</Link></li>
                            <li><Link href="/alumni" className="hover:text-[#9df58f]">Find an Alumni</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Mentorship Program</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Post an Opportunity</Link></li>
                            <li><Link href="/experience" className="hover:text-[#9df58f]">Alumni Stories</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Help & Support</Link></li>
                        </ul>
                    </div>


                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 inline-block border-b border-[#45494a]
                           pb-3 text-lg font-semibold text-white">
                            Resources
                        </h3>

                        <ul className="space-y-5 text-[16px]">
                            <li><Link href="#" className="hover:text-[#9df58f]">About BAU</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Research Projects</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Career Portal</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#9df58f]">Terms of Service</Link></li>
                        </ul>

                        {/* Contact box */}
                        <div className="mt-6 rounded-lg bg-[#202425] p-4">

                            <div className="flex items-start gap-3">
                                <Mail
                                    size={21}
                                    className="mt-0.5 shrink-0 text-[#8df17e]"
                                />

                                <span className="text-[16px] text-gray-400">
                                    bytetrio.bau@gmail.com
                                </span>
                            </div>

                            <div className="mt-4 flex items-start gap-3">
                                <MapPin
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#8df17e]"
                                />

                                <span className="text-[16px] leading-6 text-gray-400">
                                    Bangladesh Agricultural University,
                                    Mymensingh, Bangladesh
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


            {/* Bottom bar */}
            <div className="border-t border-[#222627] bg-[#171a1b]">

                <div className="mx-auto flex max-w-7xl flex-col
                        justify-between gap-4 px-6 py-5
                        md:flex-row md:items-start">

                    <div className="max-w-[600px] text-sm leading-5 text-gray-400 flex flex-col">
                        <span className="text-[#8ee782]"> © 2024 Bioinformatics Engineering Alumni Network,</span>
                        <span className="text-center">_byteTrio. All rights reserved.</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm justify-between">

                        <span className="font-medium text-[#8ee782]">
                            Built for the BiE community.
                        </span>


                        <span className="font-medium text-[#8ee782]">Develop By _byteTrio</span>

                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;