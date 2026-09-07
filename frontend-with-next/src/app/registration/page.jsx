"use client";
import Id from "@/components/formcomp/Id";
import Moblie from "@/components/formcomp/Moblie";
import Name from "@/components/formcomp/Name";
import Reg from "@/components/formcomp/Reg";
import Session from "@/components/formcomp/Session";
import { useInputFields } from "@/components/hooks/useInputFields";
import LoginSuccess from "@/components/others/LoginSuccess";
import Success from "@/components/others/success";
import { loginUser, registerUser, validateLogin } from "@/service/authApi";
import { validateRegistration } from "@/service/control";
import { useState } from "react";


const AuthForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isSuccess, setisSuccess] = useState(false);
    const [loginsucces, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState("");

    const [name, nameOnChange, resetName] = useInputFields("");
    const [email, emailOnChange, resetEmail] = useInputFields("");
    const [id, idOnchange, resetId] = useInputFields("");
    const [reg, regOnchange, resetReg] = useInputFields("");
    const [session, sessionOnchange, resetSession] = useInputFields("");
    const [mobile, mobileOnchange, resetMobile] = useInputFields("");
    const [password, passwordOnChange, resetPassword] = useInputFields("");
    const [confirmpassword, confirmpasswordOnchange, resetConfirmPassword] = useInputFields("");
    const [username, usernameOnchange, resetUsername] = useInputFields("");

    const registrationAlumni = {
        "username": name,
        "email": email,
        "reg_no": reg,
        "id_no": id,
        "session": session,
        "phone": mobile,
        "password": password
    }

    const loginAlumni = {
        "username": username,
        "password": password
    }

    const {
        passwordValid,
        confirmPasswordValid,
        phoneValid,
        registrationValid,
    } = validateRegistration({
        password,
        confirmpassword,
        mobile,
    });

    const loginValid = validateLogin({
        username,
        password,
    });

    const resetLoginForm = () => {
        resetUsername();
        resetPassword();
    };

    const resetRegistrationForm = () => {
        resetName();
        resetEmail();
        resetId();
        resetReg();
        resetSession();
        resetMobile();
        resetPassword();
        resetConfirmPassword();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            checkReg(registrationAlumni);
            registerUser(registrationAlumni);

            setisSuccess(true);
            resetRegistrationForm();
        } else {
            try {
                const data = await loginUser(loginAlumni);

                // Only runs when backend authentication succeeds
                console.log("Login successful:", data);

                setLoginSuccess(true);
                resetLoginForm();

            } catch (error) {
                console.error("Login failed:", error);

                // Show backend error to user
                setLoginError(error.message);
            }
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
        <div>

            {
                isSuccess ?
                    <Success /> :
                    loginsucces ?
                        <LoginSuccess />
                        :
                        <div id="form" className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4 py-10">

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
                                        onClick={() => {
                                            resetRegistrationForm();
                                            setIsLogin(true);
                                        }}
                                        className={`rounded-md py-2.5 text-sm font-medium transition ${isLogin
                                            ? "bg-white text-green-700 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        Sign In
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetLoginForm();
                                            setIsLogin(false);
                                        }}
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
                                            <Name name={name} nameOnChange={nameOnChange} />

                                            {/* Student ID */}
                                            <Id id={id}
                                                idOnchange={idOnchange} />

                                            {/* Registration Number */}
                                            <Reg reg={reg}
                                                regOnchange={regOnchange} />

                                            {/* session */}

                                            <Session session={session}
                                                sessionOnchange={sessionOnchange} />

                                            {/* Mobile */}
                                            <Moblie mobile={mobile}
                                                mobileOnchange={mobileOnchange}
                                                phoneValid={phoneValid}
                                            />
                                        </>
                                    )}

                                    {/* Email */
                                        !isLogin && (
                                            emailinput
                                        )
                                    }

                                    {/** user name */}
                                    {
                                        isLogin && (

                                            <div>
                                                <label
                                                    htmlFor="username"
                                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                                >
                                                    Username
                                                </label>

                                                <input
                                                    id="username"
                                                    name="username"
                                                    defaultValue={username}
                                                    type="text"
                                                    placeholder="Enter your user name"
                                                    required
                                                    onChange={usernameOnchange}
                                                    className={`w-full rounded-lg border border-gray-300
                         px-4 py-3 text-sm outline-none
                         transition
                         focus:border-green-600
                         focus:ring-2 focus:ring-green-100 
                         `}
                                                />
                                            </div>

                                        )
                                    }
                                    {/* password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-1.5 block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>

                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                value={password}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                required
                                                onChange={passwordOnChange}
                                                className={`w-full rounded-lg border border-gray-300
            px-4 py-3 pr-16 text-sm outline-none
            transition
            focus:border-green-600
            focus:ring-2 focus:ring-green-100`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2
                   text-sm text-gray-600 hover:text-green-600"
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>

                                        {/* Password validation */}
                                        {password.length > 0 && !passwordValid && (
                                            <p className="mt-1 text-sm text-red-500">
                                                Password must be at least 8 characters.
                                            </p>
                                        )}
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
                                            {confirmpassword.length > 0 && !confirmPasswordValid && (
                                                <p className="text-sm text-red-500">
                                                    Passwords do not match.
                                                </p>
                                            )}
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
                                        disabled={
                                            isLogin
                                                ? !loginValid
                                                : !registrationValid
                                        }
                                        className={`w-full rounded-lg py-3 font-semibold  text-white transition
                                         focus:outline-none focus:ring-2
                                         ${(isLogin && !loginValid) ||
                                                (!isLogin && !registrationValid)
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-green-700 hover:bg-green-800 focus:ring-green-300"
                                            }`}
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
                                                onClick={() => {
                                                    resetRegistrationForm();
                                                    setIsLogin(true);
                                                }}
                                                className="font-semibold text-green-700 hover:underline"
                                            >
                                                Sign In
                                            </button>
                                        </>
                                    )}
                                </p>

                            </div>

                        </div>
            }

        </div>
    );
};

export default AuthForm;