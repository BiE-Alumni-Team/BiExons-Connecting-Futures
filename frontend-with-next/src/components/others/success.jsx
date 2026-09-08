"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Success = ({ setIsLogin, setisSuccess }) => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">

            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center">

                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-9 h-9 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        Registration Successful!
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed mb-6">
                        Your account has been successfully created.
                        Welcome to our alumni community!
                    </p>

                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-7">
                        <p className="text-sm text-green-700">
                            🎉 You can now log in and explore the alumni network.
                        </p>
                    </div>

                    {/* Login Button */}
                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(true)
                                setisSuccess(false)
                            }}
                            className=" w-full btn btn-success text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
                        >
                            Continue to Login
                        </button>

                        {/* Home Button */}
                        <Link href="/alumni"
                            className="w-full mt-3 py-3 text-gray-500 hover:text-green-600 font-medium transition"
                        >
                            Explore Directory
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-gray-400 mt-5">
                        Thank you for joining our community ❤️
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Success;
