import { useState, useMemo } from 'react';
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

type PaymentMethod = 'Stripe' | 'PayPal';
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
  const methods: PaymentMethod[] = ['Stripe', 'PayPal'];

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

export function PaymentsOverview() {
  const [transactions, setTransactions] = useState<Transaction[]>(generateTransactions());
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

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
      Success: 'bg-green-100 text-green-800 border-green-300',
      Pending: 'bg-amber-100 text-amber-800 border-amber-300',
      Failed: 'bg-red-100 text-red-800 border-red-300',
      Refunded: 'bg-slate-100 text-slate-700 border-slate-300',
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
      Stripe: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      PayPal: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    return (
      <Badge variant="outline" className={configs[method]}>
        {method}
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
              <CreditCard className="w-8 h-8 text-slate-700" />
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Payments Overview</h1>
                <p className="text-sm text-slate-500">Transaction monitoring and management</p>
              </div>
            </div>

            <Button variant="outline" className="gap-2 border-slate-300">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Total Collected Today</CardTitle>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-700" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                ${totalCollectedToday.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {todayTransactions.filter((tx) => tx.status === 'Success').length} successful transactions
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Pending Transactions</CardTitle>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-700" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-700">{pendingCount}</div>
              <p className="text-sm text-slate-600 mt-1">
                ${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in pending
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">Failed Transactions</CardTitle>
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-700" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{failedCount}</div>
              <p className="text-sm text-slate-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filter by status:</span>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] border-slate-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-slate-500">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
        </div>

        {/* Transaction Table */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Transaction ID</TableHead>
                  <TableHead className="font-semibold text-slate-700 min-w-[200px]">Customer</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Payment Method</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date & Time</TableHead>
                  <TableHead className="font-semibold text-slate-700">Order ID</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-slate-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm text-slate-900 font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{transaction.customer}</p>
                          <p className="text-sm text-slate-500">{transaction.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-slate-900">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getPaymentMethodBadge(transaction.paymentMethod)}
                      </TableCell>
                      <TableCell className="text-center">{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium text-slate-900">{transaction.date}</p>
                          <p className="text-slate-500">{transaction.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-slate-600">
                        {transaction.orderId}
                      </TableCell>
                      <TableCell className="text-right">
                        {transaction.status === 'Success' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRefundClick(transaction)}
                            className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Refund
                          </Button>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
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
        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Secure Payment Processing</p>
            <p className="text-blue-800">
              All transactions are processed through PCI-DSS compliant payment gateways. Refunds are processed
              immediately and typically appear in customer accounts within 5-10 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Refund Confirmation Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-slate-700" />
              Issue Refund
            </DialogTitle>
            <DialogDescription>
              You are about to issue a refund for this transaction. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4 py-4">
              {/* Transaction Details */}
              <div className="bg-slate-50 rounded-lg p-4 space-y-2 border border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Transaction ID:</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Customer:</span>
                  <span className="font-medium text-slate-900">{selectedTransaction.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Order ID:</span>
                  <span className="font-mono text-slate-900">{selectedTransaction.orderId}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-300">
                  <span className="text-slate-600">Refund Amount:</span>
                  <span className="text-lg font-bold text-slate-900">
                    ${selectedTransaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Payment Method:</span>
                  {getPaymentMethodBadge(selectedTransaction.paymentMethod)}
                </div>
              </div>

              {/* Refund Reason */}
              <div className="space-y-2">
                <Label htmlFor="refund-reason">Refund Reason (Optional)</Label>
                <Textarea
                  id="refund-reason"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Enter reason for refund (for internal records)..."
                  className="min-h-[80px] resize-none"
                />
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-900">
                    The customer will be notified via email once the refund is processed. Funds will be returned to
                    their original payment method.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
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