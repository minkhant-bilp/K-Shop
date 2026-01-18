import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  ArrowLeft,
  Flame,
  History,
  Megaphone,
  Monitor,
  Settings,
  Smartphone,
  Ticket
} from 'lucide-react-native';

import FeatureGridItem, { FeatureData } from '@/components/common/all-features/FeatureGridItem';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';

const FEATURES: FeatureData[] = [
  // Group 1: Services
  { id: '1', title: 'Popular', icon: Flame, route: '/home/popular' },
  { id: '2', title: 'Top Up', icon: Smartphone, route: '/home/top-up' },
  { id: '3', title: 'PC Games', icon: Monitor, route: '/home/pc-game' },
  { id: '4', title: 'Vouchers', icon: Ticket, route: '/home/voucher' },
  { id: '5', title: 'History', icon: History, route: '/home/transaction', color: '#3b82f6' },
  { id: '6', title: 'Promotions', icon: Megaphone, route: '/home/promo', color: '#f59e0b' },
  { id: '8', title: 'Settings', icon: Settings, route: '/(bottom-tab)/profile', color: '#64748b' },
];

const AllFeatures = () => {
  const router = useRouter();

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>

      {/* Header */}
      <LinearGradient
        colors={["#991b1b", "#dc2626", "#ef4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#dc2626" />
          </TouchableOpacity>


          <View style={{ width: 42 }} />
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <FlashList
          data={FEATURES}
          numColumns={4}
          estimatedItemSize={90}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FeatureGridItem
              item={item}
              onPress={() => router.push(item.route as any)}
            />
          )}
          ListHeaderComponent={
            <DynamicText fontWeight="bold" style={styles.sectionTitle}>Main Features</DynamicText>
          }
        />
      </View>

    </ScreenWrapper>
  )
}

export default AllFeatures;

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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 40
  },
  sectionTitle: {
    fontSize: 16,
    color: "#0f172a",
    marginLeft: 20,
    marginBottom: 20
  }
});