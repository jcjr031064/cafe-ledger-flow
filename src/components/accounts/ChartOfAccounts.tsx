
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { accountingService } from '@/services/accountingService';
import { Account } from '@/types/accounting';
import { BookOpen, Plus, Search, Filter } from 'lucide-react';

export const ChartOfAccounts = () => {
  const [accounts] = useState<Account[]>(accountingService.getChartOfAccounts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || account.type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedAccounts = filteredAccounts.reduce((groups, account) => {
    const category = account.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(account);
    return groups;
  }, {} as Record<string, Account[]>);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'asset':
        return 'bg-green-100 text-green-800';
      case 'liability':
        return 'bg-red-100 text-red-800';
      case 'equity':
        return 'bg-blue-100 text-blue-800';
      case 'revenue':
        return 'bg-purple-100 text-purple-800';
      case 'expense':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const accountTypes = ['all', 'asset', 'liability', 'equity', 'revenue', 'expense'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chart of Accounts</h1>
          <p className="text-gray-600">IFRS compliant account structure</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accountTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['asset', 'liability', 'equity', 'revenue', 'expense'].map(type => {
          const typeAccounts = accounts.filter(account => account.type === type);
          const totalBalance = typeAccounts.reduce((sum, account) => sum + Math.abs(account.balance), 0);
          
          return (
            <Card key={type} className="text-center">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Badge className={getAccountTypeColor(type)}>
                    {type.toUpperCase()}
                  </Badge>
                  <p className="text-2xl font-bold">{typeAccounts.length}</p>
                  <p className="text-sm text-gray-600">accounts</p>
                  <p className="text-xs font-medium">{formatCurrency(totalBalance)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Accounts by Category */}
      <div className="space-y-6">
        {Object.entries(groupedAccounts).map(([category, categoryAccounts]) => (
          <Card key={category} className="financial-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                {category}
                <Badge variant="secondary" className="ml-2">
                  {categoryAccounts.length} accounts
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Code</th>
                      <th className="text-left py-2">Account Name</th>
                      <th className="text-center py-2">Type</th>
                      <th className="text-right py-2">Balance</th>
                      <th className="text-center py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryAccounts.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-mono text-sm">{account.code}</td>
                        <td className="py-3">{account.name}</td>
                        <td className="py-3 text-center">
                          <Badge className={getAccountTypeColor(account.type)}>
                            {account.type}
                          </Badge>
                        </td>
                        <td className="py-3 text-right font-semibold">
                          {formatCurrency(account.balance)}
                        </td>
                        <td className="py-3 text-center">
                          <Badge variant={account.isActive ? 'default' : 'secondary'}>
                            {account.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
