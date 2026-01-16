import { useWalletStore } from "@/store/useWalletStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";


export default function WalletCard() {
  const router = useRouter();
  const { mmBalance, thBalance, selectedCountry, setCountry } = useWalletStore();

  const toggleCountry = () => {
    setCountry(selectedCountry === "MM" ? "TH" : "MM");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#991b1b", "#dc2626", "#ef4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.topSection}>
          <View style={styles.leftContent}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.flagBtn}
              onPress={toggleCountry}
            >
              <DynamicText style={{ fontSize: 18, lineHeight: 24 }}>
                {selectedCountry === "MM" ? "🇲🇲" : "🇹🇭"}
              </DynamicText>
              <DynamicText style={styles.label}>
                {selectedCountry === "MM" ? "MM Wallet" : "TH Wallet"}
              </DynamicText>
              <Ionicons
                name="chevron-down"
                size={14}
                color="rgba(255,255,255,0.8)"
              />
            </TouchableOpacity>

            <DynamicText
              fontWeight="bold"
              style={styles.balance}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {selectedCountry === "MM"
                ? `${mmBalance.toLocaleString()} Ks`
                : ` ${thBalance.toLocaleString()} ฿`}
            </DynamicText>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.topUpBtn}
            onPress={() => router.navigate("/home/balance/topup")}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="wallet" size={20} color="#991b1b" />
            </View>
            <DynamicText fontWeight="bold" style={styles.topUpText}>
              ငွေဖြည့်ရန်
            </DynamicText>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomSection}>
          <TouchableOpacity activeOpacity={0.6} style={styles.actionBtn} onPress={() => router.navigate("/(app)/home/transaction")}>
            <Ionicons name="time-outline" size={18} color="white" />
            <DynamicText style={styles.actionText}>
              အော်ဒါမှတ်တမ်း
            </DynamicText>
          </TouchableOpacity>

          <View style={styles.verticalLine} />

          <TouchableOpacity activeOpacity={0.6} style={styles.actionBtn} onPress={() => router.navigate("/(app)/home/transaction")}>
            <Ionicons name="document-text-outline" size={18} color="white" />
            <DynamicText style={styles.actionText}>
              ငွေဖြည့်မှတ်တမ်း
            </DynamicText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 20,
    elevation: 8,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderRadius: 20,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    paddingBottom: 15,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  leftContent: {
    flex: 1,
    marginRight: 10,
  }, flagBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: "flex-start",
    gap: 6,
  },

  label: {
    color: "white",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },

  balance: {
    fontSize: 28,
    lineHeight: 38,
    color: "white",
    letterSpacing: 0.5,
    marginLeft: 4,
  },

  topUpBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },

  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    marginBottom: 4,
  },

  topUpText: {
    color: "white",
    fontSize: 11,
    lineHeight: 15,
    textAlign: "center",
    width: "100%",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 12,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    gap: 6,
  },

  actionText: {
    color: "white",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },

  verticalLine: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
});