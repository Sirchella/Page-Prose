import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ShippingZone {
  id: string;
  name: string;
  regions: string;
  rate: string;
}

interface Carrier {
  id: string;
  name: string;
  enabled: boolean;
}

export function ShippingSettings() {
  const [zones, setZones] = useState<ShippingZone[]>([]);

  const [carriers, setCarriers] = useState<Carrier[]>([]);

  const addZone = () => {
    setZones([...zones, { id: Date.now().toString(), name: '', regions: '', rate: '' }]);
  };

  const removeZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
  };

  const updateZone = (id: string, field: keyof ShippingZone, value: string) => {
    setZones(zones.map(zone => zone.id === id ? { ...zone, [field]: value } : zone));
  };

  const toggleCarrier = (id: string) => {
    setCarriers(carriers.map(carrier => 
      carrier.id === id ? { ...carrier, enabled: !carrier.enabled } : carrier
    ));
  };

  return (
    <div className="space-y-8">
      {/* Shipping Zones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg text-[#f5f5f5]">Shipping Zones & Rates</h3>
            <p className="text-sm text-[#a3a3a3] mt-1">Configure regional shipping zones and their rates</p>
          </div>
          <button
            onClick={addZone}
            className="flex items-center gap-2 px-4 py-2 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Zone
          </button>
        </div>

        <div className="space-y-3">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-3">
                  <label className="block text-sm text-[#f5f5f5] mb-2">Zone Name</label>
                  <input
                    type="text"
                    value={zone.name}
                    onChange={(e) => updateZone(zone.id, 'name', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                    placeholder="e.g., Domestic"
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="block text-sm text-[#f5f5f5] mb-2">Regions</label>
                  <input
                    type="text"
                    value={zone.regions}
                    onChange={(e) => updateZone(zone.id, 'regions', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                    placeholder="e.g., United States, Canada"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm text-[#f5f5f5] mb-2">Flat Rate</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]">$</span>
                    <input
                      type="number"
                      value={zone.rate}
                      onChange={(e) => updateZone(zone.id, 'rate', e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg pl-8 pr-4 py-2 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeZone(zone.id)}
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

      {/* Divider */}
      <div className="border-t border-[#262626]" />

      {/* Carriers */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg text-[#f5f5f5]">Shipping Carriers</h3>
          <p className="text-sm text-[#a3a3a3] mt-1">Enable or disable shipping carriers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carriers.map((carrier) => (
            <div key={carrier.id} className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-[#f5f5f5]">{carrier.name}</p>
                <p className="text-xs text-[#a3a3a3] mt-1">
                  {carrier.enabled ? 'Active' : 'Disabled'}
                </p>
              </div>
              <button
                onClick={() => toggleCarrier(carrier.id)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  carrier.enabled ? 'bg-[#4A7C2C]' : 'bg-[#262626]'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    carrier.enabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button onClick={() => alert('Shipping settings saved!')} className="px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors">
          Save Shipping Settings
        </button>
      </div>
    </div>
  );
}
