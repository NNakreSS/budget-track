import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

interface ContentDisplayProps {
  activeTab: "income" | "expense";
}

// İşlem durumu için tip
type TransactionStatus = "bekleniyor" | "ödendi";

// İşlem tipi için interface
interface Transaction {
  id: string;
  title: string;
  category: {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
  };
  amount: number;
  status: TransactionStatus;
  dueDate?: string; // Fatura için son ödeme tarihi
  isCompleted: boolean;
}

// Mock gelir verileri
const mockIncomeTransactions: Transaction[] = [
  {
    id: "1",
    title: "Maaş",
    category: {
      name: "Gelir",
      icon: "cash",
      color: "#4CAF50",
    },
    amount: 45000,
    status: "bekleniyor",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Kira Geliri",
    category: {
      name: "Kira",
      icon: "home",
      color: "#2196F3",
    },
    amount: 8500,
    status: "ödendi",
    isCompleted: true,
  },
];

// Mock gider verileri
const mockExpenseTransactions: Transaction[] = [
  {
    id: "1",
    title: "Kredi Kartım",
    category: {
      name: "K.Kartı",
      icon: "card",
      color: "#FF69B4",
    },
    amount: 12000,
    status: "bekleniyor",
    isCompleted: false,
  },
  {
    id: "2",
    title: "X Kredi Kartım",
    category: {
      name: "K.Kartı",
      icon: "card",
      color: "#FF69B4",
    },
    amount: 35000,
    status: "ödendi",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Telefon",
    category: {
      name: "Fatura",
      icon: "document-text",
      color: "#FFD700",
    },
    amount: 500,
    status: "ödendi",
    dueDate: "1/12",
    isCompleted: true,
  },
];

export default function ContentDisplay({ activeTab }: ContentDisplayProps) {
  // İki ayrı state tanımı
  const [incomeTransactions, setIncomeTransactions] = useState<Transaction[]>(
    mockIncomeTransactions
  );
  const [expenseTransactions, setExpenseTransactions] = useState<Transaction[]>(
    mockExpenseTransactions
  );

  // Aktif tab'e göre doğru state'i seç
  const transactions =
    activeTab === "income" ? incomeTransactions : expenseTransactions;
  const setTransactions =
    activeTab === "income" ? setIncomeTransactions : setExpenseTransactions;

  const toggleComplete = (id: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, isCompleted: !transaction.isCompleted }
          : transaction
      )
    );
  };

  const renderTransactionCard = (transaction: Transaction) => (
    <View
      key={transaction.id}
      style={[
        styles.transactionCard,
        transaction.isCompleted && styles.completedCard,
      ]}
    >
      {/* Sol taraf - Checkbox */}
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleComplete(transaction.id)}
      >
        <View
          style={[
            styles.checkboxInner,
            transaction.isCompleted && styles.checkboxChecked,
          ]}
        >
          {transaction.isCompleted && (
            <Ionicons name="checkmark" size={12} color="white" />
          )}
        </View>
      </TouchableOpacity>

      {/* Orta kısım - İçerik */}
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>
        </View>
        <View style={styles.categoryRow}>
          <Ionicons
            name={transaction.category.icon}
            size={14}
            color={transaction.category.color}
          />
          <Text
            style={[styles.categoryText, { color: transaction.category.color }]}
          >
            {transaction.category.name}
            {transaction.dueDate && ` • ${transaction.dueDate}`}
          </Text>
        </View>
      </View>

      {/* Sağ taraf - Miktar ve Durum */}
      <View style={styles.amountSection}>
        <Text
          style={[
            styles.amountText,
            { color: activeTab === "income" ? "#4CAF50" : "white" },
          ]}
        >
          {activeTab === "expense" ? "-" : "+"}₺
          {transaction.amount.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.statusText,
            { color: transaction.status === "ödendi" ? "#4CAF50" : "#FF9800" },
          ]}
        >
          {transaction.status}
        </Text>
      </View>

      {/* En sağ - Menü butonu */}
      <TouchableOpacity style={styles.menuButton}>
        <Entypo name="dots-three-vertical" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.contentContainer}>
      {transactions.length > 0 ? (
        transactions.map(renderTransactionCard)
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {activeTab === "income" ? "Gelir" : "Gider"} kaydı bulunamadı
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  transactionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    marginLeft: 4,
  },
  amountSection: {
    alignItems: "flex-end",
    marginRight: 12,
  },
  amountText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    textTransform: "lowercase",
  },
  menuButton: {
    padding: 4,
  },
  completedCard: {
    opacity: 0.6,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    color: "#666",
    fontSize: 16,
  },
  incomeAmount: {
    color: "#4CAF50",
  },
});
