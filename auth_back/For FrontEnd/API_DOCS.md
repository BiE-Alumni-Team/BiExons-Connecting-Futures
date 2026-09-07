# Alumni Networking System — Auth API Documentation

Backend: Django + Django REST Framework + JWT (SimpleJWT)
Database: PostgreSQL (Neon, cloud-hosted)

## Base URL (Live — Deployed)

```
https://biexons-backend.onrender.com
```

> The backend is now deployed and running 24/7 — you don't need anyone to keep a local server running.
>
> **Note on free hosting:** This is hosted on Render's free tier. If the API hasn't been called in the last 15 minutes, the server "sleeps" and the **first** request after that can take 30–50 seconds to respond while it wakes up. This is normal — just show a loading state and it will speed up after the first call.

---

## 1. Register a new user

```
POST /api/accounts/register/
Content-Type: application/json
```

### Request Body

| Field      | Type   | Required | Notes                                  |
|------------|--------|----------|-----------------------------------------|
| username   | string | Yes      | Letters, digits, and @/./+/-/_ only     |
| email      | string | Yes      | Valid email format                      |
| reg_no     | string | Yes      | Must be unique                          |
| id_no      | string | Yes      | Must be unique                          |
| session    | string | Yes      | e.g. "2023-24"                          |
| phone      | string | No       | Optional                                |
| password   | string | Yes      | Minimum 8 characters                    |

### Example Request

```json
{
    "username": "jarif_ayman",
    "email": "jarif@example.com",
    "reg_no": "58965",
    "id_no": "2409001",
    "session": "2023-24",
    "phone": "01700000000",
    "password": "strongpass123"
}
```

### Success Response — 201 Created

```json
{
    "id": 2,
    "username": "jarif_ayman",
    "email": "jarif@example.com",
    "reg_no": "58965",
    "id_no": "2409001",
    "session": "2023-24",
    "phone": "01700000000"
}
```

### Error Response — 400 Bad Request

```json
{
    "reg_no": ["user with this reg no already exists."],
    "password": ["This password is too short. It must contain at least 8 characters."]
}
```
Show these field-specific messages under the corresponding form field.

---

## 2. Login (Get JWT Tokens)

```
POST /api/token/
Content-Type: application/json
```

### Request Body

```json
{
    "username": "jarif_ayman",
    "password": "strongpass123"
}
```

### Success Response — 200 OK

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Store both tokens (e.g. in `localStorage`).
> `access` token expires in ~5 minutes (default). Use `refresh` to get a new one (see endpoint 4).

### Error Response — 401 Unauthorized

```json
{
    "detail": "No active account found with the given credentials"
}
```

---

## 3. Get Logged-in User's Profile (Protected)

```
GET /api/accounts/profile/
Authorization: Bearer <access_token>
```

### Success Response — 200 OK

```json
{
    "id": 2,
    "username": "jarif_ayman",
    "email": "jarif@example.com",
    "reg_no": "58965",
    "id_no": "2409001",
    "session": "2023-24",
    "phone": "01700000000",
    "workplace": null,
    "designation": null,
    "profile_photo": null,
    "is_verified": false
}
```

### Error Response — 401 Unauthorized

```json
{
    "detail": "Given token not valid for any token type",
    "code": "token_not_valid",
    "messages": [
        {
            "token_class": "AccessToken",
            "token_type": "access",
            "message": "Token is expired"
        }
    ]
}
```
This means the access token expired — call endpoint 4 to refresh it, then retry.

---

## 4. Refresh an Expired Access Token

```
POST /api/token/refresh/
Content-Type: application/json
```

### Request Body

```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Success Response — 200 OK

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

If this also fails (refresh token expired), the user must log in again.

---

## General Notes for Frontend

1. **CORS**: The backend allows requests from `http://localhost:3000` and `http://127.0.0.1:3000` by default.
   If your dev server runs on a different port (e.g. Vite's `5173`), **tell the backend developer** so it can be added.

2. **Auth header format**: Always `Bearer <token>` — note the space after "Bearer".

3. **Password field**: Only one `password` field is expected by the backend. If you have a "confirm password" field in your UI, validate that client-side only — don't send it to the API.

4. **Trailing slashes matter**: All endpoints end with `/` (e.g. `/api/accounts/register/`, not `/api/accounts/register`).

5. **Content-Type**: Always send `Content-Type: application/json` when sending JSON bodies.
