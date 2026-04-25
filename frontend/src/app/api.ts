const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8000/api';
const MEDIA_BASE = BASE_URL.replace(/\/api$/, '');

/** Returns the full URL for a book cover image path returned by the API. */
export function coverUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${MEDIA_BASE}${path}`;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const data = await res.json();
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

async function authHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Books ───────────────────────────────────────────────────────────────────

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: string;
  stock: number;
  cover_image: string | null;
  isbn: string;
  created_at: string;
}

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/books/`);
  if (!res.ok) throw new Error('Failed to fetch books');
  const data = await res.json();
  // Handle both paginated and plain list responses
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchBook(id: number | string): Promise<Book> {
  const res = await fetch(`${BASE_URL}/books/${id}/`);
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
}

export async function createBook(data: FormData): Promise<Book> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/books/`, {
    method: 'POST',
    headers,
    body: data,
  });
  if (!res.ok) throw new Error('Failed to create book');
  return res.json();
}

export async function updateBook(id: number, data: FormData): Promise<Book> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/books/${id}/`, {
    method: 'PATCH',
    headers,
    body: data,
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
}

export async function deleteBook(id: number): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/books/${id}/`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error('Failed to delete book');
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: number;
  book: number;
  quantity: number;
  price: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  status: 'pending' | 'confirmed' | 'packing' | 'shipped' | 'delivered' | 'cancelled';
  total_price: string;
  created_at: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  total_price: string;
  items: { book: number; quantity: number; price: string }[];
}

export async function fetchOrders(): Promise<Order[]> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/orders/`, { headers });
  if (!res.ok) throw new Error('Failed to fetch orders');
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchOrder(id: number): Promise<Order> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/orders/${id}/`, { headers });
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await fetch(`${BASE_URL}/orders/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function updateOrderStatus(id: number, status: Order['status']): Promise<Order> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/orders/${id}/`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}

// ─── Campay Mobile Money ──────────────────────────────────────────────────────

export interface InitiatePaymentResponse {
  reference: string;
  ussd_code?: string;
  operator?: string;
  status?: string;
}

/** Initiates a Mobile Money collect request. Phone format: 237XXXXXXXXX */
export async function initiatePayment(payload: {
  phone: string;
  amount: number;
  description?: string;
}): Promise<InitiatePaymentResponse> {
  const res = await fetch(`${BASE_URL}/initiate-payment/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to initiate payment');
  }
  return res.json();
}

/** Polls the status of a Campay transaction. Status values: SUCCESSFUL | FAILED | PENDING */
export async function checkPaymentStatus(reference: string): Promise<{ status: string; reason?: string }> {
  const res = await fetch(`${BASE_URL}/payment-status/${reference}/`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to check payment status');
  }
  return res.json();
}
