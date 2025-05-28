
export interface ProFormaTemplate {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'purchase' | 'expense' | 'transfer';
  entityId?: string;
  lineItems: ProFormaLineItem[];
  isActive: boolean;
  createdAt: string;
}

export interface ProFormaLineItem {
  id: string;
  accountCode: string;
  accountName: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
  isVariable: boolean; // If true, amount can be modified during POS entry
}
