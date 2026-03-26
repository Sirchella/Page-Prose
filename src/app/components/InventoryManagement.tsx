import { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Edit3,
  TrendingDown,
  ShoppingCart,
  Box,
  AlertCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';

interface InventoryItem {
  id: string;
  title: string;
  author: string;
  currentStock: number;
  reservedUnits: number;
  restockThreshold: number;
}

const generateInventoryData = (): InventoryItem[] => {
  return [
    { id: 'BK1001', title: 'The Silent Echo', author: 'Emma Richardson', currentStock: 45, reservedUnits: 8, restockThreshold: 20 },
    { id: 'BK1002', title: 'Whispers in Time', author: 'James Mitchell', currentStock: 12, reservedUnits: 5, restockThreshold: 15 },
    { id: 'BK1003', title: 'Beyond the Horizon', author: 'Sarah Chen', currentStock: 78, reservedUnits: 12, restockThreshold: 25 },
    { id: 'BK1004', title: 'The Last Garden', author: 'David Walsh', currentStock: 8, reservedUnits: 3, restockThreshold: 20 },
    { id: 'BK1005', title: 'Midnight Chronicles', author: 'Maria Garcia', currentStock: 156, reservedUnits: 22, restockThreshold: 30 },
    { id: 'BK1006', title: 'The Forgotten Path', author: 'Robert Foster', currentStock: 34, reservedUnits: 7, restockThreshold: 25 },
    { id: 'BK1007', title: 'Echoes of Tomorrow', author: 'Lisa Anderson', currentStock: 18, reservedUnits: 9, restockThreshold: 20 },
    { id: 'BK1008', title: 'The Silver Thread', author: 'Michael Brown', currentStock: 5, reservedUnits: 2, restockThreshold: 15 },
    { id: 'BK1009', title: 'Dancing with Shadows', author: 'Jennifer Lee', currentStock: 92, reservedUnits: 14, restockThreshold: 20 },
    { id: 'BK1010', title: 'The Crimson Key', author: 'Thomas Wright', currentStock: 23, reservedUnits: 6, restockThreshold: 25 },
    { id: 'BK1011', title: 'Tales of the North', author: 'Amy Carter', currentStock: 67, reservedUnits: 11, restockThreshold: 20 },
    { id: 'BK1012', title: 'The Ancient Code', author: 'Daniel Moore', currentStock: 14, reservedUnits: 4, restockThreshold: 18 },
    { id: 'BK1013', title: 'Beneath the Stars', author: 'Rachel Green', currentStock: 103, reservedUnits: 18, restockThreshold: 30 },
    { id: 'BK1014', title: 'The Hidden Door', author: 'Christopher Davis', currentStock: 7, reservedUnits: 3, restockThreshold: 20 },
    { id: 'BK1015', title: 'Waves of Memory', author: 'Laura Martinez', currentStock: 41, reservedUnits: 9, restockThreshold: 25 },
    { id: 'BK1016', title: 'The Eternal Flame', author: 'Kevin Taylor', currentStock: 19, reservedUnits: 5, restockThreshold: 22 },
    { id: 'BK1017', title: 'Secrets of the Sea', author: 'Emma Richardson', currentStock: 88, reservedUnits: 16, restockThreshold: 20 },
    { id: 'BK1018', title: 'The Golden Hour', author: 'James Mitchell', currentStock: 11, reservedUnits: 4, restockThreshold: 20 },
  ];
};

type StockStatus = 'critical' | 'low' | 'good';

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(generateInventoryData());
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract' | 'set'>('add');

  const getStockStatus = (item: InventoryItem): StockStatus => {
    const available = item.currentStock - item.reservedUnits;
    if (available <= item.restockThreshold * 0.5) return 'critical';
    if (available <= item.restockThreshold) return 'low';
    return 'good';
  };

  const lowStockItems = inventory.filter((item) => {
    const status = getStockStatus(item);
    return status === 'critical' || status === 'low';
  });

  const criticalStockItems = inventory.filter((item) => getStockStatus(item) === 'critical');

  const handleAdjustStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setAdjustmentValue('');
    setAdjustmentType('add');
    setAdjustDialogOpen(true);
  };

  const handleSaveAdjustment = () => {
    if (!selectedItem || !adjustmentValue) return;

    const value = parseInt(adjustmentValue);
    if (isNaN(value)) return;

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== selectedItem.id) return item;

        let newStock = item.currentStock;
        if (adjustmentType === 'add') {
          newStock += value;
        } else if (adjustmentType === 'subtract') {
          newStock = Math.max(0, newStock - value);
        } else {
          newStock = value;
        }

        return { ...item, currentStock: newStock };
      })
    );

    setAdjustDialogOpen(false);
    setSelectedItem(null);
    setAdjustmentValue('');
  };

  const calculateNewStock = () => {
    if (!selectedItem || !adjustmentValue || isNaN(parseInt(adjustmentValue))) return null;
    
    const value = parseInt(adjustmentValue);
    if (adjustmentType === 'add') {
      return selectedItem.currentStock + value;
    } else if (adjustmentType === 'subtract') {
      return Math.max(0, selectedItem.currentStock - value);
    } else {
      return value;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-slate-700" />
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Inventory Management</h1>
                <p className="text-sm text-slate-500">Live stock overview with cart reservations</p>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Products</p>
                <p className="text-2xl font-semibold text-slate-900">{inventory.length}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Low Stock Items</p>
                <p className="text-2xl font-semibold text-amber-600">{lowStockItems.length}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Critical Stock</p>
                <p className="text-2xl font-semibold text-red-600">{criticalStockItems.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-6">
        {/* Low Stock Alert Banner */}
        {lowStockItems.length > 0 && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-900 font-semibold">Low Stock Alert</AlertTitle>
            <AlertDescription className="text-amber-800">
              <span className="font-medium">{lowStockItems.length} item(s)</span> are running low on available
              stock.{' '}
              {criticalStockItems.length > 0 && (
                <>
                  <span className="font-semibold text-red-700">{criticalStockItems.length} item(s)</span> are at
                  critical levels and need immediate attention.
                </>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Critical Items Quick View */}
        {criticalStockItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">Critical Stock Items - Immediate Action Required</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {criticalStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white rounded px-3 py-2 border border-red-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-600">
                          Available: <span className="font-semibold text-red-700">{item.currentStock - item.reservedUnits}</span> units
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAdjustStock(item)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Restock
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Product ID</TableHead>
                  <TableHead className="font-semibold text-slate-700 min-w-[280px]">Book Title</TableHead>
                  <TableHead className="font-semibold text-slate-700 min-w-[160px]">Author</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Box className="w-4 h-4" />
                      Current Stock
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Reserved
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Package className="w-4 h-4" />
                      Available
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Threshold
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => {
                  const available = item.currentStock - item.reservedUnits;
                  const status = getStockStatus(item);

                  return (
                    <TableRow key={item.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm text-slate-600">{item.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{item.title}</TableCell>
                      <TableCell className="text-slate-700">{item.author}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-slate-900">{item.currentStock}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {item.reservedUnits} in carts
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-semibold ${
                            status === 'critical'
                              ? 'text-red-700'
                              : status === 'low'
                              ? 'text-amber-700'
                              : 'text-green-700'
                          }`}
                        >
                          {available}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-slate-600">{item.restockThreshold}</TableCell>
                      <TableCell className="text-center">
                        {status === 'critical' && (
                          <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-100">
                            Critical
                          </Badge>
                        )}
                        {status === 'low' && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100">
                            Low Stock
                          </Badge>
                        )}
                        {status === 'good' && (
                          <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-100">
                            Good
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAdjustStock(item)}
                          className="gap-2 border-slate-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Adjust
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6 text-sm">
          <span className="text-slate-600 font-medium">Status Indicators:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-600">Good (Above threshold)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600">Low Stock (At or below threshold)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-600">Critical (50% of threshold or less)</span>
          </div>
        </div>
      </div>

      {/* Stock Adjustment Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Adjust Stock Level</DialogTitle>
            <DialogDescription>
              Update inventory for{' '}
              <span className="font-semibold text-slate-900">{selectedItem?.title}</span>
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4">
              {/* Current Info */}
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current Stock:</span>
                  <span className="font-semibold text-slate-900">{selectedItem.currentStock} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Reserved (in carts):</span>
                  <span className="font-semibold text-blue-700">{selectedItem.reservedUnits} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Available:</span>
                  <span className="font-semibold text-green-700">
                    {selectedItem.currentStock - selectedItem.reservedUnits} units
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                  <span className="text-slate-600">Restock Threshold:</span>
                  <span className="font-semibold text-slate-900">{selectedItem.restockThreshold} units</span>
                </div>
              </div>

              {/* Adjustment Type */}
              <div className="space-y-2">
                <Label>Adjustment Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={adjustmentType === 'add' ? 'default' : 'outline'}
                    className={adjustmentType === 'add' ? 'bg-slate-700 hover:bg-slate-800' : ''}
                    onClick={() => setAdjustmentType('add')}
                  >
                    Add Stock
                  </Button>
                  <Button
                    type="button"
                    variant={adjustmentType === 'subtract' ? 'default' : 'outline'}
                    className={adjustmentType === 'subtract' ? 'bg-slate-700 hover:bg-slate-800' : ''}
                    onClick={() => setAdjustmentType('subtract')}
                  >
                    Remove Stock
                  </Button>
                  <Button
                    type="button"
                    variant={adjustmentType === 'set' ? 'default' : 'outline'}
                    className={adjustmentType === 'set' ? 'bg-slate-700 hover:bg-slate-800' : ''}
                    onClick={() => setAdjustmentType('set')}
                  >
                    Set to Value
                  </Button>
                </div>
              </div>

              {/* Value Input */}
              <div className="space-y-2">
                <Label htmlFor="adjustment-value">
                  {adjustmentType === 'add' && 'Units to Add'}
                  {adjustmentType === 'subtract' && 'Units to Remove'}
                  {adjustmentType === 'set' && 'New Stock Level'}
                </Label>
                <Input
                  id="adjustment-value"
                  type="number"
                  min="0"
                  value={adjustmentValue}
                  onChange={(e) => setAdjustmentValue(e.target.value)}
                  placeholder="Enter quantity"
                  className="text-lg"
                />
              </div>

              {/* Preview */}
              {calculateNewStock() !== null && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">New stock level will be: </span>
                    {calculateNewStock()} units
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveAdjustment}
              disabled={!adjustmentValue || isNaN(parseInt(adjustmentValue))}
              className="bg-slate-700 hover:bg-slate-800"
            >
              Save Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}