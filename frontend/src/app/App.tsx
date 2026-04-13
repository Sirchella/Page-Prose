import { useState, type ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router';
import { getAccessToken } from './api';
import { Menu } from 'lucide-react';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BrowsePage } from './components/BrowsePage';
import { BookDetailPage } from './components/BookDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { OrdersManagement } from './components/OrdersManagement';
import { ProductsTable } from './components/ProductsTable';
import { InventoryManagement } from './components/InventoryManagement';
import { FulfillmentPage } from './components/FulfillmentPage';
import { PaymentsOverview } from './components/PaymentsOverview';
import { ShippingIntegration } from './components/ShippingIntegration';
import { EmailNotifications } from './components/EmailNotifications';
import { StoreSettings } from './components/StoreSettings';
import { PaymentSettings } from './components/PaymentSettings';
import { ShippingSettings } from './components/ShippingSettings';
import { TaxSettings } from './components/TaxSettings';
import { PromotionSettings } from './components/PromotionSettings';
import { OrderPipeline } from './components/OrderPipeline';
import { ProductDatabaseViewer } from './components/ProductDatabaseViewer';

function ProtectedAdminRoute() {
  const location = useLocation();
  if (!getAccessToken()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

function AdminPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-8">
      {children}
    </div>
  );
}

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#0f0f0f] border-b border-[#262626]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-[#f5f5f5] text-base">Page & Prose Admin</span>
        </div>
        <main className="flex-1 overflow-auto bg-[#0f0f0f]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<BrowsePage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminPage><AnalyticsDashboard /></AdminPage>} />
            <Route path="products" element={<AdminPage><ProductsTable /></AdminPage>} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="orders" element={<AdminPage><OrdersManagement /></AdminPage>} />
            <Route path="fulfillment" element={<AdminPage><FulfillmentPage /></AdminPage>} />
            <Route path="payments" element={<PaymentsOverview />} />
            <Route path="shipping" element={<ShippingIntegration />} />
            <Route path="email" element={<EmailNotifications />} />
            <Route path="promotions" element={<AdminPage><PromotionSettings /></AdminPage>} />
            <Route path="pipeline" element={<OrderPipeline />} />
            <Route path="database" element={<ProductDatabaseViewer />} />
            <Route path="settings" element={<AdminPage><StoreSettings /></AdminPage>} />
            <Route path="settings/payment" element={<AdminPage><PaymentSettings /></AdminPage>} />
            <Route path="settings/shipping" element={<AdminPage><ShippingSettings /></AdminPage>} />
            <Route path="settings/tax" element={<AdminPage><TaxSettings /></AdminPage>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}
