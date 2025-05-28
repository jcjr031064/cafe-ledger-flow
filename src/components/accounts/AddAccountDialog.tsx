
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';
import { Account } from '@/types/accounting';
import { accountingService } from '@/services/accountingService';

interface AddAccountDialogProps {
  onAccountAdded: (account: Account) => void;
}

export const AddAccountDialog = ({ onAccountAdded }: AddAccountDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'asset' as Account['type'],
    category: '',
    isActive: true,
  });

  const accountTypes = [
    { value: 'asset', label: 'Asset' },
    { value: 'liability', label: 'Liability' },
    { value: 'equity', label: 'Equity' },
    { value: 'revenue', label: 'Revenue' },
    { value: 'expense', label: 'Expense' },
  ];

  const getCategoriesForType = (type: string) => {
    switch (type) {
      case 'asset':
        return ['Current Assets', 'Fixed Assets', 'Other Assets'];
      case 'liability':
        return ['Current Liabilities', 'Long-term Liabilities'];
      case 'equity':
        return ['Equity'];
      case 'revenue':
        return ['Operating Revenue', 'Other Revenue'];
      case 'expense':
        return ['Operating Expenses', 'Other Expenses'];
      default:
        return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.category) return;

    const newAccount = accountingService.addAccount({
      ...formData,
      balance: 0,
    });

    onAccountAdded(newAccount);
    setFormData({
      code: '',
      name: '',
      type: 'asset',
      category: '',
      isActive: true,
    });
    setOpen(false);
  };

  const handleTypeChange = (type: Account['type']) => {
    setFormData(prev => ({
      ...prev,
      type,
      category: getCategoriesForType(type)[0] || '',
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Account Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="e.g. 1001"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Account Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Cash"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(category) => setFormData(prev => ({ ...prev, category }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getCategoriesForType(formData.type).map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">Active Account</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Account</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
