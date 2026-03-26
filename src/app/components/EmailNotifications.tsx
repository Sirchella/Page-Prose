import { useState, useMemo } from 'react';
import {
  Mail,
  Eye,
  Edit3,
  Send,
  Copy,
  CheckCircle,
  XCircle,
  Info,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
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
import { Card, CardContent } from './ui/card';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  enabled: boolean;
  category: 'order' | 'inventory' | 'marketing';
  variables: string[];
}

const availableVariables = [
  { tag: '{{customer_name}}', description: 'Customer full name' },
  { tag: '{{customer_email}}', description: 'Customer email address' },
  { tag: '{{order_id}}', description: 'Order ID' },
  { tag: '{{order_total}}', description: 'Order total amount' },
  { tag: '{{order_date}}', description: 'Order date' },
  { tag: '{{tracking_number}}', description: 'Shipment tracking number' },
  { tag: '{{product_name}}', description: 'Product name' },
  { tag: '{{stock_level}}', description: 'Current stock level' },
  { tag: '{{cart_items}}', description: 'Cart items list' },
  { tag: '{{cart_total}}', description: 'Cart total value' },
];

const initialTemplates: EmailTemplate[] = [
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    description: 'Sent immediately after order is placed',
    subject: 'Order Confirmation - {{order_id}}',
    body: 'Dear {{customer_name}},\n\nThank you for your order at Page & Prose! We\'re delighted to confirm your purchase.\n\nOrder Details:\nOrder ID: {{order_id}}\nOrder Date: {{order_date}}\nTotal: ${{order_total}}\n\nWe\'ll send you another email once your order ships. You can track your order status anytime by visiting your account.\n\nHappy reading!\n\nBest regards,\nThe Page & Prose Team',
    enabled: true,
    category: 'order',
    variables: ['{{customer_name}}', '{{order_id}}', '{{order_date}}', '{{order_total}}'],
  },
  {
    id: 'dispatch-alert',
    name: 'Dispatch Alert',
    description: 'Sent when order is shipped',
    subject: 'Your Order {{order_id}} Has Been Shipped!',
    body: 'Hello {{customer_name}},\n\nGreat news! Your order has been shipped and is on its way to you.\n\nTracking Information:\nOrder ID: {{order_id}}\nTracking Number: {{tracking_number}}\n\nYou can track your shipment using the tracking number above. Your books should arrive within 3-5 business days.\n\nThank you for choosing Page & Prose!\n\nBest regards,\nThe Page & Prose Team',
    enabled: true,
    category: 'order',
    variables: ['{{customer_name}}', '{{order_id}}', '{{tracking_number}}'],
  },
  {
    id: 'low-stock-warning',
    name: 'Low Stock Warning',
    description: 'Sent to admin when stock falls below threshold',
    subject: 'ALERT: Low Stock - {{product_name}}',
    body: 'Low Stock Alert\n\nProduct: {{product_name}}\nCurrent Stock Level: {{stock_level}} units\n\nThis product has fallen below the restock threshold and requires immediate attention.\n\nPlease review inventory and initiate restocking procedures.\n\nThis is an automated message from your Page & Prose Inventory System.',
    enabled: true,
    category: 'inventory',
    variables: ['{{product_name}}', '{{stock_level}}'],
  },
  {
    id: 'abandoned-cart',
    name: 'Abandoned Cart Reminder',
    description: 'Sent 24 hours after cart abandonment',
    subject: 'Don\'t Forget Your Books, {{customer_name}}!',
    body: 'Hello {{customer_name}},\n\nWe noticed you left some wonderful books in your cart at Page & Prose. They\'re still waiting for you!\n\nYour Cart:\n{{cart_items}}\n\nTotal Value: ${{cart_total}}\n\nThese books won\'t last forever - complete your purchase today and dive into your next great read.\n\n[Complete Your Purchase]\n\nHappy reading!\n\nThe Page & Prose Team',
    enabled: false,
    category: 'marketing',
    variables: ['{{customer_name}}', '{{cart_items}}', '{{cart_total}}'],
  },
];

