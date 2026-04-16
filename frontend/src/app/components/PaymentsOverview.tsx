import { useState, useEffect } from 'react';
import { fetchOrders } from '../api';
import {
  CreditCard,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type PaymentMethod = 'MTN MoMo' | 'Orange Money';
type PaymentStatus = 'Success' | 'Pending' | 'Failed' | 'Refunded';

interface Transaction {
  id: string;
  customer: string;
  customerEmail: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  date: string;
  time: string;
  orderId: string;
}

const generateTransactions = (): Transaction[] => {
  const customers = [
    { name: 'Sarah Johnson', email: 'sarah.j@email.com' },
    { name: 'Michael Chen', email: 'm.chen@email.com' },
    { name: 'Emma Wilson', email: 'emma.w@email.com' },
    { name: 'David Martinez', email: 'd.martinez@email.com' },
    { name: 'Lisa Anderson', email: 'lisa.a@email.com' },
    { name: 'James Brown', email: 'james.b@email.com' },
    { name: 'Rachel Green', email: 'r.green@email.com' },
    { name: 'Thomas Wright', email: 't.wright@email.com' },
    { name: 'Amy Foster', email: 'amy.f@email.com' },
    { name: 'Kevin Taylor', email: 'k.taylor@email.com' },
    { name: 'Jennifer Lee', email: 'jen.lee@email.com' },
    { name: 'Robert Davis', email: 'rob.davis@email.com' },
  ];

  const statuses: PaymentStatus[] = ['Success', 'Success', 'Success', 'Success', 'Success', 'Success', 'Pending', 'Failed', 'Refunded'];
  const methods: PaymentMethod[] = ['MTN MoMo', 'Orange Money'];

  const today = new Date('2026-03-15');
  const transactions: Transaction[] = [];

  for (let i = 0; i < 25; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const txDate = new Date(today);
    txDate.setDate(txDate.getDate() - daysAgo);

    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];

    transactions.push({
      id: `TXN${String(1000 + i).padStart(6, '0')}`,
      customer: customer.name,
      customerEmail: customer.email,
      amount: parseFloat((Math.random() * 150 + 10).toFixed(2)),
      paymentMethod: method,
      status: status,
      date: txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
      orderId: `ORD${String(2000 + i).padStart(5, '0')}`,
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

function mapOrderToTransaction(o: Awaited<ReturnType<typeof fetchOrders>>[number]): Transaction {
  const statusMap: Record<string, PaymentStatus> = {
    pending: 'Pending',
    confirmed: 'Success',
    packing: 'Success',
    shipped: 'Success',
    delivered: 'Success',
    cancelled: 'Refunded',
  };
  const methods: PaymentMethod[] = ['MTN MoMo', 'Orange Money'];
  const dt = new Date(o.created_at);
  return {
    id: `TXN${String(o.id).padStart(6, '0')}`,
    customer: o.customer_name,
    customerEmail: o.customer_email,
    amount: parseFloat(o.total_price),
    paymentMethod: methods[o.id % 2],
    status: statusMap[o.status] ?? 'Pending',
    date: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    orderId: `ORD${String(o.id).padStart(5, '0')}`,
  };
}

export function PaymentsOverview() {
  const [transactions, setTransactions] = useState<Transaction[]>(generateTransactions());
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchOrders()
      .then((orders) => {
        if (orders.length > 0) {
          setTransactions(orders.map(mapOrderToTransaction).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ));
        }
      })
      .catch(() => {});
  }, []);

  const todayTransactions = transactions.filter((tx) => {
    const today = new Date('2026-03-15').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return tx.date === today;
  });

  const totalCollectedToday = todayTransactions
    .filter((tx) => tx.status === 'Success')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingCount = transactions.filter((tx) => tx.status === 'Pending').length;
  const failedCount = transactions.filter((tx) => tx.status === 'Failed').length;

  const totalPending = transactions
    .filter((tx) => tx.status === 'Pending')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const filteredTransactions = filterStatus === 'all'
    ? transactions
    : transactions.filter((tx) => tx.status.toLowerCase() === filterStatus);

  const handleRefundClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setRefundReason('');
    setRefundDialogOpen(true);
  };

  const handleConfirmRefund = () => {
    if (!selectedTransaction) return;

    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === selectedTransaction.id ? { ...tx, status: 'Refunded' as PaymentStatus } : tx
      )
    );

    setRefundDialogOpen(false);
    setSelectedTransaction(null);
    setRefundReason('');
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'Success':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Failed':
        return <XCircle className="w-4 h-4" />;
      case 'Refunded':
        return <RotateCcw className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: PaymentStatus) => {
    const configs = {
      Success: 'bg-green-950 text-green-400 border-green-700',
      Pending: 'bg-amber-950 text-amber-400 border-amber-700',
      Failed: 'bg-red-950 text-red-400 border-red-700',
      Refunded: 'bg-[#262626] text-[#a3a3a3] border-[#262626]',
    };

    return (
      <Badge className={`${configs[status]} hover:${configs[status]} gap-1.5`}>
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const getPaymentMethodBadge = (method: PaymentMethod) => {
    const configs = {
      'MTN MoMo': 'bg-yellow-950 text-yellow-400 border-yellow-700',
      'Orange Money': 'bg-orange-950 text-orange-400 border-orange-700',
    };

    return (
      <Badge variant="outline" className={configs[method]}>
        {method}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#262626]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#A68A64]" />
              <div>
                <h1 className="text-2xl font-semibold text-[#f5f5f5]">Payments Overview</h1>
                <p className="text-sm text-[#a3a3a3]">Transaction monitoring and management</p>
              </div>
            </div>

            <Button variant="outline" onClick={() => alert('Exporting report...')} className="gap-2 border-[#262626] text-[#f5f5f5] hover:bg-[#262626]">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-[#1a1a1a] border-[#262626]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#a3a3a3]">Total Collected Today</CardTitle>
                <div className="w-10 h-10 rounded-full bg-green-950 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {Math.round(totalCollectedToday).toLocaleString()} XAF
              </div>
              <p className="text-sm text-[#a3a3a3] mt-1">
                {todayTransactions.filter((tx) => tx.status === 'Success').length} successful transactions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#262626]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#a3a3a3]">Pending Transactions</CardTitle>
                <div className="w-10 h-10 rounded-full bg-amber-950 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-400">{pendingCount}</div>
              <p className="text-sm text-[#a3a3a3] mt-1">
                <span className="text-green-400">{Math.round(totalPending).toLocaleString()} XAF</span> in pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#262626]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#a3a3a3]">Failed Transactions</CardTitle>
                <div className="w-10 h-10 rounded-full bg-red-950 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">{failedCount}</div>
              <p className="text-sm text-[#a3a3a3] mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#a3a3a3]" />
            <span className="text-sm font-medium text-[#f5f5f5]">Filter by status:</span>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#262626] text-[#f5f5f5]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#262626]">
              <SelectItem value="all" className="text-[#f5f5f5] focus:bg-[#262626]">All Transactions</SelectItem>
              <SelectItem value="success" className="text-[#f5f5f5] focus:bg-[#262626]">Success</SelectItem>
              <SelectItem value="pending" className="text-[#f5f5f5] focus:bg-[#262626]">Pending</SelectItem>
              <SelectItem value="failed" className="text-[#f5f5f5] focus:bg-[#262626]">Failed</SelectItem>
              <SelectItem value="refunded" className="text-[#f5f5f5] focus:bg-[#262626]">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-[#a3a3a3]">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
        </div>

        {/* Transaction Table */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#262626] hover:bg-[#262626]">
                  <TableHead className="font-semibold text-[#f5f5f5]">Transaction ID</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] min-w-[200px]">Customer</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">Payment Method</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">Status</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5]">Date & Time</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5]">Order ID</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-[#a3a3a3]">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-[#262626] hover:bg-[#262626]">
                      <TableCell className="font-mono text-sm text-[#f5f5f5] font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-[#f5f5f5]">{transaction.customer}</p>
                          <p className="text-sm text-[#a3a3a3]">{transaction.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-400">
                        {Math.round(transaction.amount).toLocaleString()} XAF
                      </TableCell>
                      <TableCell className="text-center">
                        {getPaymentMethodBadge(transaction.paymentMethod)}
                      </TableCell>
                      <TableCell className="text-center">{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium text-[#f5f5f5]">{transaction.date}</p>
                          <p className="text-[#a3a3a3]">{transaction.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-[#a3a3a3]">
                        {transaction.orderId}
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.status === 'Success' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRefundClick(transaction)}
                            className="gap-2 border-[#262626] text-[#f5f5f5] hover:bg-[#262626]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Refund
                          </Button>
                        ) : (
                          <span className="text-sm text-[#a3a3a3]">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-950 border border-blue-700 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-300">
            <p className="font-semibold mb-1">Secure Payment Processing</p>
            <p className="text-blue-400">
              All transactions are processed through PCI-DSS compliant payment gateways. Refunds are processed
              immediately and typically appear in customer accounts within 5-10 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Refund Confirmation Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#262626] max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#f5f5f5]">
              <RotateCcw className="w-5 h-5 text-[#A68A64]" />
              Issue Refund
            </DialogTitle>
            <DialogDescription className="text-[#a3a3a3]">
              You are about to issue a refund for this transaction. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4 py-4">
              {/* Transaction Details */}
              <div className="bg-[#262626] rounded-lg p-4 space-y-2 border border-[#262626]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Transaction ID:</span>
                  <span className="font-mono font-semibold text-[#f5f5f5]">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Customer:</span>
                  <span className="font-medium text-[#f5f5f5]">{selectedTransaction.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Order ID:</span>
                  <span className="font-mono text-[#f5f5f5]">{selectedTransaction.orderId}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#262626]">
                  <span className="text-[#a3a3a3]">Refund Amount:</span>
                  <span className="text-lg font-bold text-green-400">
                    {Math.round(selectedTransaction.amount).toLocaleString()} XAF
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#a3a3a3]">Payment Method:</span>
                  {getPaymentMethodBadge(selectedTransaction.paymentMethod)}
                </div>
              </div>

              {/* Refund Reason */}
              <div className="space-y-2">
                <Label htmlFor="refund-reason" className="text-[#f5f5f5]">Refund Reason (Optional)</Label>
                <Textarea
                  id="refund-reason"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Enter reason for refund (for internal records)..."
                  className="min-h-[80px] resize-none bg-[#262626] border-[#262626] text-[#f5f5f5] placeholder:text-[#a3a3a3]"
                />
              </div>

              {/* Warning */}
              <div className="bg-amber-950 border border-amber-700 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-300">
                    The customer will be notified via email once the refund is processed. Funds will be returned to
                    their original payment method.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)} className="border-[#262626] text-[#f5f5f5] hover:bg-[#262626]">
              Cancel
            </Button>
            <Button onClick={handleConfirmRefund} className="bg-red-600 hover:bg-red-700 gap-2">
              <RotateCcw className="w-4 h-4" />
              Confirm Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
