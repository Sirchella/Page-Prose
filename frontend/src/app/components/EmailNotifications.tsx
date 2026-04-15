import { useState, useMemo } from 'react';
import { sendTestEmail } from '../api';
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
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testEmailError, setTestEmailError] = useState<string | null>(null);
  const [testEmailLoading, setTestEmailLoading] = useState(false);
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

  const handleSendTestEmail = async () => {
    if (!testEmailAddress.trim()) {
      setTestEmailError('Enter an email address to send the test to.');
      return;
    }
    setTestEmailLoading(true);
    setTestEmailError(null);
    try {
      await sendTestEmail(testEmailAddress.trim());
      setTestEmailSent(true);
      setTimeout(() => setTestEmailSent(false), 4000);
    } catch (err: unknown) {
      setTestEmailError(err instanceof Error ? err.message : 'Failed to send test email.');
    } finally {
      setTestEmailLoading(false);
    }
  };

  const handleCopyVariable = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVariable(variable);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  const getCategoryBadge = (category: EmailTemplate['category']) => {
    const configs = {
      order: 'bg-blue-950 text-blue-400 border-blue-700',
      inventory: 'bg-amber-950 text-amber-400 border-amber-700',
      marketing: 'bg-purple-950 text-purple-400 border-purple-700',
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
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#262626]">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A68A64] to-[#8B7355] flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#f5f5f5]">Email Notifications</h1>
                <p className="text-sm text-[#a3a3a3]">Manage automated email templates and settings</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mb-1">Total Templates</p>
                <p className="text-2xl font-semibold text-[#f5f5f5]">{templates.length}</p>
              </div>
              <div className="w-px h-12 bg-[#262626]" />
              <div className="text-right">
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mb-1">Active</p>
                <p className="text-2xl font-semibold text-[#A68A64]">{enabledCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-6">
        {/* Info Card */}
        <Card className="mb-6 bg-blue-950 border-blue-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-blue-300 mb-1">Automated Email System</p>
                <p className="text-blue-400">
                  Configure automated email notifications for your customers and internal alerts. Use dynamic
                  variables to personalize content. All emails are sent through a secure, reliable email service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Table */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#262626] hover:bg-[#262626]">
                  <TableHead className="font-semibold text-[#f5f5f5] w-[50px]">Status</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5]">Template Name</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5]">Description</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">Category</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-center">Variables</TableHead>
                  <TableHead className="font-semibold text-[#f5f5f5] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id} className="border-[#262626] hover:bg-[#262626]">
                    <TableCell>
                      <Switch
                        checked={template.enabled}
                        onCheckedChange={() => handleToggleTemplate(template.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {template.enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#a3a3a3]" />
                        )}
                        <span className="font-medium text-[#f5f5f5]">{template.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#a3a3a3]">{template.description}</TableCell>
                    <TableCell className="text-center">{getCategoryBadge(template.category)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-[#262626] text-[#a3a3a3] border-[#262626]">
                        {template.variables.length} variables
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewClick(template)}
                          className="gap-2 border-[#262626] text-[#f5f5f5] hover:bg-[#262626]"
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
        <DialogContent className="bg-[#1a1a1a] border-[#262626] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#f5f5f5]">
              <Edit3 className="w-5 h-5 text-[#A68A64]" />
              Edit Email Template
            </DialogTitle>
            <DialogDescription className="text-[#a3a3a3]">
              Customize the email template using dynamic variables. Changes are saved immediately.
            </DialogDescription>
          </DialogHeader>

          {editingTemplate && (
            <div className="space-y-6 py-4">
              {/* Template Name */}
              <div className="bg-[#262626] rounded-lg p-4 border border-[#262626]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#f5f5f5]">{editingTemplate.name}</p>
                    <p className="text-sm text-[#a3a3a3]">{editingTemplate.description}</p>
                  </div>
                  {getCategoryBadge(editingTemplate.category)}
                </div>
              </div>

              {/* Subject Line */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-[#f5f5f5]">Subject Line</Label>
                <Input
                  id="subject"
                  value={editingTemplate.subject}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                  }
                  placeholder="Enter email subject..."
                  className="text-base bg-[#262626] border-[#262626] text-[#f5f5f5] placeholder:text-[#a3a3a3]"
                />
              </div>

              {/* Email Body */}
              <div className="space-y-2">
                <Label htmlFor="body" className="text-[#f5f5f5]">Email Body</Label>
                <Textarea
                  id="body"
                  value={editingTemplate.body}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, body: e.target.value })
                  }
                  placeholder="Enter email content..."
                  className="min-h-[300px] font-mono text-sm bg-[#262626] border-[#262626] text-[#f5f5f5] placeholder:text-[#a3a3a3]"
                />
              </div>

              {/* Available Variables */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A68A64]" />
                  <Label className="text-[#f5f5f5]">Available Variables</Label>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 bg-[#262626] rounded-lg border border-[#262626]">
                  {availableVariables.map((variable) => (
                    <div
                      key={variable.tag}
                      className="flex items-center justify-between p-2 bg-[#1a1a1a] rounded border border-[#262626] hover:border-[#A68A64] transition-colors"
                    >
                      <div className="flex-1">
                        <code className="text-xs font-mono text-[#A68A64] font-semibold">
                          {variable.tag}
                        </code>
                        <p className="text-xs text-[#a3a3a3] mt-0.5">{variable.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyVariable(variable.tag)}
                        className="ml-2 h-8 w-8 p-0 hover:bg-[#262626]"
                      >
                        {copiedVariable === variable.tag ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-[#a3a3a3]" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#a3a3a3]">
                  Click the copy icon to copy a variable, then paste it into your email template.
                </p>
              </div>

              {/* Test Email */}
              <div className="border-t border-[#262626] pt-4">
                <div className="p-4 bg-blue-950 rounded-lg border border-blue-700 space-y-3">
                  <div>
                    <p className="font-semibold text-blue-300 text-sm">Send Test Email</p>
                    <p className="text-xs text-blue-400 mt-1">
                      Send a real test email to verify your Resend integration
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={testEmailAddress}
                      onChange={e => { setTestEmailAddress(e.target.value); setTestEmailError(null); }}
                      className="flex-1 bg-[#0a0a0a] border-[#262626] text-[#f5f5f5] placeholder:text-[#a3a3a3]"
                    />
                    <Button
                      onClick={handleSendTestEmail}
                      className="gap-2 bg-[#A68A64] hover:bg-[#8B7355] shrink-0"
                      disabled={testEmailSent || testEmailLoading}
                    >
                      {testEmailSent ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Sent!
                        </>
                      ) : testEmailLoading ? (
                        <>
                          <Send className="w-4 h-4 animate-pulse" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Test
                        </>
                      )}
                    </Button>
                  </div>
                  {testEmailError && (
                    <p className="text-xs text-red-400">{testEmailError}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-[#262626] text-[#f5f5f5] hover:bg-[#262626]">
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
        <DialogContent className="bg-[#1a1a1a] border-[#262626] max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#f5f5f5]">
              <Eye className="w-5 h-5 text-[#A68A64]" />
              Email Preview
            </DialogTitle>
            <DialogDescription className="text-[#a3a3a3]">
              Preview how this email will appear to recipients (using sample data)
            </DialogDescription>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-4 py-4">
              {/* Email Header */}
              <div className="border border-[#262626] rounded-lg overflow-hidden">
                <div className="bg-[#262626] p-4 border-b border-[#262626]">
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-semibold text-[#a3a3a3] w-20">From:</span>
                      <span className="text-[#f5f5f5]">Page & Prose &lt;noreply@pageandprose.com&gt;</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-[#a3a3a3] w-20">To:</span>
                      <span className="text-[#f5f5f5]">customer@email.com</span>
                    </div>
                    <div className="flex">
                      <span className="font-semibold text-[#a3a3a3] w-20">Subject:</span>
                      <span className="text-[#f5f5f5] font-medium">
                        {renderPreview(previewTemplate.subject)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-6 bg-[#1a1a1a]">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-[#f5f5f5] leading-relaxed">
                    {renderPreview(previewTemplate.body)}
                  </pre>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-amber-950 rounded-lg border border-amber-700">
                <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-300">
                  This preview uses sample data. Actual emails will use real customer and order information.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setPreviewDialogOpen(false)} className="bg-[#A68A64] hover:bg-[#8B7355]">
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
