import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { cssInterop } from "nativewind";

cssInterop(Entypo, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "accessible" },
  },
});

// Hesap tipi için tip tanımı
type AccountType = {
  id: string;
  nameKey: "personal" | "business" | "investment";
  type: "personal" | "business";
  icon: keyof typeof Ionicons.glyphMap;
};

// Mock hesap verileri
const mockAccounts: AccountType[] = [
  {
    id: "1",
    nameKey: "personal",
    type: "personal",
    icon: "person",
  },
  {
    id: "2",
    nameKey: "business",
    type: "business",
    icon: "business",
  },
  {
    id: "3",
    nameKey: "investment",
    type: "personal",
    icon: "trending-up",
  },
];

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType>(
    mockAccounts[0]
  );

  return (
    <>
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity>
          <Ionicons name="menu" size={24} className="text-foreground" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row gap-2 items-center justify-center border border-border rounded-full py-1 px-4 bg-card"
          onPress={() => setShowAccountSelector(true)}
        >
          <Text className="text-foreground">
            {t(`accounts.names.${selectedAccount.nameKey}`)}
          </Text>
          <Entypo
            name="chevron-thin-down"
            size={12}
            className="text-foreground"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons
            name="settings-outline"
            size={24}
            className="text-foreground"
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAccountSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAccountSelector(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="absolute inset-0 bg-black opacity-50"
            onPress={() => setShowAccountSelector(false)}
          />

          <View className="bg-card rounded-t-2xl p-4">
            <View className="h-2 w-10 bg-border rounded-full self-center my-2" />
            <Text className="text-foreground text-lg font-bold mb-4">
              {t("common.accounts")}
            </Text>

            {/* Hesap Listesi */}
            {mockAccounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                className={`flex-row items-center justify-between p-4 rounded-lg ${
                  selectedAccount.id === account.id && "bg-muted"
                }`}
                onPress={() => {
                  setSelectedAccount(account);
                  setShowAccountSelector(false);
                }}
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name={account.icon}
                    size={24}
                    className="text-foreground"
                  />
                  <Text className="text-foreground text-base">
                    {t(`accounts.names.${account.nameKey}`)}
                  </Text>
                </View>
                {selectedAccount.id === account.id && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    className="text-primary"
                  />
                )}
              </TouchableOpacity>
            ))}

            {/* Hesap Ekle Butonu */}
            <TouchableOpacity className="flex-row items-center justify-center gap-2 py-4 px-4 mt-4 border rounded-lg border-border">
              <Ionicons
                name="add-circle-outline"
                size={24}
                className="text-foreground"
              />
              <Text className="text-foreground text-base">
                {t("common.addNewAccount")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
