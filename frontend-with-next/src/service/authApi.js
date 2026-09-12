// authApi.js
// Drop this file into your React project (e.g. src/api/authApi.js)
// and import the functions you need in your components.

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://biexons-backend.onrender.com";

// Note: this is hosted on Render's free tier. If idle for 15+ minutes, the
// server "sleeps" and the first request after that can take 30-50 seconds
// to wake up. Show a loading indicator on first load / first login attempt.
//
// Next.js setup: add this to .env.local in the project root:
//   NEXT_PUBLIC_API_BASE_URL=https://biexons-backend.onrender.com
// (Must be prefixed with NEXT_PUBLIC_ to be readable in the browser.)

// ---------- 1. Register ----------
export const registerUser = async ({
  first_name,
  last_name,
  email,
  reg_no,
  id_no,
  session,
  phone,
  password,
}) => {
  const response = await fetch(`${BASE_URL}/api/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      reg_no,
      id_no,
      session,
      phone,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // data will contain field-specific error messages, e.g. { reg_no: [...] }
    throw data;
  }

  return data; // newly created user object
}

// ---------- 2. Login ----------

// Backend login
export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const contentType = response.headers.get("content-type");

  let data;

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = { detail: text };
  }

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.error ||
      `Login failed (${response.status})`
    );
  }

  return data;
};
// ---------- 3. Get Profile (protected) ----------
export async function getProfile() {
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
export async function refreshAccessToken() {
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

// ---------- 5. Logout (client-side only) ----------
export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
