
export interface Entity {
  id: string;
  code: string;
  name: string;
  type: 'branch' | 'commissary' | 'head_office';
  address?: string;
  isActive: boolean;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  category: string;
  isActive: boolean;
  entityId?: string;
  balance: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  entityId: string;
  lineItems: JournalLineItem[];
  totalDebit: number;
  totalCredit: number;
  isPosted: boolean;
  createdBy: string;
  createdAt: string;
}

export interface JournalLineItem {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
}

export interface TrialBalanceItem {
  accountCode: string;
  accountName: string;
  debitBalance: number;
  creditBalance: number;
}

export interface FinancialSummary {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
}
