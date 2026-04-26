import { Plus, Trash2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: string;
  minPurchase: string;
  maxUses: string;
  expiryDate: string;
  active: boolean;
}

export function PromotionSettings() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const [showNewPromoForm, setShowNewPromoForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newPromo, setNewPromo] = useState<Omit<Promotion, 'id' | 'active'>>({
    code: '',
    type: 'percentage',
    value: '',
    minPurchase: '0',
    maxUses: '',
    expiryDate: '',
  });

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPromo({ ...newPromo, code });
  };

  const addPromotion = () => {
    if (!newPromo.code || !newPromo.value || !newPromo.maxUses || !newPromo.expiryDate) {
      alert('Please fill in all required fields');
      return;
    }

    setPromotions([
      ...promotions,
      {
        ...newPromo,
        id: Date.now().toString(),
        active: true,
      },
    ]);

    setNewPromo({
      code: '',
      type: 'percentage',
      value: '',
      minPurchase: '0',
      maxUses: '',
      expiryDate: '',
    });
    setShowNewPromoForm(false);
  };

  const removePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
  };

  const togglePromotion = (id: string) => {
    setPromotions(promotions.map(promo =>
      promo.id === id ? { ...promo, active: !promo.active } : promo
    ));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg text-[#f5f5f5]">Discount Codes</h3>
          <p className="text-sm text-[#a3a3a3] mt-1">Create and manage promotional discount codes</p>
        </div>
        <button
          onClick={() => setShowNewPromoForm(!showNewPromoForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Discount Code
        </button>
      </div>

      {/* New Promotion Form */}
      {showNewPromoForm && (
        <div className="bg-[#0a0a0a] border border-[#A68A64] rounded-lg p-6">
          <h4 className="text-md text-[#f5f5f5] mb-4">New Discount Code</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Discount Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPromo.code}
                    onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                    className="flex-1 bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                    placeholder="e.g., SUMMER25"
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="px-4 py-2 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Discount Type *</label>
                <select
                  value={newPromo.type}
                  onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                >
                  <option value="percentage">Percentage Off</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">
                  {newPromo.type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'} *
                </label>
                <input
                  type="number"
                  value={newPromo.value}
                  onChange={(e) => setNewPromo({ ...newPromo, value: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder={newPromo.type === 'percentage' ? '10' : '5.00'}
                  step={newPromo.type === 'percentage' ? '1' : '0.01'}
                  min="0"
                  max={newPromo.type === 'percentage' ? '100' : undefined}
                />
              </div>

              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Min Purchase ($)</label>
                <input
                  type="number"
                  value={newPromo.minPurchase}
                  onChange={(e) => setNewPromo({ ...newPromo, minPurchase: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Max Uses *</label>
                <input
                  type="number"
                  value={newPromo.maxUses}
                  onChange={(e) => setNewPromo({ ...newPromo, maxUses: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder="100"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Expiry Date *</label>
              <input
                type="date"
                value={newPromo.expiryDate}
                onChange={(e) => setNewPromo({ ...newPromo, expiryDate: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewPromoForm(false)}
                className="flex-1 px-4 py-2 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addPromotion}
                className="flex-1 px-4 py-2 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#6B9D48] transition-colors"
              >
                Create Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Promotions */}
      <div className="space-y-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#A68A64]/20 border border-[#A68A64]/30 px-4 py-2 rounded-lg">
                    <code className="text-[#C4A67A] font-mono">{promo.code}</code>
                  </div>
                  <button
                    onClick={() => copyCode(promo.code)}
                    className="p-2 text-[#a3a3a3] hover:text-[#A68A64] hover:bg-[#262626] rounded transition-colors"
                    title="Copy code"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-4 h-4 text-[#4A7C2C]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    promo.active 
                      ? 'bg-[#4A7C2C]/20 text-[#6B9D48] border border-[#4A7C2C]/30'
                      : 'bg-[#525252]/20 text-[#a3a3a3] border border-[#525252]/30'
                  }`}>
                    {promo.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Discount</p>
                    <p className="text-[#f5f5f5]">
                      {promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`} off
                    </p>
                  </div>
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Min Purchase</p>
                    <p className="text-[#f5f5f5]">
                      {promo.minPurchase === '0' ? 'None' : `$${promo.minPurchase}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Max Uses</p>
                    <p className="text-[#f5f5f5]">{promo.maxUses}</p>
                  </div>
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Expires</p>
                    <p className="text-[#f5f5f5]">
                      {new Date(promo.expiryDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => togglePromotion(promo.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    promo.active ? 'bg-[#4A7C2C]' : 'bg-[#262626]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      promo.active ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <button
                  onClick={() => removePromotion(promo.id)}
                  className="p-2 text-[#a3a3a3] hover:text-[#dc2626] hover:bg-[#262626] rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button onClick={() => alert('Promotion settings saved!')} className="px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors">
          Save Promotion Settings
        </button>
      </div>
    </div>
  );
}
