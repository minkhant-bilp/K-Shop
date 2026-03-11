import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { useAnimatedStyle, withSpring, ZoomIn } from "react-native-reanimated";


import useTranslation from "@/structure/hooks/useTranslation";

type Country = "TH" | "MM";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const THAI_PRODUCTS = [
  { id: "tm1", title: "True Move", price: "20 Baht", amount: 20, image: require("@/assets/bill_image/thai.png") },
  { id: "tm2", title: "True Move", price: "50 Baht", amount: 50, image: require("@/assets/bill_image/thai.png") },
  { id: "tm3", title: "True Move", price: "100 Baht", amount: 100, image: require("@/assets/bill_image/thai.png") },
  { id: "ais1", title: "AIS", price: "20 Baht", amount: 20, image: require("@/assets/bill_image/thai2.png") },
  { id: "ais2", title: "AIS", price: "50 Baht", amount: 50, image: require("@/assets/bill_image/thai2.png") },
  { id: "ais3", title: "AIS", price: "100 Baht", amount: 100, image: require("@/assets/bill_image/thai2.png") },
  { id: "dt1", title: "DTAC", price: "20 Baht", amount: 20, image: require("@/assets/bill_image/thai3.png") },
  { id: "dt2", title: "DTAC", price: "50 Baht", amount: 50, image: require("@/assets/bill_image/thai3.png") },
  { id: "dt3", title: "DTAC", price: "100 Baht", amount: 100, image: require("@/assets/bill_image/thai3.png") },
];

const MYANMAR_PRODUCTS = [
  { id: "m1", title: "Mytel", price: "1,000 Ks", amount: 1000, image: require("@/assets/bill_image/mm1.png") },
  { id: "m2", title: "Mytel", price: "3,000 Ks", amount: 3000, image: require("@/assets/bill_image/mm1.png") },
  { id: "m3", title: "Mytel", price: "5,000 Ks", amount: 5000, image: require("@/assets/bill_image/mm1.png") },
  { id: "at1", title: "Atom", price: "1,000 Ks", amount: 1000, image: require("@/assets/bill_image/mm2.png") },
  { id: "at2", title: "Atom", price: "3,000 Ks", amount: 3000, image: require("@/assets/bill_image/mm2.png") },
  { id: "at3", title: "Atom", price: "5,000 Ks", amount: 5000, image: require("@/assets/bill_image/mm2.png") },
  { id: "oo1", title: "Ooredoo", price: "1,000 Ks", amount: 1000, image: require("@/assets/bill_image/mm3.png") },
  { id: "oo2", title: "Ooredoo", price: "3,000 Ks", amount: 3000, image: require("@/assets/bill_image/mm3.png") },
  { id: "mp1", title: "MPT", price: "1,000 Ks", amount: 1000, image: require("@/assets/bill_image/mm4.png") },
  { id: "mp2", title: "MPT", price: "3,000 Ks", amount: 3000, image: require("@/assets/bill_image/mm4.png") },
  { id: "mp3", title: "MPT", price: "3,000 Ks", amount: 3000, image: require("@/assets/bill_image/mm4.png") },
];

