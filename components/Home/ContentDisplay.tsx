import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useFormatCurrency } from "@/utils/currency";
import { useTranslation } from "react-i18next";

interface ContentDisplayProps {
  activeTab: "income" | "expense";
}

// İşlem durumu için tip
type TransactionStatus = "pending" | "paid";

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
  dueDate?: string;
  isCompleted: boolean;
}

// Mock gelir verileri
const mockIncomeTransactions: Transaction[] = [
  {
    id: "1",
    title: "Maaş",
    category: {
      name: "salary",
      icon: "cash",
      color: "#4CAF50",
    },
    amount: 45000,
    status: "pending",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Kira Geliri",
    category: {
      name: "rent",
      icon: "home",
      color: "#2196F3",
    },
    amount: 8500,
    status: "paid",
    isCompleted: true,
  },
];

// Mock gider verileri
const mockExpenseTransactions: Transaction[] = [
  {
    id: "1",
    title: "Kredi Kartım",
    category: {
      name: "creditCard",
      icon: "card",
      color: "#FF69B4",
    },
    amount: 12000,
    status: "pending",
    isCompleted: false,
  },
  {
    id: "2",
    title: "X Kredi Kartım",
    category: {
      name: "creditCard",
      icon: "card",
      color: "#FF69B4",
    },
    amount: 35000,
    status: "paid",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Telefon",
    category: {
      name: "invoice",
      icon: "document-text",
      color: "#FFD700",
    },
    amount: 500,
    status: "paid",
    dueDate: "1/12",
    isCompleted: true,
  },
];

export default function ContentDisplay({ activeTab }: ContentDisplayProps) {
  const { t } = useTranslation();
  const formatCurrency = useFormatCurrency();
  const [incomeTransactions, setIncomeTransactions] = useState<Transaction[]>(
    mockIncomeTransactions
  );
  const [expenseTransactions, setExpenseTransactions] = useState<Transaction[]>(
    mockExpenseTransactions
  );

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
      className={`flex-row items-center py-3 border-b border-border ${
        transaction.isCompleted && "opacity-60"
      }`}
    >
      <TouchableOpacity
        className="w-5 h-5 mr-3 justify-center items-center"
        onPress={() => toggleComplete(transaction.id)}
      >
        <View
          className={`w-[18px] h-[18px] rounded border-2 border-border justify-center items-center ${
            transaction.isCompleted && "bg-primary border-primary"
          }`}
        >
          {transaction.isCompleted && (
            <Ionicons name="checkmark" size={12} className="text-foreground" />
          )}
        </View>
      </TouchableOpacity>

      <View className="flex-1 mr-3">
        <View className="flex-row items-center mb-1">
          <Text className="text-foreground text-base font-medium">
            {transaction.title}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <Ionicons
            name={transaction.category.icon}
            size={14}
            color={transaction.category.color}
          />
          <Text className="text-xs ml-1 text-muted-foreground">
            {t(`categories.${transaction.category.name}`)}

            {transaction.dueDate && ` • ${transaction.dueDate}`}
          </Text>
        </View>
      </View>

      <View className="items-end mr-3">
        <Text
          className={`text-base font-medium mb-1 ${
            activeTab === "income" ? "text-primary" : "text-destructive"
          }`}
        >
          {activeTab === "expense" ? "-" : "+"}
          {formatCurrency(transaction.amount)}
        </Text>
        <Text
          className={`text-xs lowercase ${
            transaction.status === "paid" ? "text-primary" : "text-orange-500"
          }`}
        >
          {t(`transactions.status.${transaction.status}`)}
        </Text>
      </View>

      <TouchableOpacity className="p-1">
        <Entypo
          name="dots-three-vertical"
          size={16}
          className="text-muted-foreground"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      {transactions.length > 0 ? (
        transactions.map(renderTransactionCard)
      ) : (
        <View className="flex-1 justify-center items-center py-8">
          <Text className="text-base text-foreground">
            {t(activeTab === "income" ? "tabs.noIncome" : "tabs.noExpense")}
          </Text>
        </View>
      )}
    </View>
  );
}
