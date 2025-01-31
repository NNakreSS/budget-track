import { useBalanceStore } from "../store/useBalanceStore";

// Hook olarak kullanım için
export const useFormatCurrency = () => {
  const isHidden = useBalanceStore((state) => state.isHidden);

  return (amount: number): string => {
    if (isHidden) {
      return "******";
    }

    return `₺${amount.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
};

// Sadece sayıyı formatla, gizleme kontrolü yapma
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
