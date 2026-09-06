'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

const Navbar = () => {

    const pathname = usePathname();

    const links = <>
        <li><Link href="/" className={pathname === "/" ? 'active btn btn-success text-white rounded-2xl' : ''}>Home</Link></li>
        <li><Link href="/alumni" className={pathname === "/alumni" ? 'active btn btn-success text-white rounded-2xl' : ''} >Alumni</Link></li>
        <li><Link href="/opportunity" className={pathname === "/opportunity" ? 'active btn btn-success text-white rounded-2xl' : ''} >Opportunity</Link> </li>
        <li><Link href="/events" className={pathname === "/events" ? 'active btn btn-success text-white rounded-2xl' : ''} >Events</Link></li>
        <li><Link href="/experience" className={pathname === "/experience" ? 'active btn btn-success text-white rounded-2xl' : ''}>News</Link></li>
    </>

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-linear-to-r from-green-200 to-green-100 shadow-sm">
            <div className="navbar shadow-sm bg-linear-to-r from-green-200 to-green-100 text-black font-semibold px-10">

                <div className="navbar-start">

                    <a className="text-4xl text-black font-extrabold">
                        <Image width={175} height={70}
                            src="/logo.png" alt="BiExOn"></Image>
                    </a>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex flex-end">

                        <Link href="/registration" className="hidden sm:inline btn btn-success px-5 text-white font-semibold rounded-xl pt-2">
                            Get Started!
                        </Link>

                        <div className="dropdown ">
                            <div tabIndex={0} className="lg:hidden">

                                <AiOutlineMenuFold className="text-black mr-3 stroke-2" />

                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content bg-linear-to-r from-green-100 to-green-50 text-black rounded-box z-1 mt-3 w-52 p-2 shadow absolute right-1 ">
                                {links}
                            </ul>
                        </div>


                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;