// authApi.js
// Drop this file into your React project (e.g. src/api/authApi.js)
// and import the functions you need in your components.

const BASE_URL = "http://127.0.0.1:8000"; // update when backend is deployed

// ---------- 1. Register ----------
export async function registerUser({
  username,
  email,
  reg_no,
  id_no,
  session,
  phone,
  password,
}) {
  const response = await fetch(`${BASE_URL}/api/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
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
export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  // Save tokens for later authenticated requests
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  return data;
}

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
