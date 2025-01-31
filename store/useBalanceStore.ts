import { create } from 'zustand';
import { BalanceState, Account } from '../types/store';

// Mock hesap verileri
const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Bireysel",
    type: "personal",
    icon: "person",
  },
  {
    id: "2",
    name: "Dükkan",
    type: "business",
    icon: "business",
  },
  {
    id: "3",
    name: "Yatırım",
    type: "personal",
    icon: "trending-up",
  },
];

export const useBalanceStore = create<BalanceState>((set) => ({
  selectedDate: new Date(),
  selectedAccount: mockAccounts[0],
  accounts: mockAccounts,
  transactions: [],
  calculatedAmount: 15000.75,
  viewType: 'predicted',
  isHidden: false,

  // Transaction işlemleri
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
      calculatedAmount: state.calculatedAmount + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
    })),

  updateTransaction: (id, updatedTransaction) =>
    set((state) => {
      const oldTransaction = state.transactions.find(t => t.id === id);
      const newTransactions = state.transactions.map(t =>
        t.id === id ? { ...t, ...updatedTransaction } : t
      );

      // Bakiyeyi güncelle
      let amountDiff = 0;
      if (oldTransaction && 'amount' in updatedTransaction) {
        const oldEffect = oldTransaction.type === 'income' ? oldTransaction.amount : -oldTransaction.amount;
        const newEffect = oldTransaction.type === 'income' ? updatedTransaction.amount! : -updatedTransaction.amount!;
        amountDiff = newEffect - oldEffect;
      }

      return {
        transactions: newTransactions,
        calculatedAmount: state.calculatedAmount + amountDiff,
      };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const transaction = state.transactions.find(t => t.id === id);
      if (!transaction) return state;

      return {
        transactions: state.transactions.filter(t => t.id !== id),
        calculatedAmount: state.calculatedAmount - (transaction.type === 'income' ? transaction.amount : -transaction.amount),
      };
    }),

  // Tarih ve görünüm ayarları
  setSelectedDate: (date) => set({ selectedDate: date }),
  setViewType: (type) => set({ viewType: type }),
  toggleHidden: () => set((state) => ({ isHidden: !state.isHidden })),

  // Hesap işlemleri
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),

  updateAccount: (id, updatedAccount) =>
    set((state) => ({
      accounts: state.accounts.map(a =>
        a.id === id ? { ...a, ...updatedAccount } : a
      ),
    })),

  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter(a => a.id !== id),
    })),
})); 