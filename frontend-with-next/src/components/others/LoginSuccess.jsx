"use client";

import Link from "next/link";

export default function LoginSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-200 via-green-100 to-emerald-50 px-4">
            <div className="card w-full max-w-md  bg-linear-to-r from-blue-300 via-violet-300 to-blue-400 shadow-2xl border-2 border-violet-500 rounded-3xl">
                <div className="card-body items-center text-center">

                    {/* Success Icon */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-success mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="card-title text-2xl font-extrabold">
                        Login Successful!
                    </h2>


                    {/* Buttons */}
                    <div className="card-actions flex-col w-full mt-6 gap-3">

                        <Link
                            href="/profile"
                            className="btn btn-primary w-full rounded-full"
                        >
                            Go to Your Profile
                        </Link>

                        <Link
                            href="/alumni"
                            className="btn btn-outline bg-violet-500 w-full rounded-full"
                        >
                            Alumni Directory
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}