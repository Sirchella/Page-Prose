import { useState, useEffect } from 'react';
import { Package, Printer, Download, CheckCircle2, MapPin, User, X } from 'lucide-react';
import { fetchOrders, updateOrderStatus, type Order as ApiOrder } from '../api';

interface OrderItem {
  title: string;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  destination: string;
  country: string;
  totalItems: number;
}

const ordersQueue: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-2847',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    items: [
      { title: 'The Midnight Library', quantity: 1 },
      { title: 'Atomic Habits', quantity: 2 },
    ],
    destination: '42 Oxford Street, London, W1D 1BS',
    country: 'United Kingdom',
    totalItems: 3,
  },
  {
    id: '2',
    orderNumber: '#ORD-2848',
    customerName: 'Michael Chen',
    email: 'm.chen@email.com',
    items: [
      { title: 'Project Hail Mary', quantity: 1 },
    ],
    destination: '156 High Street, Manchester, M4 1HP',
    country: 'United Kingdom',
    totalItems: 1,
  },
  {
    id: '3',
    orderNumber: '#ORD-2849',
    customerName: 'Emma Thompson',
    email: 'emma.t@email.com',
    items: [
      { title: 'Where the Crawdads Sing', quantity: 1 },
      { title: 'The Silent Patient', quantity: 1 },
    ],
    destination: '789 Fifth Avenue, New York, NY 10022',
    country: 'United States',
    totalItems: 2,
  },
  {
    id: '4',
    orderNumber: '#ORD-2850',
    customerName: 'James Wilson',
    email: 'j.wilson@email.com',
    items: [
      { title: 'Educated', quantity: 1 },
    ],
    destination: '23 George Street, Edinburgh, EH2 2PB',
    country: 'United Kingdom',
    totalItems: 1,
  },
  {
    id: '5',
    orderNumber: '#ORD-2851',
    customerName: 'Sophie Martin',
    email: 'sophie.m@email.com',
    items: [
      { title: 'The Thursday Murder Club', quantity: 2 },
      { title: 'Normal People', quantity: 1 },
    ],
    destination: '45 Grafton Street, Dublin, D02 FK84',
    country: 'Ireland',
    totalItems: 3,
  },
  {
    id: '6',
    orderNumber: '#ORD-2852',
    customerName: 'David Brown',
    email: 'd.brown@email.com',
    items: [
      { title: 'The Invisible Life of Addie LaRue', quantity: 1 },
    ],
    destination: '12 King Street, Bristol, BS1 4EF',
    country: 'United Kingdom',
    totalItems: 1,
  },
];

