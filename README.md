# Rate Limited File Uploader API

A lightweight REST API built with **Node.js** and **Express** that accepts `.txt` and `.csv` file uploads, enforces per-IP rate limiting, and returns file metadata including a word count.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Rate Limiting](#rate-limiting)
- [Error Responses](#error-responses)
- [Swagger UI](#swagger-ui)

---

## Features

- **File upload** via `multipart/form-data` — `.txt` and `.csv` only, max **5 MB**
- **Rate limiting** — max **5 uploads per minute** per IP; responds with `429` and a `Retry-After` header when exceeded
- **File analysis** — returns file name, size in bytes, and total word count
- **Swagger UI** — interactive API explorer included out of the box
- **No database** — stateless and fast; rate limit state is held in-memory

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| File uploads | Multer 2 (memory storage) |
| API Docs | swagger-jsdoc + swagger-ui-express |
| Dev server | nodemon |

---

## Project Structure

```
appointment_booking_system/
├── App.js                            # Entry point — Express setup, Swagger mount
├── package.json
├── .env
└── API/
    ├── config/
    │   └── swagger.js                # OpenAPI 3.0 spec
    ├── middleware/
    │   ├── rateLimiter.js            # In-memory sliding-window rate limiter
    │   └── multerConfig.js           # Multer setup (memory storage, file filter)
    ├── upload/
    │   ├── upload.routes.js          # POST /api/upload
    │   ├── upload.controller.js      # HTTP handler
    │   └── upload.service.js         # Word count + file metadata extraction
    └── Routes/
        └── App_routes.js             # Root router
```

---

## Getting Started

### Prerequisites

- Node.js >= 18

### Install & run

```bash
git clone <repo-url>
cd appointment_booking_system
npm install

# Development (auto-reload)
npm run dev

# Production
npm start
```

The server starts on `http://localhost:3000` by default.

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |

---

## API Reference

### `POST /api/upload`

Upload a single `.txt` or `.csv` file.

**Request** — `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | file | Yes | The `.txt` or `.csv` file (max 5 MB) |

**Example — curl**

```bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@report.csv"
```

**Response `200 OK`**

```json
{
  "name": "report.csv",
  "sizeBytes": 2048,
  "wordCount": 312
}
```

| Field | Type | Description |
|---|---|---|
| `name` | string | Original file name |
| `sizeBytes` | integer | File size in bytes |
| `wordCount` | integer | Total number of whitespace-delimited words |

---

## Rate Limiting

Each IP address may upload a maximum of **5 files per minute**.

When the limit is exceeded the API responds with:

```
HTTP 429 Too Many Requests
Retry-After: 42
```

```json
{
  "message": "Rate limit exceeded. Maximum 5 uploads per minute.",
  "retryAfter": "42s"
}
```

The window resets automatically after 60 seconds.

---

## Error Responses

| Status | Cause |
|---|---|
| `400` | No file provided, unsupported file type (not `.txt`/`.csv`), or malformed request |
| `413` | File exceeds the 5 MB size limit |
| `429` | Rate limit exceeded for this IP |

**Example — wrong file type**

```json
{
  "message": "Only .txt and .csv files are allowed"
}
```

**Example — file too large**

```json
{
  "message": "File too large. Maximum allowed size is 5 MB."
}
```

---

## Swagger UI

Start the server and open:

```
http://localhost:3000/api-docs
```

Use the **POST /upload** form to pick a file and try the endpoint directly in the browser.
