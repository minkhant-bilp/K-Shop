import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View, Dimensions, Text } from 'react-native';

import VoucherCard, { VoucherData } from '@/components/common/voucher/VoucherCard';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const VOUCHERS: VoucherData[] = [
  { id: '1', title: 'New User Promo', code: 'NEW50', discount: '50%', validUntil: '30 Jan 2026', status: 'active' },
  { id: '2', title: 'Mobile Legends Sale', code: 'MLBB20', discount: '20%', validUntil: '15 Feb 2026', status: 'active' },
  { id: '3', title: 'Weekend Special', code: 'WEEK10', discount: '10%', validUntil: '20 Jan 2026', status: 'active' },
  { id: '4', title: 'Expired Coupon', code: 'XMAS25', discount: '25%', validUntil: '25 Dec 2025', status: 'used' },
];

const Voucher = () => {
  const router = useRouter();
  const [inputCode, setInputCode] = useState("");

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>

      <LinearGradient
        colors={["#991b1b", "#dc2626", "#ef4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, isTablet && { paddingBottom: 40 }]}
      >
        <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

        <View style={[styles.headerContent, isTablet && { paddingHorizontal: 30, paddingTop: 20 }]}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && styles.tabletBackBtn]}>
            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
          </TouchableOpacity>

          <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 26 }]}>My Vouchers</Text>

          <View style={{ width: isTablet ? 50 : 40 }} />
        </View>

        <View style={[styles.inputContainer, isTablet && { paddingHorizontal: 30, gap: 15 }]}>
          <View style={[styles.inputWrapper, isTablet && { height: 60, borderRadius: 16 }]}>
            <Ionicons name="ticket-outline" size={isTablet ? 24 : 20} color="rgba(255,255,255,0.7)" style={{ marginLeft: 10 }} />
            <TextInput
              placeholder="Enter Voucher Code"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={[styles.input, isTablet && { fontSize: 18 }]}
              value={inputCode}
              onChangeText={setInputCode}
            />
          </View>
          <TouchableOpacity style={[styles.redeemBtn, isTablet && { height: 60, paddingHorizontal: 30, borderRadius: 16 }]} activeOpacity={0.8}>
            <DynamicText fontWeight="bold" style={{ color: "#dc2626", fontSize: isTablet ? 18 : 14 }}>Claim</DynamicText>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.listContainer}>
        <FlashList
          data={VOUCHERS}
          estimatedItemSize={100}
          contentContainerStyle={{
            ...styles.listContent,
            ...(isTablet ? { paddingHorizontal: 20 } : {})
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={isTablet && { marginBottom: 10 }}>
              <VoucherCard item={item} index={index} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="pricetags-outline" size={isTablet ? 70 : 50} color="#cbd5e1" />
              <Text style={[styles.emptyText, isTablet && { fontSize: 20 }]}>No Vouchers Available</Text>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  )
}

export default Voucher;

const styles = StyleSheet.create({
  header: {
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    letterSpacing: 0.5
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 3
  },
  tabletBackBtn: {
    width: 52,
    height: 52,
    borderRadius: 18,
  },

  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)"
  },
  input: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  redeemBtn: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },

  listContainer: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 40
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    gap: 10
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 16
  }
});