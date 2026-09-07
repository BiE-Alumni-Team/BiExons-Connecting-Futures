
// information check -----

export const checkInfo = ({ password, phone, }) => {

    if (password.length < 8) {
        alert("password must be longer or equal than 8")
    }

    if (!phone.startsWith("01") || phone.length != 11) {
        alert("mobile must be start with 01 and will 11 digit")
    }
}


// -----------registration -------------
export const registerAlumni = async (alumniDta) => {

    try {

        const respons = await fetch(`${API_URL}/register/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(alumniDta),
            }

        );

        const data = await respons.json();

        if (!respons.ok) {
            throw new Error(data.message) || "Ragistration Faild"
        }

        return data;

    }
    catch (error) {
        console.error("API Error", error);
        throw error;
    }
};


// ------------Login ------------
export const loginUser = async (loginData) => {
    const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    return data;
};


// ---------- 3. Get Profile (protected) ----------
export const getProfile = async () => {
    const token = localStorage.getItem("access_token");

    let response = await fetch(`${BASE_URL}/api/accounts/profile/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    // If access token expired, try refreshing once and retry
    if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            response = await fetch(`${BASE_URL}/api/accounts/profile/`, {
                method: "GET",
                headers: { Authorization: `Bearer ${refreshed}` },
            });
        }
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

// ---------- 4. Refresh Access Token ----------
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
        // refresh token itself expired — user must log in again
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    return data.access;
}


// -----log out------

export const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}