export type TransactionType = 'income' | 'expense';
export type ViewType = 'predicted' | 'current';

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
  viewType: ViewType;
  isHidden: boolean;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedAccount: (account: Account) => void;
  setViewType: (type: ViewType) => void;
  toggleHidden: () => void;
  addAccount: (account: Account) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
} 