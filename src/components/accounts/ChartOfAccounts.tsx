import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { accountingService } from '@/services/accountingService';
import { Account } from '@/types/accounting';
import { BookOpen, Search, Filter } from 'lucide-react';
import { AddAccountDialog } from './AddAccountDialog';
import { ProFormaTemplates } from './ProFormaTemplates';

export const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>(accountingService.getChartOfAccounts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleAccountAdded = (newAccount: Account) => {
    setAccounts(prev => [...prev, newAccount]);
  };

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
        return 'bg-green-50 text-green-700 border-green-200';
      case 'liability':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'equity':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'revenue':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'expense':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const accountTypes = ['all', 'asset', 'liability', 'equity', 'revenue', 'expense'];

  return (
    <div className="space-y-6" style={{ backgroundColor: '#e6e2dd', minHeight: '100vh' }}>
      {/* Header */}
      <div className="flex justify-between items-center p-6" style={{ backgroundColor: '#e6e2dd' }}>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#373a36' }}>Chart of Accounts</h1>
          <p style={{ color: '#373a36' }}>IFRS compliant account structure</p>
        </div>
      </div>

      <div className="px-6">
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: '#373a36' }}>
            <TabsTrigger 
              value="accounts" 
              className="data-[state=active]:bg-[#d48166] data-[state=active]:text-white text-[#e6e2dd]"
            >
              Chart of Accounts
            </TabsTrigger>
            <TabsTrigger 
              value="templates" 
              className="data-[state=active]:bg-[#d48166] data-[state=active]:text-white text-[#e6e2dd]"
            >
              Pro-Forma Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#373a36' }} />
                  <Input
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[#373a36] focus:ring-[#d48166] focus:border-[#d48166]"
                    style={{ backgroundColor: 'white', color: '#373a36' }}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" style={{ color: '#373a36' }} />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d48166] focus:border-[#d48166]"
                    style={{ 
                      borderColor: '#373a36', 
                      backgroundColor: 'white', 
                      color: '#373a36'
                    }}
                  >
                    {accountTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="ml-4">
                <AddAccountDialog onAccountAdded={handleAccountAdded} />
              </div>
            </div>

            {/* Account Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['asset', 'liability', 'equity', 'revenue', 'expense'].map(type => {
                const typeAccounts = accounts.filter(account => account.type === type);
                const totalBalance = typeAccounts.reduce((sum, account) => sum + Math.abs(account.balance), 0);
                
                return (
                  <Card key={type} className="text-center border-[#373a36]" style={{ backgroundColor: 'white' }}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Badge className={getAccountTypeColor(type)}>
                          {type.toUpperCase()}
                        </Badge>
                        <p className="text-2xl font-bold" style={{ color: '#373a36' }}>{typeAccounts.length}</p>
                        <p className="text-sm" style={{ color: '#373a36' }}>accounts</p>
                        <p className="text-xs font-medium" style={{ color: '#d48166' }}>{formatCurrency(totalBalance)}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Accounts by Category */}
            <div className="space-y-6">
              {Object.entries(groupedAccounts).map(([category, categoryAccounts]) => (
                <Card key={category} className="border-[#373a36]" style={{ backgroundColor: 'white' }}>
                  <CardHeader style={{ backgroundColor: '#e6e2dd' }}>
                    <CardTitle className="flex items-center" style={{ color: '#373a36' }}>
                      <BookOpen className="h-5 w-5 mr-2" style={{ color: '#d48166' }} />
                      {category}
                      <Badge variant="secondary" className="ml-2" style={{ backgroundColor: '#d48166', color: 'white' }}>
                        {categoryAccounts.length} accounts
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent style={{ backgroundColor: 'white' }}>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b" style={{ borderColor: '#e6e2dd' }}>
                            <th className="text-left py-2" style={{ color: '#373a36' }}>Code</th>
                            <th className="text-left py-2" style={{ color: '#373a36' }}>Account Name</th>
                            <th className="text-center py-2" style={{ color: '#373a36' }}>Type</th>
                            <th className="text-right py-2" style={{ color: '#373a36' }}>Balance</th>
                            <th className="text-center py-2" style={{ color: '#373a36' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryAccounts.map((account) => (
                            <tr key={account.id} className="border-b hover:bg-[#e6e2dd] transition-colors" style={{ borderColor: '#e6e2dd' }}>
                              <td className="py-3 font-mono text-sm" style={{ color: '#373a36' }}>{account.code}</td>
                              <td className="py-3" style={{ color: '#373a36' }}>{account.name}</td>
                              <td className="py-3 text-center">
                                <Badge className={getAccountTypeColor(account.type)}>
                                  {account.type}
                                </Badge>
                              </td>
                              <td className="py-3 text-right font-semibold" style={{ color: '#d48166' }}>
                                {formatCurrency(account.balance)}
                              </td>
                              <td className="py-3 text-center">
                                <Badge 
                                  style={{ 
                                    backgroundColor: account.isActive ? '#d48166' : '#373a36',
                                    color: 'white'
                                  }}
                                >
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
          </TabsContent>

          <TabsContent value="templates">
            <ProFormaTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
