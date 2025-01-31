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
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowAccountSelector(true)}
        >
          <Text style={styles.dropdownText}>
            {t(`accounts.names.${selectedAccount.nameKey}`)}
          </Text>
          <Entypo name="chevron-thin-down" size={12} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAccountSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAccountSelector(false)}
      >
        <View style={styles.accountDrawerContainer}>
          <Pressable
            style={styles.accountDrawerOverlay}
            onPress={() => setShowAccountSelector(false)}
          />
          <View style={styles.accountDrawer}>
            <View style={styles.drawerHandle} />
            <Text style={styles.drawerTitle}>{t("common.accounts")}</Text>

            {/* Hesap Listesi */}
            {mockAccounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={[
                  styles.accountItem,
                  selectedAccount.id === account.id && styles.selectedAccount,
                ]}
                onPress={() => {
                  setSelectedAccount(account);
                  setShowAccountSelector(false);
                }}
              >
                <View style={styles.accountItemContent}>
                  <Ionicons name={account.icon} size={24} color="white" />
                  <Text style={styles.accountItemText}>
                    {t(`accounts.names.${account.nameKey}`)}
                  </Text>
                </View>
                {selectedAccount.id === account.id && (
                  <Ionicons name="checkmark" size={24} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}

            {/* Hesap Ekle Butonu */}
            <TouchableOpacity style={styles.addAccountButton}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.addAccountText}>
                {t("common.addNewAccount")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "rgb(44, 44, 44)",
    borderRadius: 29,
    padding: 2,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownText: {
    color: "rgba(240, 240, 243, 0.86)",
    fontSize: 16,
    marginRight: 5,
  },
  accountDrawerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  accountDrawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  accountDrawer: {
    backgroundColor: "rgb(20, 21, 23)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 8,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#666",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  drawerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  selectedAccount: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  accountItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  accountItemText: {
    color: "white",
    fontSize: 16,
  },
  addAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  addAccountText: {
    color: "white",
    fontSize: 16,
  },
});
