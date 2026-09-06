"use client";

import useInputFields from "@/components/hooks/useInputFields";
import { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [name, nameOnChange] = useInputFields("");
    const [email, emailOnChange] = useInputFields("");
    const [id, idOnchange] = useInputFields("");
    const [reg, regOnchange] = useInputFields("");
    const [mobile, mobileOnchange] = useInputFields("");
    const [password, passwordOnChange] = useInputFields("");
    const [confirmpassword, confirmpasswordOnchange] = useInputFields("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("email", name);
        console.log("pass", password);

        if (!isLogin) {
            console.log("email", email);
            console.log("Student Id", id);
            console.log("Registration", reg);
            console.log("Mobile", mobile);
            console.log("conpass", confirmpassword)
        }
    };

    const emailinput = <div>
        <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
        >
            Email Address
        </label>

        <input
            id="email"
            name="email"
            type="email"
            defaultValue={email}
            placeholder="example@email.com"
            onChange={emailOnChange}
            required
            className={`w-full rounded-lg border border-gray-300
                         px-4 py-3 text-sm outline-none
                         transition
                         focus:border-green-600
                         focus:ring-2 focus:ring-green-100`}
        />
    </div>

    return (
        <div className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {isLogin
                            ? "Login to your BiE Alumni account"
                            : "Register for the BiE Alumni Network"}
                    </p>
                </div>

                {/* Login / Register Toggle */}
                <div className="mb-7 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`rounded-md py-2.5 text-sm font-medium transition ${isLogin
                            ? "bg-white text-green-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`rounded-md py-2.5 text-sm font-medium transition ${!isLogin
                            ? "bg-white text-green-700 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Registration Fields */}
                    {!isLogin && (
                        <>
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    defaultValue={name}
                                    type="text"
                                    placeholder="Enter your full name"
                                    required onChange={nameOnChange}
                                    className="w-full rounded-lg border border-gray-300
                                    px-4 py-3 text-sm outline-none transition
                                   focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Student ID */}
                            <div>
                                <label
                                    htmlFor="studentId"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Student ID
                                </label>

                                <input
                                    id="studentId"
                                    name="studentId"
                                    defaultValue={id}
                                    type="text"
                                    placeholder="Enter your student ID"
                                    required onChange={idOnchange}
                                    className="w-full rounded-lg border border-gray-300
                             px-4 py-3 text-sm outline-none
                             transition
                             focus:border-green-600
                             focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Registration Number */}
                            <div>
                                <label
                                    htmlFor="registrationNo"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Registration No.
                                </label>

                                <input
                                    id="registrationNo"
                                    name="registrationNo"
                                    defaultValue={reg}
                                    type="text"
                                    placeholder="Enter registration number"
                                    required onChange={regOnchange}
                                    className="w-full rounded-lg border border-gray-300
                             px-4 py-3 text-sm outline-none
                             transition
                             focus:border-green-600
                             focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            {/* Mobile */}
                            <div>
                                <label
                                    htmlFor="mobile"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Mobile Number
                                </label>

                                <input
                                    id="mobile"
                                    name="mobile"
                                    defaultValue={mobile}
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    required onChange={mobileOnchange}
                                    className="w-full rounded-lg border border-gray-300
                             px-4 py-3 text-sm outline-none
                             transition
                             focus:border-green-600
                             focus:ring-2 focus:ring-green-100"
                                />
                            </div>
                        </>
                    )}

                    {/* Email */
                        emailinput
                    }


                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            defaultValue={password}
                            type="password"
                            placeholder="Enter your password"
                            required
                            onChange={passwordOnChange}
                            className={`w-full rounded-lg border border-gray-300
                         px-4 py-3 text-sm outline-none
                         transition
                         focus:border-green-600
                         focus:ring-2 focus:ring-green-100`}
                        />
                    </div>

                    {/* Confirm Password */}
                    {!isLogin && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                defaultValue={confirmpassword}
                                type="password"
                                placeholder="Confirm your password"
                                required onChange={confirmpasswordOnchange}
                                className={`w-full rounded-lg border border-gray-300
                           px-4 py-3 text-sm outline-none
                           transition
                           focus:border-green-600
                           focus:ring-2 focus:ring-green-100`}
                            />
                        </div>
                    )}

                    {/* Forgot Password */}
                    {isLogin && (
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm font-medium text-green-700 hover:text-green-800"
                            >
                                Forgot password?
                            </a>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className={`w-full rounded-lg bg-green-700 py-3
                       font-semibold text-white
                       transition hover:bg-green-800
                       focus:outline-none focus:ring-2
                       focus:ring-green-300`}
                    >
                        {isLogin ? "Sign In" : "Create Account"}
                    </button>

                </form>

                {/* Bottom */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className={`font-semibold text-green-700 hover:underline`}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className="font-semibold text-green-700 hover:underline"
                            >
                                Sign In
                            </button>
                        </>
                    )}
                </p>

            </div>
        </div>
    );
};

export default AuthForm;