import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("income");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    const formattedDate = date
      .toLocaleDateString("tr-TR", options)
      .toUpperCase()
      .split(" ")
      .join(", ");
    setCurrentDate(formattedDate);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/glow.png")}
        style={styles.glowEffect}
      />

      <View style={styles.header}>
        <Ionicons name="beer-outline" size={24} color="white" />
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Bireysel</Text>
          <Ionicons name="chevron-down" size={22} color="white" />
        </View>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Genel Bakış</Text>
        <View style={styles.balanceRow}>
          <TouchableOpacity>
            <Ionicons
              name="chevron-back"
              size={24}
              color="rgb(179, 179, 179)"
            />
          </TouchableOpacity>
          <Text style={styles.balanceAmount}>₺0</Text>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="rgb(179, 179, 179)"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      <View style={[styles.tabsContainer]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "income" && styles.activeTab]}
          onPress={() => setActiveTab("income")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "income" && styles.activeTabText,
            ]}
          >
            Gelir
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "expense" && styles.activeTabExpense,
          ]}
          onPress={() => setActiveTab("expense")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "expense" && styles.activeTabText,
            ]}
          >
            Gider
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === "income" ? (
          <Text style={styles.contentText}>
            Gelir içeriği burada gösterilecek
          </Text>
        ) : (
          <Text style={styles.contentText}>
            Gider içeriği burada gösterilecek
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons
            name="arrow-up"
            size={24}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
          <Text style={styles.addButtonText}>Gelir Ekle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
    paddingTop: 50,
  },
  glowEffect: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "200%",
    height: "50%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "rgb(44, 44, 44)",
    borderRadius: 29,
    padding: 5,
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
  balanceContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  balanceLabel: {
    color: "#888",
    fontSize: 16,
    marginBottom: 16,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceAmount: {
    color: "white",
    fontSize: 48,
    fontWeight: "semibold",
    marginHorizontal: 20,
  },
  dateText: {
    color: "#888",
    backgroundColor: "rgb(33, 33, 33)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 27,
    fontSize: 14,
    marginTop: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgb(20,21,23)",
    borderRadius: 12,
    marginBottom: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgb(80, 80, 80)",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "rgba(226, 254, 83, 1)",
    borderRadius: 6,
  },
  tabText: {
    color: "rgba(240, 240, 243, 0.7)",
    fontSize: 16,
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  activeTabExpense: {
    backgroundColor: "rgba(255, 123, 94, 1)",
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
  },
  addButtonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
