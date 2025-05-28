
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Receipt, Trash2 } from 'lucide-react';
import { ProFormaTemplate, ProFormaLineItem } from '@/types/proforma';
import { accountingService } from '@/services/accountingService';

export const ProFormaTemplates = () => {
  const [templates, setTemplates] = useState<ProFormaTemplate[]>([]);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'sales' as ProFormaTemplate['category'],
    lineItems: [] as ProFormaLineItem[],
  });

  const accounts = accountingService.getChartOfAccounts();

  const addLineItem = () => {
    const newLineItem: ProFormaLineItem = {
      id: Date.now().toString(),
      accountCode: '',
      accountName: '',
      description: '',
      debitAmount: 0,
      creditAmount: 0,
      isVariable: true,
    };
    setNewTemplate(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newLineItem],
    }));
  };

  const updateLineItem = (index: number, field: keyof ProFormaLineItem, value: any) => {
    setNewTemplate(prev => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeLineItem = (index: number) => {
    setNewTemplate(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!newTemplate.name || newTemplate.lineItems.length === 0) return;

    const template: ProFormaTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      name: '',
      description: '',
      category: 'sales',
      lineItems: [],
    });
    setIsAddingTemplate(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-green-100 text-green-800';
      case 'purchase': return 'bg-blue-100 text-blue-800';
      case 'expense': return 'bg-red-100 text-red-800';
      case 'transfer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pro-Forma Templates</h2>
          <p className="text-gray-600">Recurring transaction templates for POS</p>
        </div>
        <Dialog open={isAddingTemplate} onOpenChange={setIsAddingTemplate}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Pro-Forma Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Template Name</Label>
                  <Input
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Coffee Sale"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={newTemplate.category} onValueChange={(value: ProFormaTemplate['category']) => 
                    setNewTemplate(prev => ({ ...prev, category: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Template description..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Journal Entry Lines</h3>
                  <Button onClick={addLineItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Line
                  </Button>
                </div>

                {newTemplate.lineItems.map((line, index) => (
                  <Card key={line.id} className="p-4">
                    <div className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-3">
                        <Label className="text-xs">Account</Label>
                        <Select 
                          value={line.accountCode} 
                          onValueChange={(value) => {
                            const account = accounts.find(acc => acc.code === value);
                            updateLineItem(index, 'accountCode', value);
                            updateLineItem(index, 'accountName', account?.name || '');
                          }}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map(account => (
                              <SelectItem key={account.id} value={account.code}>
                                {account.code} - {account.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3">
                        <Label className="text-xs">Description</Label>
                        <Input 
                          className="h-8"
                          value={line.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          placeholder="Line description"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Debit</Label>
                        <Input 
                          className="h-8"
                          type="number"
                          value={line.debitAmount}
                          onChange={(e) => updateLineItem(index, 'debitAmount', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs">Credit</Label>
                        <Input 
                          className="h-8"
                          type="number"
                          value={line.creditAmount}
                          onChange={(e) => updateLineItem(index, 'creditAmount', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-1">
                        <Label className="text-xs">Variable</Label>
                        <div className="flex justify-center">
                          <Switch
                            checked={line.isVariable}
                            onCheckedChange={(checked) => updateLineItem(index, 'isVariable', checked)}
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeLineItem(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingTemplate(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Receipt className="h-4 w-4 mr-2" />
                  {template.lineItems.length} journal lines
                </div>
                <div className="text-xs text-gray-500">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
