import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  accentColor: 'brown' | 'green';
}

export function KPICard({ title, value, change, icon: Icon, trend, accentColor }: KPICardProps) {
  const colorClasses = {
    brown: 'bg-[#A68A64]/10 text-[#C4A67A]',
    green: 'bg-[#4A7C2C]/10 text-[#6B9D48]',
  };

  const trendColor = trend === 'up' ? 'text-[#6B9D48]' : 'text-[#dc2626]';

  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[#a3a3a3] mb-2">{title}</p>
          <p className="text-3xl text-[#f5f5f5] mb-2">{value}</p>
          <p className={`text-sm ${trendColor}`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[accentColor]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
