export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: Date;
}

export interface Account {
  id: string;
  name: string;
  type: 'personal' | 'business';
  icon: string;
}

export interface BalanceState {
  selectedDate: Date;
  selectedAccount: Account;
  accounts: Account[];
  transactions: Transaction[];
  calculatedAmount: number;
  selectedViewType: 'predicted' | 'current' | 'hidden';
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedAccount: (account: Account) => void;
  setSelectedViewType: (type: 'predicted' | 'current' | 'hidden') => void;
  addAccount: (account: Account) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
} 