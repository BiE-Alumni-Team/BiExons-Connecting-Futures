'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";

const Navbar = () => {

    const pathname = usePathname();

    const links = <>
        <li><Link href="/" className={pathname === "/" ? 'active bg-black text-white' : ''}>Home</Link></li>
        <li><Link href="/alumni" className={pathname === "/alumni" ? 'active bg-black text-white' : ''} >Alumni</Link></li>
        <li><Link href="/opportunity" className={pathname === "/opportunity" ? 'active bg-black text-white' : ''} >Opportunity</Link> </li>
        <li><Link href="/events" className={pathname === "/events" ? 'active bg-black text-white' : ''} >Events</Link></li>
        <li><Link href="/experience" className={pathname === "/experience" ? 'active bg-black text-white' : ''}>News</Link></li>
    </>

    return (
        <div className="navbar shadow-sm bg-linear-to-r from-green-200 to-green-100 text-black font-semibold px-10">

            <div className="navbar-start">

                <div className="dropdown">
                    <div tabIndex={0} className="lg:hidden">

                        <AiOutlineMenuFold className="text-black mr-3 stroke-2" />

                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-linear-to-r from-green-200 to-green-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow ">
                        {links}
                    </ul>
                </div>

                <a className="text-4xl text-black font-extrabold">BiExON</a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Link href="/registration" className="btn btn-error px-5">
                    Join!
                </Link>
            </div>
        </div>
    );
};

export default Navbar;