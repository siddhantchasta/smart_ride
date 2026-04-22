# Smart Ride — Monthly Pickup & Drop Subscription Platform

> A full-stack subscription-based transportation platform built for daily commuters who value reliability, safety, and cost predictability.

[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)](https://www.postgresql.org)
[![TablePlus](https://img.shields.io/badge/DB%20Tool-TablePlus-orange?logo=databricks)](https://tableplus.com)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-purple?logo=render)](https://render.com)

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Core Flows](#core-flows)
- [Setup & Installation](#setup--installation)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Admin Dashboard Access](#admin-dashboard-access)
- [Key Relationships](#key-relationships)
- [Assumptions & Constraints](#assumptions--constraints)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

---

## Overview

**Smart Ride** is a subscription-based commute platform that eliminates the chaos of daily ride-hailing. Instead of booking a ride every morning and hoping for the best, users subscribe to a fixed route with a dedicated driver — ensuring a consistent, stress-free commute every single day.

| | On-Demand Ride Apps | Smart Ride |
|---|---|---|
| **Pricing** | Surge-based | Fixed monthly |
| **Driver** | Random | Dedicated |
| **Booking** | Daily | One-time subscription |
| **Availability** | Varies | Guaranteed |

---

## Problem Statement

Daily commuters face several friction points with existing ride-sharing platforms:

- **Surge pricing** during peak hours makes costs unpredictable
- **Driver unpredictability** causes safety and reliability concerns
- **Daily booking** is a repetitive hassle
- **Inconsistent availability** leads to missed schedules

**Smart Ride** solves all of these through a subscription model with fixed routes, fixed drivers, and transparent pricing.

---

## Features

| Category | Feature |
|---|---|
| **Auth** | JWT authentication + Role-based access (Admin / User) |
| **Routes** | Google Maps Geocoding API for location matching |
| **Subscriptions** | Full lifecycle management (`PENDING → ACTIVE → EXPIRED`) |
| **Payments** | Razorpay integration with HMAC signature verification |
| **Invoices** | Dynamically generated HTML invoices with public URL access |
| **Drivers** | Automated assignment engine with availability checks |
| **Admin** | Full dashboard — subscriptions, driver assignment, query handling |
| **Notifications** | Email alerts for payment success and driver assignment |
| **Support** | User query submission system visible in admin panel |

---

## System Architecture

```
           ┌──────────────────┐
           │    Frontend      │  Next.js  →  Vercel
           └────────┬─────────┘
                    │  REST API Calls
           ┌────────▼─────────┐
           │    Backend       │  Node.js + Express  →  Render
           └────────┬─────────┘
                    │  SQL Queries
           ┌────────▼─────────┐
           │   PostgreSQL     │  Supabase (Managed)
           └──────────────────┘

External Services:
  ├── Google Maps API    →  Geocoding & Route Matching
  ├── Razorpay           →  Payment Processing
  └── SendGrid           →  Email Notifications
```

---

## Core Flows

### User Journey

| Step | Action |
|---|---|
| 1 | User Login |
| 2 | Enter Pickup / Drop Location |
| 3 | Route Matching Engine |
| 4 | Select Subscription Plan |
| 5 | Payment via Razorpay |
| 6 | Invoice Generation + Email |
| 7 | Driver Assignment |
| 8 | Dashboard View (Route, Driver, Vehicle) |

### Payment Flow

| Step | Action |
|---|---|
| 1 | Create Razorpay Order |
| 2 | User Completes Payment |
| 3 | Verify HMAC Signature |
| 4 | Save to DB |
| 5 | Generate Invoice |
| 6 | Send Email |
| 7 | Trigger Driver Assignment |

### Driver Assignment Flow

| Step | Action |
|---|---|
| 1 | Subscription Created |
| 2 | Fetch Eligible Drivers |
| 3 | Check Driver Availability |
| 4 | Assign Driver — or — Add to Waiting List |

---

## Setup & Installation

### Project Structure

```bash
smart-ride/
  ├── backend/
  └── frontend/
```

### Prerequisites

Ensure the following are installed before proceeding:

- Node.js (v18+)
- npm / yarn
- PostgreSQL + `psql` CLI
- Git
- **TablePlus** - Database visualization & management  

---

### Database Setup

**1. Create the database**

```bash
# Inside psql
CREATE DATABASE smart_ride;
```

**2. Connect to the database**

```bash
psql -d smart_ride
```

**3. Enable required extension**

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

**4. Run the schema**

```bash
psql -d smart_ride -f database.sql
```

**You will be able to see the following tables in your postgres database:**

driver_routes,drivers,invoices,notifications,payments,plans,queries,route_requests,routes,subscriptions,user_locations,users,vehicles

---

### Backend Setup

**1. Install dependencies**

```bash
cd backend
npm install
```

**2. Create `.env`**

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASS=your_password
DB_NAME=smart_ride

JWT_SECRET=your_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

GOOGLE_MAPS_API_KEY=your_key

SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=verified-sender@example.com
SENDGRID_FROM_NAME=Smart Ride

BASE_URL=http://localhost:3000
```

**3. Start the server**

```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

### Frontend Setup

**1. Install dependencies**

```bash
cd frontend
npm install
```

**2. Create `.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**3. Start the app**

```bash
npm run dev
```

App runs at `http://localhost:3001`

---

## Admin Dashboard Access

To access the admin dashboard, follow these steps:

---

### Step 1: Create/Login with Your Account

* Sign up or log in using your desired email (e.g., `admin@gmail.com`) through the application.

---

### Step 2: Promote User to Admin

After logging in, update your role in the database:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE email = 'admin@demo.com';
```

---

### Step 3: Restart / Refresh

* Restart the backend server **or**
* Log out and log in again

This ensures the updated role is reflected.

---

### Step 4: Access Admin Dashboard

* Navigate to the admin panel route (e.g., `/admin`)
* You should now have full admin access

---

### ⚠️ Notes

* Only users with `role = 'ADMIN'` can access admin features
* Make sure the email matches exactly
* Do not expose admin privileges in production manually — use proper role management

---


## Key Relationships

- A **User** can have one active Subscription at a time (duplicates prevented)
- Each **Subscription** is linked to a **Route** and an assigned **Driver**
- **Payments** generate **Invoices** stored with public URL access
- **Queries** are submitted by users and visible to admins

---

## Assumptions & Constraints

### Assumptions

- Users prefer fixed schedules over flexible rides
- Drivers are available for long-term contracts
- Users will adopt subscription-based commuting

### Constraints

- City-wise transport regulations
- Peak-hour driver availability
- Traffic and route dependencies

---

## Future Enhancements

- **Driver Module** — Daily attendance tracking, earnings and payout summary
- **Mobile Apps** — Android & iOS
- **Live GPS Tracking**
- **Corporate & Bulk Subscriptions**
- **AI-based Route Optimization**
- **SOS & Emergency Features**

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Siddhant Chasta**  
IIT Kharagpur
