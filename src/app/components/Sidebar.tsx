import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Tag, 
  Truck, 
  BarChart3,
  Settings
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: Package, label: 'Products', active: false },
  { icon: ShoppingCart, label: 'Orders', active: false },
  { icon: Tag, label: 'Promotions' },
  { icon: Truck, label: 'Shipping', active: true },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f0f0f] border-r border-[#262626] flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-[#262626]">
        <h1 className="text-xl text-[#f5f5f5]">Page & Prose</h1>
        <p className="text-sm text-[#a3a3a3] mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-[#A68A64] text-[#0a0a0a]'
                      : 'text-[#a3a3a3] hover:bg-[#1a1a1a] hover:text-[#f5f5f5]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#262626]">
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
}