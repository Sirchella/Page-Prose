import { useState, useEffect } from 'react';
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
import { fetchBooks, updateBook } from '../api';

interface InventoryItem {
  id: string;
  title: string;
  author: string;
  currentStock: number;
  reservedUnits: number;
  restockThreshold: number;
}


type StockStatus = 'critical' | 'low' | 'good';

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetchBooks()
      .then(books => {
        if (books.length > 0) {
          setInventory(books.map(b => ({
            id: b.id.toString(),
            title: b.title,
            author: b.author,
            currentStock: b.stock,
            reservedUnits: 0,
            restockThreshold: 20,
          })));
        }
      })
      .catch(() => {});
  }, []);
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

  const handleSaveAdjustment = async () => {
    if (!selectedItem || !adjustmentValue) return;

    const value = parseInt(adjustmentValue);
    if (isNaN(value)) return;

    let newStock = selectedItem.currentStock;
    if (adjustmentType === 'add') newStock += value;
    else if (adjustmentType === 'subtract') newStock = Math.max(0, newStock - value);
    else newStock = value;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? { ...item, currentStock: newStock } : item
      )
    );

    // Persist to backend
    const form = new FormData();
    form.append('stock', String(newStock));
    updateBook(parseInt(selectedItem.id), form).catch(() => {});

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
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#262626]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-[#A68A64]" />
              <div>
                <h1 className="text-2xl font-semibold text-[#f5f5f5]">Inventory Management</h1>
                <p className="text-sm text-[#a3a3a3]">Live stock overview with cart reservations</p>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mb-1">Total Products</p>
                <p className="text-2xl font-semibold text-[#f5f5f5]">{inventory.length}</p>
              </div>
              <div className="w-px h-12 bg-[#262626]" />
              <div className="text-right">
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mb-1">Low Stock Items</p>
                <p className="text-2xl font-semibold text-amber-500">{lowStockItems.length}</p>
              </div>
              <div className="w-px h-12 bg-[#262626]" />
              <div className="text-right">
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mb-1">Critical Stock</p>
                <p className="text-2xl font-semibold text-red-500">{criticalStockItems.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-6">
        {/* Low Stock Alert Banner */}
        {lowStockItems.length > 0 && (
          <Alert className="mb-6 border-amber-800 bg-amber-950">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-300 font-semibold">Low Stock Alert</AlertTitle>
            <AlertDescription className="text-amber-400">
              <span className="font-medium">{lowStockItems.length} item(s)</span> are running low on available
              stock.{' '}
              {criticalStockItems.length > 0 && (
                <>
                  <span className="font-semibold text-red-400">{criticalStockItems.length} item(s)</span> are at
                  critical levels and need immediate attention.
                </>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Critical Items Quick View */}
        {criticalStockItems.length > 0 && (
          <div className="bg-red-950 border border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-300 mb-2">Critical Stock Items - Immediate Action Required</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {criticalStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-[#1a1a1a] rounded px-3 py-2 border border-red-800"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm text-[#f5f5f5]">{item.title}</p>
                        <p className="text-xs text-[#a3a3a3]">
                          Available: <span className="font-semibold text-red-400">{item.currentStock - item.reservedUnits}</span> units
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
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#262626] hover:bg-[#262626]">
                  <TableHead className="font-semibold text-[#f5f5f5]">Product ID</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] min-w-[280px]">Book Title</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] min-w-[160px]">Author</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Box className="w-4 h-4" />
                      Current Stock
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Reserved
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Package className="w-4 h-4" />
                      Available
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Threshold
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">Status</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => {
                  const available = item.currentStock - item.reservedUnits;
                  const status = getStockStatus(item);

                  return (
                    <TableRow key={item.id} className="border-[#262626] hover:bg-[#262626]">
                      <TableCell className="font-mono text-sm text-[#a3a3a3]">{item.id}</TableCell>
                      <TableCell className="font-medium text-[#f5f5f5]">{item.title}</TableCell>
                      <TableCell className="text-[#a3a3a3]">{item.author}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-[#f5f5f5]">{item.currentStock}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-950 text-blue-400 border-blue-700">
                          {item.reservedUnits} in carts
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-semibold ${
                            status === 'critical'
                              ? 'text-red-400'
                              : status === 'low'
                              ? 'text-amber-400'
                              : 'text-green-400'
                          }`}
                        >
                          {available}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-[#a3a3a3]">{item.restockThreshold}</TableCell>
                      <TableCell className="text-center">
                        {status === 'critical' && (
                          <Badge className="bg-red-950 text-red-400 border-red-700 hover:bg-red-950">
                            Critical
                          </Badge>
                        )}
                        {status === 'low' && (
                          <Badge className="bg-amber-950 text-amber-400 border-amber-700 hover:bg-amber-950">
                            Low Stock
                          </Badge>
                        )}
                        {status === 'good' && (
                          <Badge className="bg-green-950 text-green-400 border-green-700 hover:bg-green-950">
                            Good
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAdjustStock(item)}
                          className="gap-2 border-[#262626] text-[#f5f5f5] hover:bg-[#262626]"
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
          <span className="text-[#a3a3a3] font-medium">Status Indicators:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-[#a3a3a3]">Good (Above threshold)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[#a3a3a3]">Low Stock (At or below threshold)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[#a3a3a3]">Critical (50% of threshold or less)</span>
          </div>
        </div>
      </div>

      {/* Stock Adjustment Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#262626]">
          <DialogHeader>
            <DialogTitle className="text-[#f5f5f5]">Adjust Stock Level</DialogTitle>
            <DialogDescription className="text-[#a3a3a3]">
              Update inventory for{' '}
              <span className="font-semibold text-[#f5f5f5]">{selectedItem?.title}</span>
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4">
              {/* Current Info */}
              <div className="bg-[#262626] rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Current Stock:</span>
                  <span className="font-semibold text-[#f5f5f5]">{selectedItem.currentStock} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Reserved (in carts):</span>
                  <span className="font-semibold text-blue-400">{selectedItem.reservedUnits} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Available:</span>
                  <span className="font-semibold text-green-400">
                    {selectedItem.currentStock - selectedItem.reservedUnits} units
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#262626]">
                  <span className="text-[#a3a3a3]">Restock Threshold:</span>
                  <span className="font-semibold text-[#f5f5f5]">{selectedItem.restockThreshold} units</span>
                </div>
              </div>

              {/* Adjustment Type */}
              <div className="space-y-2">
                <Label className="text-[#f5f5f5]">Adjustment Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={adjustmentType === 'add' ? 'default' : 'outline'}
                    className={adjustmentType === 'add' ? 'bg-[#A68A64] hover:bg-[#8B7355]' : 'border-[#262626] text-[#f5f5f5] hover:bg-[#262626]'}
                    onClick={() => setAdjustmentType('add')}
                  >
                    Add Stock
                  </Button>
                  <Button
                    type="button"
                    variant={adjustmentType === 'subtract' ? 'default' : 'outline'}
                    className={adjustmentType === 'subtract' ? 'bg-[#A68A64] hover:bg-[#8B7355]' : 'border-[#262626] text-[#f5f5f5] hover:bg-[#262626]'}
                    onClick={() => setAdjustmentType('subtract')}
                  >
                    Remove Stock
                  </Button>
                  <Button
                    type="button"
                    variant={adjustmentType === 'set' ? 'default' : 'outline'}
                    className={adjustmentType === 'set' ? 'bg-[#A68A64] hover:bg-[#8B7355]' : 'border-[#262626] text-[#f5f5f5] hover:bg-[#262626]'}
                    onClick={() => setAdjustmentType('set')}
                  >
                    Set to Value
                  </Button>
                </div>
              </div>

              {/* Value Input */}
              <div className="space-y-2">
                <Label htmlFor="adjustment-value" className="text-[#f5f5f5]">
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
                  className="text-lg bg-[#262626] border-[#262626] text-[#f5f5f5] placeholder:text-[#a3a3a3]"
                />
              </div>

              {/* Preview */}
              {calculateNewStock() !== null && (
                <div className="bg-blue-950 border border-blue-700 rounded-lg p-3">
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold">New stock level will be: </span>
                    {calculateNewStock()} units
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustDialogOpen(false)} className="border-[#262626] text-[#f5f5f5] hover:bg-[#262626]">
              Cancel
            </Button>
            <Button
              onClick={handleSaveAdjustment}
              disabled={!adjustmentValue || isNaN(parseInt(adjustmentValue))}
              className="bg-[#A68A64] hover:bg-[#8B7355]"
            >
              Save Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
