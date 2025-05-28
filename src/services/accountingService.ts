
import { Account, JournalEntry, Entity, TrialBalanceItem, FinancialSummary } from '@/types/accounting';

class AccountingService {
  private entities: Entity[] = [
    { id: '1', code: 'HO', name: 'Head Office', type: 'head_office', isActive: true },
    { id: '2', code: 'BR01', name: 'Branch 1 - Downtown', type: 'branch', isActive: true },
    { id: '3', code: 'BR02', name: 'Branch 2 - Mall', type: 'branch', isActive: true },
    { id: '4', code: 'BR03', name: 'Branch 3 - University', type: 'branch', isActive: true },
    { id: '5', code: 'BR04', name: 'Branch 4 - Airport', type: 'branch', isActive: true },
    { id: '6', code: 'BR05', name: 'Branch 5 - Business District', type: 'branch', isActive: true },
    { id: '7', code: 'COM', name: 'Commissary', type: 'commissary', isActive: true },
  ];

  private chartOfAccounts: Account[] = [
    // Assets
    { id: '1', code: '1001', name: 'Cash', type: 'asset', category: 'Current Assets', isActive: true, balance: 0 },
    { id: '2', code: '1002', name: 'Accounts Receivable', type: 'asset', category: 'Current Assets', isActive: true, balance: 0 },
    { id: '3', code: '1003', name: 'Inventory - Coffee Beans', type: 'asset', category: 'Current Assets', isActive: true, balance: 0 },
    { id: '4', code: '1004', name: 'Inventory - Pastries', type: 'asset', category: 'Current Assets', isActive: true, balance: 0 },
    { id: '5', code: '1005', name: 'Equipment', type: 'asset', category: 'Fixed Assets', isActive: true, balance: 0 },
    
    // Liabilities
    { id: '6', code: '2001', name: 'Accounts Payable', type: 'liability', category: 'Current Liabilities', isActive: true, balance: 0 },
    { id: '7', code: '2002', name: 'Accrued Expenses', type: 'liability', category: 'Current Liabilities', isActive: true, balance: 0 },
    { id: '8', code: '2003', name: 'Long-term Debt', type: 'liability', category: 'Long-term Liabilities', isActive: true, balance: 0 },
    
    // Equity
    { id: '9', code: '3001', name: 'Share Capital', type: 'equity', category: 'Equity', isActive: true, balance: 0 },
    { id: '10', code: '3002', name: 'Retained Earnings', type: 'equity', category: 'Equity', isActive: true, balance: 0 },
    
    // Revenue
    { id: '11', code: '4001', name: 'Coffee Sales', type: 'revenue', category: 'Operating Revenue', isActive: true, balance: 0 },
    { id: '12', code: '4002', name: 'Pastry Sales', type: 'revenue', category: 'Operating Revenue', isActive: true, balance: 0 },
    
    // Expenses
    { id: '13', code: '5001', name: 'Cost of Goods Sold', type: 'expense', category: 'Operating Expenses', isActive: true, balance: 0 },
    { id: '14', code: '5002', name: 'Rent Expense', type: 'expense', category: 'Operating Expenses', isActive: true, balance: 0 },
    { id: '15', code: '5003', name: 'Utilities Expense', type: 'expense', category: 'Operating Expenses', isActive: true, balance: 0 },
    { id: '16', code: '5004', name: 'Salaries Expense', type: 'expense', category: 'Operating Expenses', isActive: true, balance: 0 },
  ];

  private journalEntries: JournalEntry[] = [];

  // Entity Management
  getEntities(): Entity[] {
    return this.entities;
  }

  getEntityById(id: string): Entity | undefined {
    return this.entities.find(entity => entity.id === id);
  }

  // Chart of Accounts
  getChartOfAccounts(): Account[] {
    return this.chartOfAccounts;
  }

  getAccountById(id: string): Account | undefined {
    return this.chartOfAccounts.find(account => account.id === id);
  }

  getAccountByCode(code: string): Account | undefined {
    return this.chartOfAccounts.find(account => account.code === code);
  }

  addAccount(account: Omit<Account, 'id'>): Account {
    const newAccount: Account = {
      ...account,
      id: (this.chartOfAccounts.length + 1).toString(),
    };
    this.chartOfAccounts.push(newAccount);
    return newAccount;
  }

  updateAccount(id: string, updates: Partial<Account>): Account | undefined {
    const index = this.chartOfAccounts.findIndex(account => account.id === id);
    if (index !== -1) {
      this.chartOfAccounts[index] = { ...this.chartOfAccounts[index], ...updates };
      return this.chartOfAccounts[index];
    }
    return undefined;
  }

  // Journal Entries
  getJournalEntries(): JournalEntry[] {
    return this.journalEntries;
  }

  addJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      id: (this.journalEntries.length + 1).toString(),
      createdAt: new Date().toISOString(),
    };
    
    // Validate double-entry
    if (Math.abs(entry.totalDebit - entry.totalCredit) > 0.01) {
      throw new Error('Journal entry is not balanced. Debits must equal credits.');
    }
    
    this.journalEntries.push(newEntry);
    
    // Update account balances if posted
    if (newEntry.isPosted) {
      this.updateAccountBalances(newEntry);
    }
    
    return newEntry;
  }

  private updateAccountBalances(entry: JournalEntry): void {
    entry.lineItems.forEach(lineItem => {
      const account = this.getAccountById(lineItem.accountId);
      if (account) {
        // For assets and expenses: debit increases, credit decreases
        // For liabilities, equity, and revenue: credit increases, debit decreases
        if (account.type === 'asset' || account.type === 'expense') {
          account.balance += lineItem.debitAmount - lineItem.creditAmount;
        } else {
          account.balance += lineItem.creditAmount - lineItem.debitAmount;
        }
      }
    });
  }

  // Trial Balance
  getTrialBalance(): TrialBalanceItem[] {
    return this.chartOfAccounts.map(account => ({
      accountCode: account.code,
      accountName: account.name,
      debitBalance: account.balance > 0 && (account.type === 'asset' || account.type === 'expense') ? account.balance : 0,
      creditBalance: account.balance > 0 && (account.type === 'liability' || account.type === 'equity' || account.type === 'revenue') ? account.balance : 0,
    }));
  }

  // Financial Summary
  getFinancialSummary(): FinancialSummary {
    const assets = this.chartOfAccounts
      .filter(account => account.type === 'asset')
      .reduce((sum, account) => sum + account.balance, 0);

    const liabilities = this.chartOfAccounts
      .filter(account => account.type === 'liability')
      .reduce((sum, account) => sum + account.balance, 0);

    const equity = this.chartOfAccounts
      .filter(account => account.type === 'equity')
      .reduce((sum, account) => sum + account.balance, 0);

    const revenue = this.chartOfAccounts
      .filter(account => account.type === 'revenue')
      .reduce((sum, account) => sum + account.balance, 0);

    const expenses = this.chartOfAccounts
      .filter(account => account.type === 'expense')
      .reduce((sum, account) => sum + account.balance, 0);

    return {
      totalAssets: assets,
      totalLiabilities: liabilities,
      totalEquity: equity,
      totalRevenue: revenue,
      totalExpenses: expenses,
      netIncome: revenue - expenses,
    };
  }
}

export const accountingService = new AccountingService();
