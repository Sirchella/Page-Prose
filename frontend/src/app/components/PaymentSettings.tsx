import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function PaymentSettings() {
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(false);
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showPaypalSecret, setShowPaypalSecret] = useState(false);

  const [stripePublicKey, setStripePublicKey] = useState('pk_test_51234567890abcdefghijk');
  const [stripeSecretKey, setStripeSecretKey] = useState('sk_test_51234567890abcdefghijk');
  const [paypalClientId, setPaypalClientId] = useState('');
  const [paypalSecret, setPaypalSecret] = useState('');

  return (
    <div className="space-y-8">
      {/* Stripe */}
      <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#635bff] rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.549-2.354 1.549-2.679 0-5.49-1.146-7.243-2.161l-.951 5.63C4.828 23.113 7.644 24 10.814 24c2.653 0 4.784-.684 6.331-2.032 1.548-1.351 2.323-3.287 2.323-5.751.001-3.994-2.515-5.867-5.492-7.067z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-[#f5f5f5]">Stripe</h3>
              <p className="text-sm text-[#a3a3a3] mt-1">Accept credit cards and digital wallets</p>
            </div>
          </div>
          <button
            onClick={() => setStripeEnabled(!stripeEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              stripeEnabled ? 'bg-[#4A7C2C]' : 'bg-[#262626]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                stripeEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {stripeEnabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Publishable Key</label>
              <input
                type="text"
                value={stripePublicKey}
                onChange={(e) => setStripePublicKey(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                placeholder="pk_test_..."
              />
              <p className="text-xs text-[#a3a3a3] mt-2">Your Stripe publishable API key (safe to expose)</p>
            </div>

            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Secret Key</label>
              <div className="relative">
                <input
                  type={showStripeSecret ? 'text' : 'password'}
                  value={stripeSecretKey}
                  onChange={(e) => setStripeSecretKey(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3 pr-12 text-[#f5f5f5] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder="sk_test_..."
                />
                <button
                  type="button"
                  onClick={() => setShowStripeSecret(!showStripeSecret)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors"
                >
                  {showStripeSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#a3a3a3] mt-2">Your Stripe secret API key (keep private)</p>
            </div>

            <div className="bg-[#4A7C2C]/10 border border-[#4A7C2C]/30 rounded-lg p-4">
              <p className="text-sm text-[#6B9D48]">
                <strong>Test Mode:</strong> Using test keys. Switch to live keys for production.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PayPal */}
      <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0070ba] rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg text-[#f5f5f5]">PayPal</h3>
              <p className="text-sm text-[#a3a3a3] mt-1">Accept PayPal and Venmo payments</p>
            </div>
          </div>
          <button
            onClick={() => setPaypalEnabled(!paypalEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              paypalEnabled ? 'bg-[#4A7C2C]' : 'bg-[#262626]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                paypalEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {paypalEnabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Client ID</label>
              <input
                type="text"
                value={paypalClientId}
                onChange={(e) => setPaypalClientId(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                placeholder="Enter your PayPal Client ID"
              />
            </div>

            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Secret Key</label>
              <div className="relative">
                <input
                  type={showPaypalSecret ? 'text' : 'password'}
                  value={paypalSecret}
                  onChange={(e) => setPaypalSecret(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3 pr-12 text-[#f5f5f5] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                  placeholder="Enter your PayPal Secret"
                />
                <button
                  type="button"
                  onClick={() => setShowPaypalSecret(!showPaypalSecret)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors"
                >
                  {showPaypalSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="bg-[#A68A64]/10 border border-[#A68A64]/30 rounded-lg p-4">
              <p className="text-sm text-[#C4A67A]">
                <strong>Sandbox Mode:</strong> Configure for testing. Use live credentials for production.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button onClick={() => alert('Payment settings saved!')} className="px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors">
          Save Payment Settings
        </button>
      </div>
    </div>
  );
}
