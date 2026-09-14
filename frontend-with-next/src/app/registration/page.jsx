"use client";
import Id from "@/components/formcomp/Id";
import Moblie from "@/components/formcomp/Moblie";
import Name from "@/components/formcomp/Name";
import Reg from "@/components/formcomp/Reg";
import Session from "@/components/formcomp/Session";
import { useInputFields } from "@/components/hooks/useInputFields";
import Loading from "@/components/others/Loading";
import LoginSuccess from "@/components/others/LoginSuccess";
import Success from "@/components/others/success";
import { loginUser, registerUser } from "@/service/authApi";
import { validateRegistration, validateLogin } from "@/service/control";
import { useState } from "react";
import { toast } from "react-toastify";


const AuthForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [loginsucces, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState("");
    const [regerror, setregError] = useState("");

    const [name, nameOnChange, resetName] = useInputFields("");
    const [lastname, lastnameOnChange, resetlastName] = useInputFields("");
    const [email, emailOnChange, resetEmail] = useInputFields("");
    const [id, idOnchange, resetId] = useInputFields("");
    const [reg, regOnchange, resetReg] = useInputFields("");
    const [session, sessionOnchange, resetSession] = useInputFields("");
    const [mobile, mobileOnchange, resetMobile] = useInputFields("");
    const [password, passwordOnChange, resetPassword] = useInputFields("");
    const [confirmpassword, confirmpasswordOnchange, resetConfirmPassword] = useInputFields("");
    const [username, usernameOnchange, resetUsername] = useInputFields("");

    const registrationAlumni = {
        "first_name": name,
        "last_name": lastname,
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
        resetlastName();
        resetEmail();
        resetId();
        resetReg();
        resetSession();
        resetMobile();
        resetPassword();
        resetConfirmPassword();
    };

    validateRegistration(registrationAlumni);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            setIsLoading(true)
            try {

                setregError("");
                // Wait for backend response
                const data = await registerUser(registrationAlumni);

                setisSuccess(true);
                resetRegistrationForm();

            } catch (error) {
                setregError("Something went wrong. Please try again later.");
                toast.error(regerror)
            }
            setIsLoading(false)
        }

        else {
            setIsLoading(true);

            try {
                const data = await loginUser(username, password);

                if (data?.access && data?.refresh) {
                    // Login successful
                    setLoginSuccess(true);
                    setLoginError("");
                    resetLoginForm();
                } else {
                    // No tokens returned
                    setLoginSuccess(false);
                    setLoginError("Username or password is incorrect");
                }

            } catch (error) {
                // Backend rejected login
                setLoginSuccess(false);
                setLoginError("Username or password is incorrect");
                setIsLoading(false);
            }
        }
    }

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
            value={email}
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
                isLoading ? <Loading text="Searching..." /> :
                    isSuccess ?
                        <Success setIsLogin={setIsLogin} setisSuccess={setisSuccess} /> :
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
                                                <Name name={name} nameOnChange={nameOnChange}
                                                    lastname={lastname} lastnameOnChange={lastnameOnChange} />

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

                                        {/** user name email */}
                                        {
                                            isLogin && (

                                                <div>
                                                    <label
                                                        htmlFor="username"
                                                        className="mb-1.5 block text-sm font-medium text-gray-700"
                                                    >
                                                        e-mail
                                                    </label>

                                                    <input
                                                        id="username"
                                                        name="username"
                                                        value={username}
                                                        type="email"
                                                        placeholder="Enter your email"
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
                                                    className={`absolute right-3 top-1/2 -translate-y-1/2
                   text-sm text-gray-600 hover:text-green-600`}
                                                >
                                                    {showPassword ? (
                                                        // Eye slash
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.09A9.77 9.77 0 0112 4.8c5 0 8.27 4.5 9 7.2a11.7 11.7 0 01-2.07 3.83M6.61 6.61C4.96 7.74 3.72 9.31 3 12c.73 2.7 4 7.2 9 7.2 1.61 0 3.02-.38 4.23-1"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        // Eye
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12 18 19.5 12 19.5 2.25 12 2.25 12z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>

                                            {isLogin && loginError && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {loginError}
                                                </p>
                                            )}

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

                                                <div className="relative">
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={confirmpassword}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your password"
                                                        required
                                                        onChange={confirmpasswordOnchange}
                                                        className="w-full rounded-lg border border-gray-300
                   px-4 py-3 pr-12 text-sm outline-none
                   transition
                   focus:border-green-600
                   focus:ring-2 focus:ring-green-100"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-gray-500 hover:text-gray-700"
                                                        aria-label={
                                                            showConfirmPassword
                                                                ? "Hide confirm password"
                                                                : "Show confirm password"
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            // Eye slash
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.09A9.77 9.77 0 0112 4.8c5 0 8.27 4.5 9 7.2a11.7 11.7 0 01-2.07 3.83M6.61 6.61C4.96 7.74 3.72 9.31 3 12c.73 2.7 4 7.2 9 7.2 1.61 0 3.02-.38 4.23-1"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            // Eye
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12 18 19.5 12 19.5 2.25 12 2.25 12z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>

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
                                         focus:outline-none focus:ring-2 cursor-pointer 
                                         hover:border-2 border-violet-500
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