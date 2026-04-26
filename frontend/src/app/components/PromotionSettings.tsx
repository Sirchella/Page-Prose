import { Plus, Trash2, Copy, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  fetchDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  type DiscountCode,
} from '../api';

export function PromotionSettings() {
  const [promotions, setPromotions] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [showNewPromoForm, setShowNewPromoForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [promoFormError, setPromoFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const [newPromo, setNewPromo] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    min_purchase: '0',
    max_uses: '',
    expiry_date: '',
  });

  useEffect(() => {
    fetchDiscounts()
      .then(setPromotions)
      .catch(() => setLoadError('Failed to load discount codes.'))
      .finally(() => setLoading(false));
  }, []);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setNewPromo(p => ({ ...p, code }));
  };

  const addPromotion = async () => {
    if (!newPromo.code || !newPromo.value || !newPromo.max_uses || !newPromo.expiry_date) {
      setPromoFormError('Please fill in all required fields');
      return;
    }
    setPromoFormError('');
    setSaving(true);
    try {
      const created = await createDiscount({
        code: newPromo.code,
        type: newPromo.type,
        value: newPromo.value,
        min_purchase: newPromo.min_purchase || '0',
        max_uses: parseInt(newPromo.max_uses) || null,
        expiry_date: newPromo.expiry_date || null,
      });
      setPromotions(prev => [created, ...prev]);
      setNewPromo({ code: '', type: 'percentage', value: '', min_purchase: '0', max_uses: '', expiry_date: '' });
      setShowNewPromoForm(false);
    } catch (err) {
      setPromoFormError(err instanceof Error ? err.message : 'Failed to create code');
    } finally {
      setSaving(false);
    }
  };

  const removePromotion = async (id: number) => {
    try {
      await deleteDiscount(id);
      setPromotions(prev => prev.filter(p => p.id !== id));
    } catch {
      // silently ignore — refresh on next load
    }
  };

  const togglePromotion = async (promo: DiscountCode) => {
    const updated = { ...promo, active: !promo.active };
    setPromotions(prev => prev.map(p => p.id === promo.id ? updated : p));
    try {
      await updateDiscount(promo.id, { active: !promo.active });
    } catch {
      // revert on failure
      setPromotions(prev => prev.map(p => p.id === promo.id ? promo : p));
    }
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
                    onChange={(e) => setNewPromo(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                    className="flex-1 bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                    placeholder="e.g., SUMMER25"
                  />
                  <button type="button" onClick={generateCode} className="px-4 py-2 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors whitespace-nowrap">
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Discount Type *</label>
                <select
                  value={newPromo.type}
                  onChange={(e) => setNewPromo(p => ({ ...p, type: e.target.value as 'percentage' | 'fixed' }))}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                >
                  <option value="percentage">Percentage Off</option>
                  <option value="fixed">Fixed Amount (XAF)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">
                  {newPromo.type === 'percentage' ? 'Percentage (%)' : 'Amount (XAF)'} *
                </label>
                <input
                  type="number"
                  value={newPromo.value}
                  onChange={(e) => setNewPromo(p => ({ ...p, value: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder={newPromo.type === 'percentage' ? '10' : '5000'}
                  step={newPromo.type === 'percentage' ? '1' : '1'}
                  min="0"
                  max={newPromo.type === 'percentage' ? '100' : undefined}
                />
              </div>

              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Min Purchase (XAF)</label>
                <input
                  type="number"
                  value={newPromo.min_purchase}
                  onChange={(e) => setNewPromo(p => ({ ...p, min_purchase: e.target.value }))}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm text-[#f5f5f5] mb-2">Max Uses *</label>
                <input
                  type="number"
                  value={newPromo.max_uses}
                  onChange={(e) => setNewPromo(p => ({ ...p, max_uses: e.target.value }))}
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
                value={newPromo.expiry_date}
                onChange={(e) => setNewPromo(p => ({ ...p, expiry_date: e.target.value }))}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setShowNewPromoForm(false); setPromoFormError(''); }} className="flex-1 px-4 py-2 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors">
                Cancel
              </button>
              <button type="button" onClick={addPromotion} disabled={saving} className="flex-1 px-4 py-2 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#6B9D48] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Create Code'}
              </button>
            </div>
            {promoFormError && <p className="text-sm text-red-400">{promoFormError}</p>}
          </div>
        </div>
      )}

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center gap-2 text-[#a3a3a3] text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading codes…
        </div>
      )}
      {loadError && <p className="text-sm text-red-400">{loadError}</p>}

      {/* Existing Promotions */}
      {!loading && promotions.length === 0 && !showNewPromoForm && (
        <p className="text-sm text-[#a3a3a3]">No discount codes yet. Create one above.</p>
      )}

      <div className="space-y-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#A68A64]/20 border border-[#A68A64]/30 px-4 py-2 rounded-lg">
                    <code className="text-[#C4A67A] font-mono">{promo.code}</code>
                  </div>
                  <button onClick={() => copyCode(promo.code)} className="p-2 text-[#a3a3a3] hover:text-[#A68A64] hover:bg-[#262626] rounded transition-colors" title="Copy code">
                    {copiedCode === promo.code ? <Check className="w-4 h-4 text-[#4A7C2C]" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <span className={`text-xs px-2 py-1 rounded-full ${promo.active ? 'bg-[#4A7C2C]/20 text-[#6B9D48] border border-[#4A7C2C]/30' : 'bg-[#525252]/20 text-[#a3a3a3] border border-[#525252]/30'}`}>
                    {promo.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Discount</p>
                    <p className="text-[#f5f5f5]">
                      {promo.type === 'percentage' ? `${promo.value}%` : `${parseInt(promo.value).toLocaleString()} XAF`} off
                    </p>
                  </div>
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Min Purchase</p>
                    <p className="text-[#f5f5f5]">
                      {parseFloat(promo.min_purchase) === 0 ? 'None' : `${parseInt(promo.min_purchase).toLocaleString()} XAF`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Uses</p>
                    <p className="text-[#f5f5f5]">{promo.uses}{promo.max_uses ? ` / ${promo.max_uses}` : ''}</p>
                  </div>
                  <div>
                    <p className="text-[#a3a3a3] mb-1">Expires</p>
                    <p className="text-[#f5f5f5]">
                      {promo.expiry_date
                        ? new Date(promo.expiry_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : 'No expiry'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => togglePromotion(promo)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${promo.active ? 'bg-[#4A7C2C]' : 'bg-[#262626]'}`}
                  title={promo.active ? 'Deactivate' : 'Activate'}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${promo.active ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <button onClick={() => removePromotion(promo.id)} className="p-2 text-[#a3a3a3] hover:text-[#dc2626] hover:bg-[#262626] rounded transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
