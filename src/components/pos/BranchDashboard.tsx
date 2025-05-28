
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, ArrowRightLeft, Coffee, DollarSign, TrendingUp } from 'lucide-react';

export const BranchDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const todayStats = {
    sales: 1250.50,
    transactions: 45,
    avgTransaction: 27.79,
    inventory: 85, // percentage
  };

  const quickActions = [
    { name: 'New Sale', icon: ShoppingCart, color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Inventory Check', icon: Package, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Inter-Branch Transfer', icon: ArrowRightLeft, color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'Daily Report', icon: TrendingUp, color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  const recentTransactions = [
    { id: '001', time: '14:30', amount: 15.50, items: 'Latte, Croissant' },
    { id: '002', time: '14:25', amount: 8.25, items: 'Americano' },
    { id: '003', time: '14:20', amount: 22.75, items: '2x Cappuccino, Cake' },
    { id: '004', time: '14:15', amount: 12.00, items: 'Espresso, Sandwich' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Coffee className="h-8 w-8 mr-3 text-blue-600" />
            Branch POS Dashboard
          </h1>
          <p className="text-gray-600">Branch 1 - Downtown • Today's Operations</p>
        </div>
        <Badge variant="default" className="text-sm px-3 py-1">
          Online • {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Today's Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(todayStats.sales)}
            </div>
            <p className="text-xs text-gray-500 mt-1">+12% vs yesterday</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {todayStats.transactions}
            </div>
            <p className="text-xs text-gray-500 mt-1">Active since 6:00 AM</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(todayStats.avgTransaction)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Per customer</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Inventory Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {todayStats.inventory}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Stock remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.name}
                  className={`${action.color} text-white h-20 flex-col space-y-2`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions & Pending Transfers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">#{transaction.id}</p>
                    <p className="text-sm text-gray-600">{transaction.items}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{formatCurrency(transaction.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Inter-Branch Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Coffee Beans Request</p>
                  <p className="text-sm text-gray-600">From Commissary</p>
                  <Badge variant="secondary" className="text-xs mt-1">Pending</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">50 lbs</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Pastry Transfer</p>
                  <p className="text-sm text-gray-600">To Branch 2</p>
                  <Badge variant="default" className="text-xs mt-1">Completed</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">24 items</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                New Transfer Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
