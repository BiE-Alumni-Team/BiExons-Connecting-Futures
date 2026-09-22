"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loginsucces, setLoginSuccess] = useState(false);

    return (
        <AuthContext.Provider value={{ loginsucces, setLoginSuccess }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}