import { Plus, Trash2, Check } from 'lucide-react';
import { useState } from 'react';

interface TaxRule {
  id: string;
  region: string;
  state: string;
  rate: string;
}

export function TaxSettings() {
  const [taxRules, setTaxRules] = useState<TaxRule[]>([]);

  const [collectTax, setCollectTax] = useState(true);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    setSavedMsg('Settings saved.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const addTaxRule = () => {
    setTaxRules([...taxRules, { id: Date.now().toString(), region: '', state: '', rate: '' }]);
  };

  const removeTaxRule = (id: string) => {
    setTaxRules(taxRules.filter(rule => rule.id !== id));
  };

  const updateTaxRule = (id: string, field: keyof TaxRule, value: string) => {
    setTaxRules(taxRules.map(rule => rule.id === id ? { ...rule, [field]: value } : rule));
  };

  return (
    <div className="space-y-8">
      {/* Tax Collection Toggle */}
      <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg text-[#f5f5f5]">Tax Collection</h3>
            <p className="text-sm text-[#a3a3a3] mt-1">Enable or disable automatic tax collection at checkout</p>
          </div>
          <button
            onClick={() => setCollectTax(!collectTax)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              collectTax ? 'bg-[#4A7C2C]' : 'bg-[#262626]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                collectTax ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {collectTax && (
        <>
          {/* Tax Rules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg text-[#f5f5f5]">Regional Tax Rates</h3>
                <p className="text-sm text-[#a3a3a3] mt-1">Configure tax rates for different regions and states</p>
              </div>
              <button
                onClick={addTaxRule}
                className="flex items-center gap-2 px-4 py-2 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tax Rule
              </button>
            </div>

            <div className="space-y-3">
              {taxRules.map((rule) => (
                <div key={rule.id} className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-4">
                      <label className="block text-sm text-[#f5f5f5] mb-2">Country/Region</label>
                      <select
                        value={rule.region}
                        onChange={(e) => updateTaxRule(rule.id, 'region', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                      >
                        <option value="">Select region</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="European Union">European Union</option>
                      </select>
                    </div>
                    <div className="md:col-span-4">
                      <label className="block text-sm text-[#f5f5f5] mb-2">State/Province</label>
                      <input
                        type="text"
                        value={rule.state}
                        onChange={(e) => updateTaxRule(rule.id, 'state', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                        placeholder="e.g., California"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm text-[#f5f5f5] mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        value={rule.rate}
                        onChange={(e) => updateTaxRule(rule.id, 'rate', e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="md:col-span-1 flex justify-end">
                      <button
                        onClick={() => removeTaxRule(rule.id)}
                        className="p-2 text-[#a3a3a3] hover:text-[#dc2626] hover:bg-[#262626] rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-[#A68A64]/10 border border-[#A68A64]/30 rounded-lg p-4">
            <h4 className="text-sm text-[#C4A67A] mb-2">Tax Calculation</h4>
            <p className="text-sm text-[#a3a3a3]">
              Taxes are calculated based on the customer's shipping address. If no matching rule is found, no tax will be applied.
            </p>
          </div>
        </>
      )}

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4">
        {savedMsg && (
          <span className="flex items-center gap-1 text-sm text-green-400">
            <Check className="w-4 h-4" /> {savedMsg}
          </span>
        )}
        <button onClick={handleSave} className="px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors">
          Save Tax Settings
        </button>
      </div>
    </div>
  );
}
