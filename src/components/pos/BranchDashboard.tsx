
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

  const primaryAction = { name: 'New Sale', icon: ShoppingCart };
  
  const secondaryActions = [
    { name: 'Inventory Check', icon: Package },
    { name: 'Inter-Branch Transfer', icon: ArrowRightLeft },
    { name: 'Daily Report', icon: TrendingUp },
  ];

  const recentTransactions = [
    { id: '001', time: '14:30', amount: 15.50, items: 'Latte, Croissant' },
    { id: '002', time: '14:25', amount: 8.25, items: 'Americano' },
    { id: '003', time: '14:20', amount: 22.75, items: '2x Cappuccino, Cake' },
    { id: '004', time: '14:15', amount: 12.00, items: 'Espresso, Sandwich' },
  ];

  return (
    <div className="space-y-6" style={{ backgroundColor: '#e6e2dd', minHeight: '100vh', padding: '1.5rem' }}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center" style={{ color: '#373a36' }}>
            <Coffee className="h-8 w-8 mr-3" style={{ color: '#d48166' }} />
            Branch POS Dashboard
          </h1>
          <p style={{ color: '#373a36', opacity: 0.7 }}>Branch 1 - Downtown • Today's Operations</p>
        </div>
        <Badge variant="default" className="text-sm px-3 py-1" style={{ backgroundColor: '#d48166', color: 'white' }}>
          Online • {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center" style={{ color: '#373a36' }}>
              <DollarSign className="h-4 w-4 mr-2" style={{ color: '#d48166' }} />
              Today's Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#d48166' }}>
              {formatCurrency(todayStats.sales)}
            </div>
            <p className="text-xs mt-1" style={{ color: '#373a36', opacity: 0.6 }}>+12% vs yesterday</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center" style={{ color: '#373a36' }}>
              <ShoppingCart className="h-4 w-4 mr-2" style={{ color: '#d48166' }} />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#d48166' }}>
              {todayStats.transactions}
            </div>
            <p className="text-xs mt-1" style={{ color: '#373a36', opacity: 0.6 }}>Active since 6:00 AM</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium" style={{ color: '#373a36' }}>
              Avg Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#d48166' }}>
              {formatCurrency(todayStats.avgTransaction)}
            </div>
            <p className="text-xs mt-1" style={{ color: '#373a36', opacity: 0.6 }}>Per customer</p>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center" style={{ color: '#373a36' }}>
              <Package className="h-4 w-4 mr-2" style={{ color: '#d48166' }} />
              Inventory Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#d48166' }}>
              {todayStats.inventory}%
            </div>
            <p className="text-xs mt-1" style={{ color: '#373a36', opacity: 0.6 }}>Stock remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
        <CardHeader>
          <CardTitle style={{ color: '#373a36' }}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Primary Action - New Sale */}
            <Button
              className="w-full h-24 text-xl font-semibold flex-col space-y-3 text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#d48166' }}
            >
              <primaryAction.icon className="h-8 w-8" />
              <span>{primaryAction.name}</span>
            </Button>
            
            {/* Secondary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {secondaryActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.name}
                    className="h-16 flex-col space-y-2 text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#373a36' }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{action.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions & Pending Transfers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
          <CardHeader>
            <CardTitle style={{ color: '#373a36' }}>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#e6e2dd' }}>
                  <div>
                    <p className="font-medium" style={{ color: '#373a36' }}>#{transaction.id}</p>
                    <p className="text-sm" style={{ color: '#373a36', opacity: 0.7 }}>{transaction.items}</p>
                    <p className="text-xs" style={{ color: '#373a36', opacity: 0.5 }}>{transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: '#d48166' }}>{formatCurrency(transaction.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border" style={{ backgroundColor: 'white', borderColor: '#d48166' }}>
          <CardHeader>
            <CardTitle style={{ color: '#373a36' }}>Inter-Branch Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#e6e2dd' }}>
                <div>
                  <p className="font-medium" style={{ color: '#373a36' }}>Coffee Beans Request</p>
                  <p className="text-sm" style={{ color: '#373a36', opacity: 0.7 }}>From Commissary</p>
                  <Badge variant="secondary" className="text-xs mt-1" style={{ backgroundColor: '#373a36', color: 'white' }}>Pending</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: '#373a36' }}>50 lbs</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#e6e2dd' }}>
                <div>
                  <p className="font-medium" style={{ color: '#373a36' }}>Pastry Transfer</p>
                  <p className="text-sm" style={{ color: '#373a36', opacity: 0.7 }}>To Branch 2</p>
                  <Badge variant="default" className="text-xs mt-1" style={{ backgroundColor: '#d48166', color: 'white' }}>Completed</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: '#373a36' }}>24 items</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 hover:opacity-90 transition-opacity" style={{ borderColor: '#d48166', color: '#d48166' }}>
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
