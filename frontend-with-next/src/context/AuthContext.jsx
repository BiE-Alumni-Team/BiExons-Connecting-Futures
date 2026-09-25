"use client";

import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loginsucces, setLoginSuccess] = useState(false);

    const [loading, setLoading] = useState(true);

    // Check localStorage
    if (typeof window !== "undefined" && loading) {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (accessToken || refreshToken) {
            setLoginSuccess(true);
        }

        setLoading(false);
    }

    return (
        <AuthContext.Provider
            value={{
                loginsucces,
                setLoginSuccess,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}