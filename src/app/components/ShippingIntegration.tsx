import { useState } from 'react';
import {
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  Plus,
  Edit3,
  Trash2,
  Package,
  MapPin,
  Clock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type ConnectionStatus = 'connected' | 'disconnected' | 'testing' | 'error';

interface Carrier {
  id: string;
  name: string;
  logo: string;
  status: ConnectionStatus;
  apiKey: string;
  lastTested: string | null;
}

interface ShippingRule {
  id: string;
  minWeight: number;
  maxWeight: number;
  carrier: string;
  serviceType: string;
  estimatedDays: string;
}

interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

interface TrackingInfo {
  trackingNumber: string;
  carrier: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'exception';
  estimatedDelivery: string;
  currentLocation: string;
  events: TrackingEvent[];
}

const initialCarriers: Carrier[] = [
  {
    id: 'ups',
    name: 'UPS',
    logo: '📦',
    status: 'connected',
    apiKey: 'ups_live_1234567890abcdef',
    lastTested: '2 hours ago',
  },
  {
    id: 'royal-mail',
    name: 'Royal Mail',
    logo: '✉️',
    status: 'connected',
    apiKey: 'rm_live_abcdef1234567890',
    lastTested: '1 day ago',
  },
  {
    id: 'fedex',
    name: 'FedEx',
    logo: '🚚',
    status: 'disconnected',
    apiKey: '',
    lastTested: null,
  },
];

const initialRules: ShippingRule[] = [
  {
    id: '1',
    minWeight: 0,
    maxWeight: 0.5,
    carrier: 'Royal Mail',
    serviceType: 'First Class',
    estimatedDays: '1-2',
  },
  {
    id: '2',
    minWeight: 0.5,
    maxWeight: 2,
    carrier: 'Royal Mail',
    serviceType: 'Second Class',
    estimatedDays: '2-3',
  },
  {
    id: '3',
    minWeight: 2,
    maxWeight: 5,
    carrier: 'UPS',
    serviceType: 'Ground',
    estimatedDays: '3-5',
  },
  {
    id: '4',
    minWeight: 5,
    maxWeight: 20,
    carrier: 'UPS',
    serviceType: 'Standard',
    estimatedDays: '4-6',
  },
];

export function ShippingIntegration() {
  const [carriers, setCarriers] = useState<Carrier[]>(initialCarriers);
  const [rules, setRules] = useState<ShippingRule[]>(initialRules);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleTestConnection = (carrierId: string) => {
    setCarriers((prev) =>
      prev.map((carrier) =>
        carrier.id === carrierId
          ? { ...carrier, status: 'testing' as ConnectionStatus }
          : carrier
      )
    );

    setTimeout(() => {
      setCarriers((prev) =>
        prev.map((carrier) =>
          carrier.id === carrierId
            ? {
                ...carrier,
                status: carrier.apiKey ? ('connected' as ConnectionStatus) : ('error' as ConnectionStatus),
                lastTested: carrier.apiKey ? 'Just now' : null,
              }
            : carrier
        )
      );
    }, 1500);
  };

  const handleApiKeyChange = (carrierId: string, value: string) => {
    setCarriers((prev) =>
      prev.map((carrier) =>
        carrier.id === carrierId
          ? { ...carrier, apiKey: value, status: 'disconnected' as ConnectionStatus }
          : carrier
      )
    );
  };

  const toggleApiKeyVisibility = (carrierId: string) => {
    setShowApiKey((prev) => ({ ...prev, [carrierId]: !prev[carrierId] }));
  };

  const handleTrackPackage = () => {
    if (!trackingNumber.trim()) return;

    setIsTracking(true);

    // Simulate API call
    setTimeout(() => {
      setTrackingInfo({
        trackingNumber: trackingNumber,
        carrier: 'UPS',
        status: 'in-transit',
        estimatedDelivery: 'March 17, 2026',
        currentLocation: 'Birmingham Distribution Center, UK',
        events: [
          {
            timestamp: 'Mar 15, 2026 2:45 PM',
            location: 'Birmingham Distribution Center, UK',
            status: 'In Transit',
            description: 'Package is in transit to the next facility',
          },
          {
            timestamp: 'Mar 15, 2026 8:30 AM',
            location: 'London Sorting Facility, UK',
            status: 'Departed',
            description: 'Package has departed from sorting facility',
          },
          {
            timestamp: 'Mar 14, 2026 6:15 PM',
            location: 'London Sorting Facility, UK',
            status: 'Arrived',
            description: 'Package arrived at sorting facility',
          },
          {
            timestamp: 'Mar 14, 2026 2:00 PM',
            location: 'Page & Prose Warehouse, London',
            status: 'Picked Up',
            description: 'Package picked up by carrier',
          },
        ],
      });
      setIsTracking(false);
    }, 1000);
  };

  const getStatusBadge = (status: ConnectionStatus) => {
    const configs = {
      connected: {
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
        label: 'Connected',
      },
      disconnected: {
        color: 'bg-slate-100 text-slate-600 border-slate-300',
        icon: XCircle,
        label: 'Disconnected',
      },
      testing: {
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        icon: AlertCircle,
        label: 'Testing...',
      },
      error: {
        color: 'bg-red-100 text-red-700 border-red-300',
        icon: XCircle,
        label: 'Error',
      },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} hover:${config.color} gap-1.5`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </Badge>
    );
  };

  const getTrackingStatusBadge = (status: TrackingInfo['status']) => {
    const configs = {
      'in-transit': 'bg-blue-100 text-blue-700 border-blue-300',
      delivered: 'bg-green-100 text-green-700 border-green-300',
      pending: 'bg-amber-100 text-amber-700 border-amber-300',
      exception: 'bg-red-100 text-red-700 border-red-300',
    };

    const labels = {
      'in-transit': 'In Transit',
      delivered: 'Delivered',
      pending: 'Pending',
      exception: 'Exception',
    };

    return (
      <Badge className={`${configs[status]} hover:${configs[status]}`}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A68A64] to-[#8B7355] flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Shipping Integration</h1>
                <p className="text-sm text-slate-500">Manage carrier connections and shipping rules</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Active Carriers</p>
                <p className="text-2xl font-semibold text-[#4A7C2C]">
                  {carriers.filter((c) => c.status === 'connected').length}/{carriers.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-6 space-y-6">
        {/* Carrier Cards */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Shipping Carriers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carriers.map((carrier) => (
              <Card key={carrier.id} className="border-slate-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{carrier.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{carrier.name}</CardTitle>
                        {carrier.lastTested && (
                          <p className="text-xs text-slate-500 mt-1">
                            Tested {carrier.lastTested}
                          </p>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(carrier.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* API Key Input */}
                  <div className="space-y-2">
                    <Label htmlFor={`api-key-${carrier.id}`} className="text-xs">
                      API Key
                    </Label>
                    <div className="relative">
                      <Input
                        id={`api-key-${carrier.id}`}
                        type={showApiKey[carrier.id] ? 'text' : 'password'}
                        value={carrier.apiKey}
                        onChange={(e) => handleApiKeyChange(carrier.id, e.target.value)}
                        placeholder="Enter API key..."
                        className="pr-10 font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => toggleApiKeyVisibility(carrier.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showApiKey[carrier.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Test Connection Button */}
                  <Button
                    onClick={() => handleTestConnection(carrier.id)}
                    disabled={!carrier.apiKey || carrier.status === 'testing'}
                    className="w-full bg-[#A68A64] hover:bg-[#8B7355] disabled:bg-slate-300"
                  >
                    {carrier.status === 'testing' ? 'Testing...' : 'Test Connection'}
                  </Button>

                  {carrier.status === 'error' && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-900">
                        Connection failed. Please check your API key and try again.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shipping Rules Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Shipping Rules</h2>
            <Button className="gap-2 bg-[#4A7C2C] hover:bg-[#3A621C]">
              <Plus className="w-4 h-4" />
              Add Rule
            </Button>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Weight Range (kg)</TableHead>
                  <TableHead className="font-semibold text-slate-700">Carrier</TableHead>
                  <TableHead className="font-semibold text-slate-700">Service Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Est. Delivery</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">
                      {rule.minWeight} - {rule.maxWeight} kg
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {carriers.find((c) => c.name === rule.carrier)?.logo}
                        </span>
                        <span className="font-medium text-slate-900">{rule.carrier}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">{rule.serviceType}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                        {rule.estimatedDays} days
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="w-3.5 h-3.5 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Live Tracking Lookup */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Track Shipment</h2>
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Tracking Input */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label htmlFor="tracking-number" className="text-sm mb-2 block">
                      Tracking Number
                    </Label>
                    <Input
                      id="tracking-number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number..."
                      className="font-mono"
                      onKeyDown={(e) => e.key === 'Enter' && handleTrackPackage()}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleTrackPackage}
                      disabled={!trackingNumber.trim() || isTracking}
                      className="gap-2 bg-[#A68A64] hover:bg-[#8B7355]"
                    >
                      <Search className="w-4 h-4" />
                      {isTracking ? 'Tracking...' : 'Track'}
                    </Button>
                  </div>
                </div>

                {/* Tracking Results */}
                {trackingInfo && (
                  <div className="mt-6 space-y-4 pt-6 border-t border-slate-200">
                    {/* Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                          Tracking Number
                        </p>
                        <p className="font-mono font-semibold text-slate-900">
                          {trackingInfo.trackingNumber}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Carrier</p>
                        <p className="font-semibold text-slate-900">{trackingInfo.carrier}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Status</p>
                        {getTrackingStatusBadge(trackingInfo.status)}
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                          Est. Delivery
                        </p>
                        <p className="font-semibold text-slate-900">{trackingInfo.estimatedDelivery}</p>
                      </div>
                    </div>

                    {/* Current Location */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <MapPin className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900 text-sm">Current Location</p>
                        <p className="text-blue-800 text-sm mt-1">{trackingInfo.currentLocation}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#A68A64]" />
                        Tracking History
                      </p>
                      <div className="space-y-3">
                        {trackingInfo.events.map((event, index) => (
                          <div
                            key={index}
                            className="flex gap-4 relative"
                          >
                            {/* Timeline Line */}
                            {index < trackingInfo.events.length - 1 && (
                              <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-slate-200" />
                            )}

                            {/* Timeline Dot */}
                            <div className="relative">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  index === 0
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'bg-white border-slate-300'
                                }`}
                              />
                            </div>

                            {/* Event Details */}
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between mb-1">
                                <p className="font-semibold text-slate-900 text-sm">{event.status}</p>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  {event.timestamp}
                                </div>
                              </div>
                              <p className="text-sm text-slate-600">{event.description}</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <p className="text-xs text-slate-500">{event.location}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
