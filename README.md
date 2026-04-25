# Page & Prose — Bookstore Web App

A full-stack bookstore application with a customer storefront and admin dashboard.
Payments are processed via **Campay** (MTN Mobile Money & Orange Money — Cameroon).

---

## Project Structure

```
page-and-prose/
├── backend/        ← Django REST API
└── frontend/       ← React + Vite frontend (this folder)
```

---

## Requirements

Make sure the following are installed on the machine:

| Tool    | Version          | Download                |
|---------|------------------|-------------------------|
| Node.js | v18 or higher    | https://nodejs.org      |
| Python  | v3.10 or higher  | https://python.org      |
| pip     | comes with Python | —                      |

---

## 1. Backend Setup (Django)

### Step 1 — Navigate to the backend folder
```bash
cd backend
```

### Step 2 — Install Python dependencies
```bash
pip install -r requirements.txt
```

### Step 3 — Create the `.env` file
Create a file called `.env` inside `backend/` with the following content:

```
CAMPAY_APP_USERNAME=your_campay_username_here
CAMPAY_APP_PASSWORD=your_campay_password_here
CAMPAY_BASE_URL=https://demo.campay.net/api/
```

> **Note:** Change `CAMPAY_BASE_URL` to `https://www.campay.net/api/` when going live.
> Get your credentials at https://campay.net

### Step 4 — Run database migrations
```bash
python manage.py migrate
```

### Step 5 — Create an admin account (first time only)
```bash
python manage.py createsuperuser
```
Follow the prompts to set a username and password. This is what you use to log in to the admin panel at `/admin`.

### Step 6 — Start the backend server
```bash
python manage.py runserver
```
The backend will run at: **http://localhost:8000**

---

## 2. Frontend Setup (React)

### Step 1 — Navigate to the frontend folder
```bash
cd frontend
```

### Step 2 — Install Node dependencies
```bash
npm install
```

### Step 3 — Start the frontend
```bash
npm run dev
```
The app will open at: **http://localhost:5173** (or 5174 / 3000)

---

## 3. Using the App

### Customer Storefront
Visit **http://localhost:5173** to browse and purchase books.
- Browse 85 books across 14 genres (African Literature, Fiction, Mystery, Romance, Non-Fiction, Science, Business, Self-Help, and more)
- All prices in **XAF** (Central African CFA franc), ranging from 3,000 to 9,500 XAF
- Add to cart, choose a delivery method, and checkout with MTN MoMo or Orange Money
- Enter your Cameroon phone number at checkout (e.g. `677123456`)
- A payment prompt will be sent to your phone via USSD

### Admin Panel
Visit **http://localhost:5173/admin** and log in with the superuser credentials you created.

Admin features include:
- Dashboard with sales analytics and revenue charts
- Products and inventory management (add books, upload covers, update stock)
- Orders management with status tracking (Pending → Confirmed → Packing → Shipped → Delivered)
- Order pipeline (kanban-style fulfillment view)
- Payments overview
- Shipping, email, tax, and promotion settings

---

## 4. Going Live (Production)

When ready to accept real payments:

1. **Switch Campay to production** — update `backend/.env`:
   ```
   CAMPAY_BASE_URL=https://www.campay.net/api/
   ```

2. **Disable debug mode** — in `backend/page_and_prose/settings.py`:
   ```python
   DEBUG = False
   ```

3. **Set a secure secret key** — replace the `SECRET_KEY` in `settings.py` with a long random string

4. **Update CORS** — add your live domain to `CORS_ALLOWED_ORIGINS` in `settings.py`

5. **Deploy backend** — recommended hosts: Railway, Render, or any Linux VPS

6. **Deploy frontend** — recommended hosts: Vercel or Netlify
   - Update the API base URL in `src/app/api.ts` to point to your live backend URL

---

## 5. Carrying Over Existing Data

The database is stored in `backend/db.sqlite3`.

- **Include** this file when moving to another machine to keep all books, orders, and data.
- **Exclude** it to start fresh (then re-add books through the admin panel).

> Note: `db.sqlite3` is listed in `.gitignore` and will not be pushed to GitHub.

---

## 6. Troubleshooting

| Problem | Fix |
|---------|-----|
| Frontend can't reach backend | Make sure Django is running on port 8000 |
| CORS error in browser | Add your frontend URL to `CORS_ALLOWED_ORIGINS` in `backend/page_and_prose/settings.py` |
| Campay payment fails | Check `backend/.env` credentials; make sure phone number starts with 237 |
| Admin login not working | Run `python manage.py createsuperuser` inside the `backend/` folder |
| Port already in use | Kill the process using that port or use a different port |
| Books not showing on storefront | Make sure the Django server is running and accessible at port 8000 |

---

## Currency

All prices are in **XAF** (Central African CFA franc — Cameroon).

---

*Built with React, Django, Tailwind CSS, and Campay Mobile Money.*