export function EmailNotifications() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [testEmailSent, setTestEmailSent] = useState(false);
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);

  const handleToggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === id ? { ...template, enabled: !template.enabled } : template
      )
    );
  };

  const handleEditClick = (template: EmailTemplate) => {
    setEditingTemplate({ ...template });
    setEditDialogOpen(true);
    setTestEmailSent(false);
  };

  const handlePreviewClick = (template: EmailTemplate) => {
    setPreviewTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;

    setTemplates((prev) =>
      prev.map((template) =>
        template.id === editingTemplate.id ? editingTemplate : template
      )
    );

    setEditDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleSendTestEmail = () => {
    setTestEmailSent(true);
    setTimeout(() => setTestEmailSent(false), 3000);
  };

  const handleCopyVariable = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVariable(variable);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  const getCategoryBadge = (category: EmailTemplate['category']) => {
    const configs = {
      order: 'bg-blue-100 text-blue-700 border-blue-300',
      inventory: 'bg-amber-100 text-amber-700 border-amber-300',
      marketing: 'bg-purple-100 text-purple-700 border-purple-300',
    };

    const labels = {
      order: 'Order',
      inventory: 'Inventory',
      marketing: 'Marketing',
    };

    return (
      <Badge variant="outline" className={configs[category]}>
        {labels[category]}
      </Badge>
    );
  };

  const renderPreview = (text: string) => {
    let rendered = text;
    const sampleData: Record<string, string> = {
      '{{customer_name}}': 'Sarah Johnson',
      '{{customer_email}}': 'sarah.j@email.com',
      '{{order_id}}': 'ORD03024',
      '{{order_total}}': '87.50',
      '{{order_date}}': 'March 15, 2026',
      '{{tracking_number}}': '1Z999AA10123456784',
      '{{product_name}}': 'The Silent Echo',
      '{{stock_level}}': '8',
      '{{cart_items}}': '• The Silent Echo\n• Whispers in Time\n• Beyond the Horizon',
      '{{cart_total}}': '62.97',
    };

    Object.entries(sampleData).forEach(([variable, value]) => {
      rendered = rendered.replace(new RegExp(variable.replace(/[{}]/g, '\\$&'), 'g'), value);
    });

    return rendered;
  };

  const enabledCount = templates.filter((t) => t.enabled).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A68A64] to-[#8B7355] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Email Notifications</h1>
                <p className="text-sm text-slate-500">Manage automated email templates and settings</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Templates</p>
                <p className="text-2xl font-semibold text-slate-900">{templates.length}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Active</p>
                <p className="text-2xl font-semibold text-[#4A7C2C]">{enabledCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-6">
        {/* Info Card */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900 mb-1">Automated Email System</p>
                <p className="text-blue-800">
                  Configure automated email notifications for your customers and internal alerts. Use dynamic
                  variables to personalize content. All emails are sent through a secure, reliable email service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Table */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700 w-[50px]">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Template Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Description</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Category</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center">Variables</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id} className="hover:bg-slate-50">
                    <TableCell>
                      <Switch
                        checked={template.enabled}
                        onCheckedChange={() => handleToggleTemplate(template.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {template.enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-400" />
                        )}
                        <span className="font-medium text-slate-900">{template.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{template.description}</TableCell>
                    <TableCell className="text-center">{getCategoryBadge(template.category)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-300">
                        {template.variables.length} variables
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewClick(template)}
                          className="gap-2 border-slate-300"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(template)}
                          className="gap-2 border-[#A68A64] text-[#A68A64] hover:bg-[#A68A64] hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#A68A64]" />
              Edit Email Template
            </DialogTitle>
            <DialogDescription>
              Customize the email template using dynamic variables. Changes are saved immediately.
            </DialogDescription>
          </DialogHeader>

          {editingTemplate && (
            <div className="space-y-6 py-4">
              {/* Template Name */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{editingTemplate.name}</p>
                    <p className="text-sm text-slate-600">{editingTemplate.description}</p>
                  </div>
                  {getCategoryBadge(editingTemplate.category)}
                </div>
              </div>

              {/* Subject Line */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={editingTemplate.subject}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                  }
                  placeholder="Enter email subject..."
                  className="text-base"
                />
              </div>

              {/* Email Body */}
              <div className="space-y-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={editingTemplate.body}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, body: e.target.value })
                  }
                  placeholder="Enter email content..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              {/* Available Variables */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A68A64]" />
                  <Label>Available Variables</Label>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  {availableVariables.map((variable) => (
                    <div
                      key={variable.tag}
                      className="flex items-center justify-between p-2 bg-white rounded border border-slate-200 hover:border-[#A68A64] transition-colors"
                    >
                      <div className="flex-1">
                        <code className="text-xs font-mono text-[#A68A64] font-semibold">
                          {variable.tag}
                        </code>
                        <p className="text-xs text-slate-600 mt-0.5">{variable.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyVariable(variable.tag)}
                        className="ml-2 h-8 w-8 p-0"
                      >
                        {copiedVariable === variable.tag ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Click the copy icon to copy a variable, then paste it into your email template.
                </p>
              </div>

              {/* Test Email */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <p className="font-semibold text-blue-900 text-sm">Send Test Email</p>
                    <p className="text-xs text-blue-800 mt-1">
                      Preview this template in your inbox with sample data
                    </p>
                  </div>
                  <Button
                    onClick={handleSendTestEmail}
                    className="gap-2 bg-[#4A7C2C] hover:bg-[#3A621C]"
                    disabled={testEmailSent}
                  >
                    {testEmailSent ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Test
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTemplate}
              className="gap-2 bg-[#A68A64] hover:bg-[#8B7355]"
            >
              <CheckCircle className="w-4 h-4" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="bg-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#A68A64]" />
              Email Preview
            </DialogTitle>
            <DialogDescription>
              Preview how this email will appear to recipients (using sample data)
            </DialogDescription>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-4 py-4">
              {/* Email Header */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-semibold text-slate-700 w-20">From:</span>
                      <span className="text-slate-900">Page & Prose &lt;noreply@pageandprose.com&gt;</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-slate-700 w-20">To:</span>
                      <span className="text-slate-900">customer@email.com</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-slate-700 w-20">Subject:</span>
                      <span className="text-slate-900 font-medium">
                        {renderPreview(previewTemplate.subject)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-6 bg-white">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-900 leading-relaxed">
                    {renderPreview(previewTemplate.body)}
                  </pre>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-900">
                  This preview uses sample data. Actual emails will use real customer and order information.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setPreviewDialogOpen(false)} className="bg-slate-700 hover:bg-slate-800">
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}