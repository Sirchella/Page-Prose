# 📚 Page & Prose — Online Bookstore

> A full-stack web application for browsing and purchasing books online, built with **React** (frontend) and **Django** (backend), with **MTN Mobile Money** and **Orange Money** payments for Cameroon.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Security](#4-security)
5. [How to Run (Command Line)](#5-how-to-run-command-line)
6. [Deployment Strategy](#6-deployment-strategy)
7. [Open to Modifications](#7-open-to-modifications)
8. [Features — Professional App](#8-features--professional-app)
9. [API Endpoints](#9-api-endpoints)
10. [Environment Variables](#10-environment-variables)

---

## 1. Project Overview

**Page & Prose** is a professional e-commerce bookstore designed for the Cameroonian market. Customers can browse books, add them to a cart, and pay using **MTN Mobile Money** or **Orange Money** directly from their phone — no credit card required.

Store owners manage everything through a secure **Admin Dashboard**: adding books, tracking orders, viewing revenue analytics, and managing inventory — all from a single interface.

**Currency:** XAF (Central African CFA franc)  
**Payment:** Campay API (MTN MoMo + Orange Money)  
**Platform:** Web — works on mobile and desktop

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Django 6, Django REST Framework |
| Authentication | JWT (djangorestframework-simplejwt) |
| Payments | Campay API (MTN MoMo & Orange Money) |
| Database | SQLite (development) |
| CORS | django-cors-headers |
| Environment | python-dotenv |

---

## 3. Project Structure

```
Page-Prose/
│
├── frontend/                   ← React customer storefront + admin panel
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     ← All pages and UI components
│   │   │   │   ├── BrowsePage.tsx
│   │   │   │   ├── BookDetailPage.tsx
│   │   │   │   ├── CartPage.tsx
│   │   │   │   ├── CheckoutPage.tsx
│   │   │   │   ├── OrderConfirmationPage.tsx
│   │   │   │   ├── AdminLoginPage.tsx
│   │   │   │   ├── AnalyticsDashboard.tsx
│   │   │   │   ├── OrdersManagement.tsx
│   │   │   │   ├── PaymentsOverview.tsx
│   │   │   │   ├── InventoryManagement.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── api.ts          ← All API calls to backend
│   │   │   ├── App.tsx         ← Routes + protected admin routes
│   │   │   └── CartContext.tsx ← Global cart state
│   │   └── main.tsx
│   ├── package.json
│   └── README.md               ← Frontend-specific setup guide
│
├── backend/                    ← Django REST API
│   ├── books/                  ← Book model, views, serializers
│   ├── orders/                 ← Order model + Campay payment views
│   │   └── views.py            ← InitiatePaymentView, PaymentStatusView
│   ├── page_and_prose/
│   │   ├── settings.py         ← JWT, CORS, Campay config
│   │   └── urls.py             ← All API routes
│   ├── manage.py
│   └── requirements.txt
│
├── .gitignore
└── README.md                   ← You are here
```

---

## 4. Security

Security was a core requirement, not an afterthought. The following measures are implemented:

### 4.1 Admin Authentication (JWT)
- The admin panel is protected by **JSON Web Tokens (JWT)**
- Tokens are issued on login via `/api/token/` and expire automatically
- Every protected API request must include a valid `Authorization: Bearer <token>` header
- Wrong credentials return a proper error — no bypass, no defaults

### 4.2 Protected Admin Routes
- All admin URLs (`/admin/*`) are wrapped in a `ProtectedAdminRoute` component
- If a user tries to access `/admin/dashboard` without a valid token, they are **automatically redirected to the login page**
- Tokens are stored in `localStorage` and validated on every route change

### 4.3 Customer Data Safety
- **No credit card numbers are ever stored** — payments go directly through MTN / Orange via Campay
- Customer phone numbers are used only to trigger a USSD push payment and are never persisted in plain text
- The backend never logs or stores sensitive payment credentials

### 4.4 Secret Management via `.env`
- All secrets (Campay credentials, Django `SECRET_KEY`) are stored in a `.env` file
- The `.env` file is listed in `.gitignore` — **it is never committed to the repository**
- `python-dotenv` loads environment variables automatically on server start

### 4.5 CORS Protection
- The backend uses `django-cors-headers` to whitelist only known frontend origins
- Requests from unknown origins are blocked

---

## 5. How to Run (Command Line)

Everything runs from the command line. No GUI tools required.

### Prerequisites

```bash
node --version     # Must be v18 or higher
python --version   # Must be v3.10 or higher
```

### Step 1 — Clone the repository

```bash
git clone https://github.com/Sirchella/Page-Prose.git
cd Page-Prose
```

### Step 2 — Backend setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file (fill in your Campay credentials)
cp .env.example .env

# Run database migrations
python manage.py migrate

# Create admin user (first time only)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

Backend will be running at: **http://localhost:8000**

### Step 3 — Frontend setup (open a new terminal)

```bash
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

Frontend will be running at: **http://localhost:5173**

### Step 4 — Open the app

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Customer storefront |
| `http://localhost:5173/admin` | Admin panel login |
| `http://localhost:8000/api/` | REST API |

---

## 6. Deployment Strategy

### Overview

The app is split into two independently deployable parts:

```
[Customer/Admin Browser]
        │
        ▼
[Frontend — Vercel/Netlify]   ──HTTP──▶  [Backend — Railway/Render]
   React + Tailwind CSS                    Django REST API
                                                │
                                           [Campay API]
                                        MTN MoMo / Orange Money
```

### Phase 1 — Local / Demo

Run both servers locally as described in [Section 5](#5-how-to-run-command-line).  
Campay demo mode is used (capped at 25 XAF for testing).

```
CAMPAY_BASE_URL=https://demo.campay.net/api/
```

### Phase 2 — Staging / Partner Handoff

Package the project as a zip:
- Partner installs Node.js and Python
- Fills in `.env` with their Campay credentials
- Runs `npm install` + `pip install -r requirements.txt`
- Follows the README to start both servers

### Phase 3 — Production (Go Live)

**1. Switch Campay to production** — one line change in `.env`:
```
CAMPAY_BASE_URL=https://www.campay.net/api/
```

**2. Deploy the backend** (recommended: [Railway](https://railway.app) — free tier available):
```bash
# Set environment variables on Railway dashboard
CAMPAY_APP_USERNAME=...
CAMPAY_APP_PASSWORD=...
CAMPAY_BASE_URL=https://www.campay.net/api/
SECRET_KEY=your-production-secret-key
DEBUG=False
```

**3. Deploy the frontend** (recommended: [Vercel](https://vercel.com) — free):
```bash
cd frontend
npm run build        # Creates optimised production build in dist/
# Upload dist/ to Vercel or connect GitHub repo
```

**4. Update CORS** in `backend/page_and_prose/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.vercel.app",
]
```

**5. Update API URL** in `frontend/src/app/api.ts`:
```typescript
const BASE_URL = "https://your-backend.railway.app";
```

### Deployment Checklist

- [ ] `DEBUG = False` in settings
- [ ] Strong `SECRET_KEY` set in `.env`
- [ ] `CAMPAY_BASE_URL` pointing to production
- [ ] CORS updated with live frontend domain
- [ ] Frontend API URL pointing to live backend
- [ ] `python manage.py migrate` run on production database
- [ ] Admin superuser created on production server

---

## 7. Open to Modifications

The codebase is structured to make changes easy — no tangled code, no magic.

### Add a New Book (No code needed)
1. Log into the admin panel at `/admin`
2. Click **Products → Add Product**
3. Fill in title, author, price, genre, stock
4. Save — it appears in the store immediately

### Change Prices / Delivery Fees
Edit `frontend/src/app/components/CheckoutPage.tsx`:
```typescript
const DELIVERY_PRICES = {
  standard: 500,   // XAF
  express:  1000,
  nextday:  2000,
};
```

### Add a New Payment Method
1. Add a new view in `backend/orders/views.py`
2. Register the endpoint in `backend/page_and_prose/urls.py`
3. Add the UI option in `frontend/src/app/components/CheckoutPage.tsx`

### Change the Currency
All prices use a single formatting function. Find and update in any component:
```typescript
// Current pattern (XAF):
{Math.round(price).toLocaleString()} XAF

// To change to NGN for example:
{Math.round(price).toLocaleString()} NGN
```

### Add a New Admin Page
1. Create a new component in `frontend/src/app/components/`
2. Add a route in `frontend/src/app/App.tsx` under the `ProtectedAdminRoute`
3. Add a link in `frontend/src/app/components/Sidebar.tsx`

### Change Store Branding / Colors
All colors are defined using **Tailwind CSS** utility classes. The primary dark theme color (`#0f0f0f`) and accent colors can be updated across components with a simple find-and-replace.

---

## 8. Features — Professional App

### Customer Storefront
| Feature | Description |
|---------|-------------|
| Book browsing | Filter by genre, search by title/author |
| Book detail page | Description, price, stock status, add to cart |
| Shopping cart | Add/remove items, quantity control, running total |
| Checkout | 3-step: shipping → delivery → payment |
| Form validation | All fields required before proceeding to next step |
| Mobile Money payment | MTN MoMo or Orange Money via phone number |
| Payment polling | Auto-checks payment status every 5 seconds |
| Order confirmation | Summary page after successful payment |
| Fully responsive | Works on phones and desktops |

### Admin Dashboard
| Feature | Description |
|---------|-------------|
| Secure login | JWT-protected, no bypass |
| Analytics | Revenue chart, KPI cards, top-selling books |
| Orders management | View all orders, update fulfillment status |
| Payments overview | All transactions, payment method, status |
| Inventory management | Add, edit, delete books and manage stock |
| Product drawer | Edit book details inline without page reload |
| Order detail panel | Full order breakdown with customer info |
| Mobile sidebar | Collapsible drawer on small screens |

### Technical Highlights
| Feature | Implementation |
|---------|---------------|
| Authentication | JWT via `djangorestframework-simplejwt` |
| Payment polling | `setInterval` every 5s, max 2 minutes |
| Route protection | `ProtectedAdminRoute` HOC in React Router v6 |
| CORS | `django-cors-headers` whitelist |
| Environment config | `python-dotenv` + `.env` file |
| Currency | XAF, whole numbers (`Math.round`) |
| State management | React Context API (`CartContext`) |

---

## 9. API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/token/` | Admin login — returns JWT access + refresh tokens | No |
| `POST` | `/api/token/refresh/` | Refresh expired access token | No |
| `GET` | `/api/books/` | List all books | No |
| `GET` | `/api/books/<id>/` | Get single book | No |
| `POST` | `/api/books/` | Create a book | JWT |
| `PUT` | `/api/books/<id>/` | Update a book | JWT |
| `DELETE` | `/api/books/<id>/` | Delete a book | JWT |
| `GET` | `/api/orders/` | List all orders | JWT |
| `POST` | `/api/orders/` | Create an order | No |
| `PATCH` | `/api/orders/<id>/` | Update order status | JWT |
| `POST` | `/api/initiate-payment/` | Start MTN/Orange payment | No |
| `GET` | `/api/payment-status/<ref>/` | Check payment status | No |

---

## 10. Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
# Campay Mobile Money credentials
# Get yours at https://campay.net
CAMPAY_APP_USERNAME=your_campay_username
CAMPAY_APP_PASSWORD=your_campay_password

# Use demo for testing, production when going live
CAMPAY_BASE_URL=https://demo.campay.net/api/
# CAMPAY_BASE_URL=https://www.campay.net/api/   ← uncomment for production

# Django secret key — change this in production!
SECRET_KEY=your-very-long-random-secret-key
```

> **Never commit `.env` to version control.** It is already listed in `.gitignore`.

---

## Troubleshooting

| Problem | Solution |
|---------|---------|
| `CORS error` in browser | Make sure Django is running on port 8000; check `CORS_ALLOWED_ORIGINS` in `settings.py` |
| `400 Bad Request` from Campay | Check `.env` credentials; demo mode caps payments at 25 XAF |
| Admin login not working | Run `python manage.py createsuperuser` to create an account |
| Frontend can't reach backend | Confirm Django server is running: `python manage.py runserver` |
| `Module not found` (npm) | Run `npm install` inside the `frontend/` folder |
| `ModuleNotFoundError` (Python) | Run `pip install -r requirements.txt` inside `backend/` folder |

---

## License

This project was built as part of an academic project at **ICT University, Cameroon**.

---

*Built with React, Django, Tailwind CSS, and Campay Mobile Money — for Cameroon.*
