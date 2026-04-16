import { useState } from 'react';
import { Settings, CreditCard, DollarSign, Tag } from 'lucide-react';
import { ShippingSettings } from './ShippingSettings';
import { PaymentSettings } from './PaymentSettings';
import { TaxSettings } from './TaxSettings';
import { PromotionSettings } from './PromotionSettings';

type Tab = 'shipping' | 'payments' | 'tax' | 'promotions';

interface TabConfig {
  id: Tab;
  label: string;
  icon: React.ElementType;
}

const tabs: TabConfig[] = [
  { id: 'shipping', label: 'Shipping', icon: Settings },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'tax', label: 'Tax Rules', icon: DollarSign },
  { id: 'promotions', label: 'Promotions', icon: Tag },
];

export function StoreSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('shipping');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'shipping':
        return <ShippingSettings />;
      case 'payments':
        return <PaymentSettings />;
      case 'tax':
        return <TaxSettings />;
      case 'promotions':
        return <PromotionSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-[#f5f5f5]">Store Configuration</h2>
        <p className="text-sm text-[#a3a3a3] mt-1">Manage your store settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#262626]">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#A68A64] text-[#f5f5f5]'
                    : 'border-transparent text-[#a3a3a3] hover:text-[#f5f5f5] hover:border-[#525252]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