export function FulfillmentPage() {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedCarrier, setSelectedCarrier] = useState<'UPS' | 'Royal Mail'>('Royal Mail');
  const [queue, setQueue] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders()
      .then((apiOrders: ApiOrder[]) => {
        setQueue(apiOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').map(o => ({
          id: o.id.toString(),
          orderNumber: `#ORD-${String(o.id).padStart(4, '0')}`,
          customerName: o.customer_name,
          email: o.customer_email,
          items: o.items.map(i => ({ title: `Book #${i.book}`, quantity: i.quantity })),
          destination: o.shipping_address,
          country: '',
          totalItems: o.items.reduce((s, i) => s + i.quantity, 0),
        })));
      })
      .catch(() => {});
  }, []);

  const toggleOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const toggleAll = () => {
    if (selectedOrders.size === queue.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(queue.map(o => o.id)));
    }
  };

  const handleGenerateLabel = (order: Order) => {
    setCurrentOrder(order);
    setSelectedCarrier(order.country === 'United States' ? 'UPS' : 'Royal Mail');
    setShowLabelModal(true);
    updateOrderStatus(parseInt(order.id), 'shipped').catch(() => {});
  };

  const generateTrackingNumber = (carrier: 'UPS' | 'Royal Mail') => {
    if (carrier === 'UPS') {
      return '1Z' + Math.random().toString(36).substring(2, 18).toUpperCase();
    } else {
      return 'RM' + Math.random().toString(36).substring(2, 15).toUpperCase();
    }
  };

  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + (selectedCarrier === 'UPS' ? 5 : 3));
    return date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-[#f5f5f5]">Fulfillment & Shipping</h2>
        <p className="text-sm text-[#a3a3a3] mt-1">Process orders ready for shipment</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-[#A68A64]" />
            <p className="text-sm text-[#a3a3a3]">Ready to Ship</p>
          </div>
          <p className="text-3xl text-[#f5f5f5]">{queue.length}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#4A7C2C]" />
            <p className="text-sm text-[#a3a3a3]">Shipped Today</p>
          </div>
          <p className="text-3xl text-[#f5f5f5]">23</p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-[#A68A64]" />
            <p className="text-sm text-[#a3a3a3]">In Transit</p>
          </div>
          <p className="text-3xl text-[#f5f5f5]">87</p>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-[#a3a3a3]">
              <input
                type="checkbox"
                checked={selectedOrders.size === queue.length && queue.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-[#404040] bg-[#0a0a0a] checked:bg-[#4A7C2C] checked:border-[#4A7C2C] focus:ring-2 focus:ring-[#4A7C2C] focus:ring-offset-0"
              />
              Select All ({selectedOrders.size} selected)
            </label>
          </div>
          {selectedOrders.size > 0 && (
            <div className="flex items-center gap-3">
              <button onClick={() => window.print()} className="px-4 py-2 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Bulk Print Labels ({selectedOrders.size})
              </button>
              <button
                onClick={() => {
                  const ids = [...selectedOrders].join(', ');
                  const blob = new Blob([`Selected Orders: ${ids}`], { type: 'text/plain' });
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
                  a.download = 'selected-orders.txt'; a.click();
                }}
                className="px-4 py-2 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#8f7556] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Queue */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626] bg-[#0f0f0f]">
                <th className="w-12 px-6 py-4"></th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Order</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Customer</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Items</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Destination</th>
                <th className="text-right px-6 py-4 text-sm text-[#a3a3a3]">Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((order) => (
                <tr key={order.id} className="border-b border-[#262626] hover:bg-[#1a1a1a]/50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.id)}
                      onChange={() => toggleOrder(order.id)}
                      className="w-4 h-4 rounded border-[#404040] bg-[#0a0a0a] checked:bg-[#4A7C2C] checked:border-[#4A7C2C] focus:ring-2 focus:ring-[#4A7C2C] focus:ring-offset-0"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#f5f5f5] font-medium">{order.orderNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#4A7C2C] flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-[#f5f5f5]">{order.customerName}</div>
                        <div className="text-xs text-[#a3a3a3]">{order.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-[#f5f5f5]">
                          {item.quantity}x {item.title}
                        </div>
                      ))}
                      <div className="text-xs text-[#A68A64] mt-1">
                        {order.totalItems} item{order.totalItems > 1 ? 's' : ''} total
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-xs">
                      <MapPin className="w-4 h-4 text-[#a3a3a3] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-[#f5f5f5]">{order.destination}</div>
                        <div className="text-xs text-[#a3a3a3] mt-1">{order.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleGenerateLabel(order)}
                      className="px-4 py-2 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#8f7556] transition-colors inline-flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Generate Label
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Label Modal */}
      {showLabelModal && currentOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#262626]">
              <div>
                <h3 className="text-xl text-[#f5f5f5]">Shipping Label - {currentOrder.orderNumber}</h3>
                <p className="text-sm text-[#a3a3a3] mt-1">Review and print shipping label</p>
              </div>
              <button
                onClick={() => setShowLabelModal(false)}
                className="p-2 hover:bg-[#262626] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#a3a3a3]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Carrier Selection */}
              <div>
                <label className="block text-sm text-[#a3a3a3] mb-3">Select Carrier</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedCarrier('Royal Mail')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCarrier === 'Royal Mail'
                        ? 'border-[#4A7C2C] bg-[#4A7C2C]/10'
                        : 'border-[#262626] hover:border-[#404040]'
                    }`}
                  >
                    <div className="text-lg text-[#f5f5f5] font-medium mb-1">Royal Mail</div>
                    <div className="text-xs text-[#a3a3a3]">2-3 business days</div>
                  </button>
                  <button
                    onClick={() => setSelectedCarrier('UPS')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCarrier === 'UPS'
                        ? 'border-[#4A7C2C] bg-[#4A7C2C]/10'
                        : 'border-[#262626] hover:border-[#404040]'
                    }`}
                  >
                    <div className="text-lg text-[#f5f5f5] font-medium mb-1">UPS</div>
                    <div className="text-xs text-[#a3a3a3]">4-5 business days</div>
                  </button>
                </div>
              </div>

              {/* Shipping Label Preview */}
              <div className="bg-white p-8 rounded-lg">
                <div className="border-4 border-black p-6 space-y-4">
                  {/* Carrier Header */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-4">
                    <div className="text-3xl font-bold text-black">{selectedCarrier}</div>
                    <div className="text-right">
                      <div className="text-xs text-black">PRIORITY</div>
                      <div className="text-sm font-bold text-black">2-DAY</div>
                    </div>
                  </div>

                  {/* From Address */}
                  <div>
                    <div className="text-xs font-bold text-black mb-1">FROM:</div>
                    <div className="text-sm text-black">
                      <div className="font-bold">Page & Prose</div>
                      <div>123 Book Street</div>
                      <div>London, WC1A 1AA</div>
                      <div>United Kingdom</div>
                    </div>
                  </div>

                  {/* To Address */}
                  <div className="border-t-2 border-black pt-4">
                    <div className="text-xs font-bold text-black mb-1">TO:</div>
                    <div className="text-lg text-black">
                      <div className="font-bold">{currentOrder.customerName}</div>
                      <div>{currentOrder.destination}</div>
                      <div className="mt-1">{currentOrder.country}</div>
                    </div>
                  </div>

                  {/* Tracking Barcode */}
                  <div className="border-t-2 border-black pt-4 text-center">
                    <div className="bg-black h-16 w-full mb-2 flex items-center justify-center">
                      <div className="flex gap-1">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-white"
                            style={{
                              width: '3px',
                              height: Math.random() > 0.5 ? '48px' : '32px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm font-mono font-bold text-black">
                      {generateTrackingNumber(selectedCarrier)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <div className="text-xs text-[#a3a3a3] mb-1">Tracking Number</div>
                  <div className="text-sm text-[#f5f5f5] font-mono">
                    {generateTrackingNumber(selectedCarrier)}
                  </div>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <div className="text-xs text-[#a3a3a3] mb-1">Estimated Delivery</div>
                  <div className="text-sm text-[#f5f5f5]">{getEstimatedDelivery()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button onClick={() => window.print()} className="flex-1 px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center justify-center gap-2">
                  <Printer className="w-5 h-5" />
                  Print Label
                </button>
                <button onClick={() => window.print()} className="flex-1 px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#8f7556] transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>

              <button
                onClick={() => setShowLabelModal(false)}
                className="w-full px-6 py-3 border border-[#262626] text-[#a3a3a3] rounded-lg hover:bg-[#262626] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
