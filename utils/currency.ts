import { useBalanceStore } from '../store/useBalanceStore';

export const formatCurrency = (amount: number): string => {
  const isHidden = useBalanceStore.getState().isHidden;
  
  if (isHidden) {
    return '******';
  }

  return `₺${amount.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Sadece sayıyı formatla, gizleme kontrolü yapma
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}; 