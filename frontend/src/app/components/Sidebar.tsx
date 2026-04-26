import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  Truck,
  BarChart3,
  Settings,
  Boxes,
  CreditCard,
  Mail,
  ClipboardList,
  Database,
  GitBranch,
  X,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
  { icon: Package, label: 'Products', to: '/admin/products' },
  { icon: Database, label: 'Product Database', to: '/admin/database' },
  { icon: Boxes, label: 'Inventory', to: '/admin/inventory' },
  { icon: ShoppingCart, label: 'Orders', to: '/admin/orders' },
  { icon: GitBranch, label: 'Order Pipeline', to: '/admin/pipeline' },
  { icon: ClipboardList, label: 'Fulfillment', to: '/admin/fulfillment' },
  { icon: Tag, label: 'Promotions', to: '/admin/promotions' },
  { icon: Truck, label: 'Shipping', to: '/admin/shipping' },
  { icon: CreditCard, label: 'Payments', to: '/admin/payments' },
  { icon: Mail, label: 'Email', to: '/admin/email' },
  { icon: BarChart3, label: 'Analytics', to: '/admin/dashboard' },
  { icon: Settings, label: 'Settings', to: '/admin/settings' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const sidebarContent = (
    <aside className="w-64 bg-[#0f0f0f] border-r border-[#262626] flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#262626] flex items-center justify-between">
        <div>
          <h1 className="text-xl text-[#f5f5f5]">Page & Prose</h1>
          <p className="text-sm text-[#a3a3a3] mt-1">Admin Dashboard</p>
        </div>
        {/* Close button (mobile only) */}
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 text-[#a3a3a3] hover:text-[#f5f5f5]">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#A68A64] text-[#0a0a0a]'
                        : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f5f5f5]'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#262626]">
        <NavLink
          to="/"
          onClick={onClose}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f5f5f5] transition-colors mb-2"
        >
          <Store className="w-5 h-5" />
          <span>View Storefront</span>
        </NavLink>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-[#4A7C2C] flex items-center justify-center">
            <span className="text-sm text-white">AD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#f5f5f5]">Admin User</p>
            <p className="text-xs text-[#a3a3a3]">admin@pageandprose.com</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar: always visible */}
      <div className="hidden md:flex w-64 flex-shrink-0 h-screen">
        {sidebarContent}
      </div>

      {/* Mobile sidebar: overlay drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <div className="relative flex h-full w-64 flex-shrink-0">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
