
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { accountingService } from '@/services/accountingService';
import { Building2, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const Dashboard = () => {
  const entities = accountingService.getEntities();
  const financialSummary = accountingService.getFinancialSummary();
  const recentEntries = accountingService.getJournalEntries().slice(-5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Accounting Dashboard</h1>
        <p className="text-gray-600">IFRS Compliant Multi-Entity Accounting System</p>
      </div>

      {/* Entity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {entities.map((entity) => (
          <Card key={entity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">{entity.code}</p>
                  <p className="text-xs text-gray-600">{entity.name}</p>
                  <Badge 
                    variant={entity.type === 'head_office' ? 'default' : 'secondary'}
                    className="text-xs mt-1"
                  >
                    {entity.type.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Total Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(financialSummary.totalAssets)}
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Total Liabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(financialSummary.totalLiabilities)}
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Net Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${financialSummary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(financialSummary.netIncome)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Balance Sheet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Assets</span>
                <span className="font-semibold debit-amount">
                  {formatCurrency(financialSummary.totalAssets)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Liabilities</span>
                <span className="font-semibold credit-amount">
                  {formatCurrency(financialSummary.totalLiabilities)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Total Equity</span>
                <span className="font-semibold">
                  {formatCurrency(financialSummary.totalEquity)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="financial-card">
          <CardHeader>
            <CardTitle>Income Statement Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-semibold credit-amount">
                  {formatCurrency(financialSummary.totalRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Expenses</span>
                <span className="font-semibold debit-amount">
                  {formatCurrency(financialSummary.totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Net Income</span>
                <span className={`font-semibold ${financialSummary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(financialSummary.netIncome)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Journal Entries */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle>Recent Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEntries.length > 0 ? (
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{entry.reference}</p>
                    <p className="text-sm text-gray-600">{entry.description}</p>
                    <p className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(entry.totalDebit)}</p>
                    <Badge variant={entry.isPosted ? 'default' : 'secondary'}>
                      {entry.isPosted ? 'Posted' : 'Draft'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No journal entries yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
