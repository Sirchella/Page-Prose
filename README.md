<div align="center">

# 📖 Page & Prose

### A full-stack online bookstore built for Cameroon

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-092E20?style=flat-square&logo=django&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Browse books · Pay with Mobile Money · Manage everything from an admin dashboard**

</div>

---

## ✨ What is Page & Prose?

Page & Prose is a complete bookstore web application. Customers browse and buy books online and pay with **MTN Mobile Money** or **Orange Money** — no card required. Admins manage inventory, track orders, and monitor sales through a dedicated dashboard.

---

## 🗂 Project Structure

```
page-and-prose/
├── backend/          ← Django REST API (Python)
│   ├── books/        ← Books app (models, views, serializers)
│   ├── orders/       ← Orders app + payment integration
│   └── page_and_prose/  ← Django project settings & URLs
│
└── frontend/         ← React + Vite (TypeScript)
    └── src/
        └── app/
            ├── components/   ← All pages and UI components
            ├── api.ts        ← All API calls in one place
            └── CartContext.tsx
```

---

## ⚙️ Requirements

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org) |
| **Python** | v3.10 or higher | [python.org](https://python.org) |
| **pip** | comes with Python | — |

---

## 🚀 Getting Started

### 1 — Clone the repository

```bash
git clone https://github.com/Sirchella/Page-Prose.git
cd Page-Prose
```

---

### 2 — Backend Setup (Django)

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
# Campay Mobile Money (get credentials at campay.net)
CAMPAY_APP_USERNAME=your_campay_username
CAMPAY_APP_PASSWORD=your_campay_password
CAMPAY_BASE_URL=https://demo.campay.net/api/

# Optional — transactional emails via Resend (resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=orders@yourdomain.com

# Production only
# SECRET_KEY=your-long-random-secret-key
# DEBUG=False
# ALLOWED_HOSTS=yourdomain.com,your-railway-app.up.railway.app
```

Run migrations and create your admin account:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

> **Backend is now running at** → `http://localhost:8000`

---

### 3 — Frontend Setup (React)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

> **App is now running at** → `http://localhost:5173`

---

## 🛍️ Using the App

### Customer Storefront — `http://localhost:5173`

- Browse **85 books** across **14 genres** (African Literature, Fiction, Mystery & Thriller, Romance, and more)
- All prices in **XAF** (Central African CFA franc)
- Filter by genre, price range, format, and availability
- Add books to cart and checkout in 3 steps:
  1. Enter shipping address
  2. Choose delivery method (Standard / Express / Next Day)
  3. Pay with **MTN MoMo** or **Orange Money** — enter your Cameroonian number and confirm on your phone

---

### Admin Dashboard — `http://localhost:5173/admin`

Log in with the superuser account you created.

| Section | What you can do |
|---------|----------------|
| **Analytics** | View sales charts, revenue, and top books |
| **Products** | Add, edit, and delete books; upload cover images |
| **Inventory** | Monitor and update stock levels |
| **Orders** | Track orders from Pending → Confirmed → Packing → Shipped → Delivered |
| **Order Pipeline** | Kanban-style view for managing fulfilment |
| **Payments** | Overview of all transactions |
| **Email** | Configure and test transactional emails |
| **Settings** | Manage shipping zones, tax, and promotions |

---

## 🔒 Security

- **JWT authentication** — admin sessions use short-lived access tokens
- **Campay payment processing** — we never handle money directly; Campay is a licensed processor
- **Environment variables** — all credentials (API keys, secrets) stored in `.env`, never committed to git
- **CORS protection** — only whitelisted origins can call the API

---

## 🌍 Deployment

The app is designed to deploy with zero configuration changes:

| Part | Platform | Notes |
|------|----------|-------|
| Backend | **Railway** | Auto-deploys from `main` branch; uses `railway.json` start script |
| Frontend | **Vercel** | Auto-deploys on push; set `VITE_API_URL` to your Railway backend URL |

### Steps to go live

1. Push code to GitHub
2. Connect your repo to **Railway** (backend) and **Vercel** (frontend)
3. Add environment variables in each platform's dashboard
4. Set `CAMPAY_BASE_URL=https://www.campay.net/api/` for real payments
5. Set `DEBUG=False` and a strong `SECRET_KEY` on Railway

---

## 📦 Carrying Over Data

The database lives in `backend/db.sqlite3`.

- **Moving machines?** Copy `db.sqlite3` to keep all books, orders, and history
- **Fresh start?** Delete it — migrations will recreate an empty database
- `db.sqlite3` is in `.gitignore` and is never pushed to GitHub

---

## 🛠 Troubleshooting

| Problem | Fix |
|---------|-----|
| Frontend can't reach backend | Make sure Django is running on port 8000 |
| CORS error | Add your frontend URL to `CORS_ALLOWED_ORIGINS` in `settings.py` |
| Payment fails | Check `.env` credentials; phone must be in format `237XXXXXXXXX` |
| Admin login fails | Run `python manage.py createsuperuser` inside `backend/` |
| Books not showing | Make sure the Django server is running |
| Port already in use | Kill the process on that port or use a different one |
| Images not loading in production | Set `VITE_API_URL` in Vercel to your Railway backend URL |

---

## 💱 Currency

All prices are in **XAF** — Central African CFA franc (Cameroon).

---

<div align="center">

*Built with React, Django, Tailwind CSS, and Campay Mobile Money*

</div>