const ActionSheet = ({ visible, item, country, onClose, onConfirm }: any) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    if (!visible) {
      setPhone("");
      setError("");
    }
  }, [visible]);

  if (!item) return null;

  const placeholderText = country === "TH" ? "08x-xxx-xxxx" : "09xxxxxxxxx";
  const prefixIcon = country === "TH" ? "🇹🇭" : "🇲🇲";

  const handleConfirmPress = () => {
    const cleanPhone = phone.trim();

    if (country === "TH") {
      if (cleanPhone.length !== 10) {
        setError(t.thaiNumberError || "Thai number must be 10 digits");
        return;
      }
    }
    else if (country === "MM") {
      if (cleanPhone.length !== 11) {
        setError(t.mmNumberError || "Myanmar number must be 11 digits");
        return;
      }
    }

    setError("");
    onConfirm(cleanPhone);
  };

  const isPhoneValid = phone.trim().length > 0;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <Pressable style={[styles.sheetContainer, isTablet && { width: 500, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 20, borderRadius: 20 }]} onPress={Keyboard.dismiss}>

            <View style={styles.handleBar} />

            <View style={styles.header}>
              <DynamicText fontWeight="bold" fontSize="xl" style={{ color: "#1e293b" }}>
                {t.topUpRequest || "Top Up Request"}
              </DynamicText>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.summaryCard}>
              <Image source={item.image} style={styles.summaryImage} resizeMode="contain" />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <DynamicText style={{ color: "#64748b", fontSize: 12 }}>
                  {t.selectedPackage || "Selected Package"}
                </DynamicText>
                <DynamicText fontWeight="bold" fontSize="lg" style={{ color: "#1e293b" }}>{item.title}</DynamicText>
              </View>
              <View style={styles.priceTag}>
                <DynamicText fontWeight="bold" style={{ color: "#E11D48", fontSize: 16 }}>{item.price}</DynamicText>
              </View>
            </View>

            <View style={{ width: '100%', marginBottom: 25 }}>
              <DynamicText style={styles.inputLabel}>
                {t.phoneNumber || "Phone Number"}
              </DynamicText>
              <View style={[styles.inputContainer, error ? { borderColor: "#ef4444", borderWidth: 1.5 } : {}]}>
                <View style={styles.prefixContainer}>
                  <DynamicText fontSize="lg">{prefixIcon}</DynamicText>
                </View>
                <View style={styles.verticalLine} />
                <TextInput
                  style={styles.textInput}
                  placeholder={placeholderText}
                  placeholderTextColor="#94a3b8"
                  keyboardType="number-pad"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    setError("");
                  }}
                  maxLength={15}
                />
                <Ionicons
                  name={error ? "alert-circle" : "call-outline"}
                  size={20}
                  color={error ? "#ef4444" : "#94a3b8"}
                  style={{ marginRight: 15 }}
                />
              </View>
              {error ? (
                <DynamicText style={{ color: "#ef4444", fontSize: 12, marginTop: 6, marginLeft: 4 }}>{error}</DynamicText>
              ) : null}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleConfirmPress}
              style={styles.btnWrapper}
              disabled={!isPhoneValid}
            >
              <LinearGradient
                colors={isPhoneValid ? ['#ef4444', '#dc2626', '#b91c1c'] : ['#e2e8f0', '#cbd5e1', '#94a3b8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBtn}
              >
                <DynamicText fontWeight="bold" style={{ color: isPhoneValid ? "white" : "#64748b", fontSize: 16 }}>
                  {t.confirmTopUp || "Confirm Top Up"}
                </DynamicText>
                <MaterialCommunityIcons
                  name="cellphone-text"
                  size={22}
                  color={isPhoneValid ? "white" : "#64748b"}
                  style={{ marginLeft: 8 }}
                />
              </LinearGradient>
            </TouchableOpacity>

          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const ProductCard = ({ item, index, onPress }: { item: any, index: number, onPress: (item: any) => void }) => {
  return (
    <Animated.View
      entering={ZoomIn.delay(index * 20).springify()}
      style={{ width: "31%" }}
    >
      <Pressable
        onPress={() => onPress(item)}
        className={`bg-white rounded-xl border border-slate-100 shadow-sm items-center justify-center w-full 
            ${isTablet ? 'h-60 p-4' : 'h-40 p-2'}`}
      >
        <Image
          source={item.image}
          style={{
            width: isTablet ? 80 : 48,
            height: isTablet ? 80 : 48,
            borderRadius: isTablet ? 20 : 999,
            marginBottom: isTablet ? 12 : 8
          }}
          resizeMode="contain"
        />

        <DynamicText
          fontWeight="bold"
          fontSize={isTablet ? "lg" : "xs"}
          numberOfLines={1}
          style={{ color: "#334155", textAlign: 'center', marginBottom: 6 }}
        >
          {item.title}
        </DynamicText>

        <View className={`bg-rose-50 rounded-md w-full items-center ${isTablet ? 'px-4 py-2' : 'px-2 py-1'}`}>
          <DynamicText
            fontWeight="bold"
            style={{ fontSize: isTablet ? 16 : 11, color: "#E11D48" }}
          >
            {item.price}
          </DynamicText>
        </View>
      </Pressable>
    </Animated.View>
  )
};

export default function PhoneBillProducts() {
  const router = useRouter();
  const { t } = useTranslation();

  const [country, setCountry] = useState<Country>("TH");
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const products = country === "TH" ? THAI_PRODUCTS : MYANMAR_PRODUCTS;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(country === "TH" ? 0 : containerWidth / 2, { damping: 15, stiffness: 120 }) }],
    };
  });

  const handlePress = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleConfirm = (phoneNumber: string) => {
    setModalVisible(false);

    router.push({
      pathname: "/(app)/home/top-up/paymet",
      params: {
        title: selectedItem?.title,
        price: selectedItem?.price,
        image: selectedItem?.image,
        phoneNumber: phoneNumber
      }
    });
  };

  return (
    <View className="flex-1 bg-white p-4" style={isTablet && { paddingHorizontal: 40 }}>
      <View
        className="h-12 bg-slate-100 rounded-full flex-row items-center relative mb-4 p-1 border border-slate-200"
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width - 8)}
        style={isTablet && { height: 60, marginBottom: 20 }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              width: "50%", height: "100%", position: "absolute", left: 4,
              backgroundColor: "white", borderRadius: 999,
              shadowColor: "#000", shadowOpacity: 0.1, elevation: 3,
            }
          ]}
        />
        <Pressable onPress={() => setCountry("TH")} className="flex-1 h-full justify-center items-center z-10">
          <DynamicText fontWeight="bold" fontSize={isTablet ? "lg" : "sm"} style={{ color: country === "TH" ? "#1e293b" : "#94a3b8" }}>
            🇹🇭 {t.thailand || "Thailand"}
          </DynamicText>
        </Pressable>
        <Pressable onPress={() => setCountry("MM")} className="flex-1 h-full justify-center items-center z-10">
          <DynamicText fontWeight="bold" fontSize={isTablet ? "lg" : "sm"} style={{ color: country === "MM" ? "#1e293b" : "#94a3b8" }}>
            🇲🇲 {t.myanmarr || "Myanmar"}
          </DynamicText>
        </Pressable>
      </View>

      <FlatList
        key={country}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} onPress={handlePress} />
        )}
      />

      <ActionSheet
        visible={modalVisible}
        item={selectedItem}
        country={country}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1
    , backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end"
  },
  sheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    width: "100%"
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  closeBtn: {
    padding: 8,
    backgroundColor: "#f8fafc",
    borderRadius: 50
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 24
  },
  summaryImage: {
    width: 45,
    height: 45,
    borderRadius: 10
  },
  priceTag: {
    backgroundColor: '#fff1f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8
  },
  inputLabel: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 4
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    height: 56,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  prefixContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalLine: {
    width: 1,
    height: '60%',
    backgroundColor: '#e2e8f0'
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#1e293b',
    fontWeight: '600'
  },
  btnWrapper: {
    width: "100%",
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8
  },
  gradientBtn: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  }
});