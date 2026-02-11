import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';

import PromoCard, { PromoData } from '@/components/common/promo/PromoCard';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const CONTENT_MAX_WIDTH = 600;

const PROMOS: PromoData[] = [
  {
    id: '1',
    title: 'Chinese New Year Sale',
    description: 'Get extra bonus diamonds for every top-up via KPay.',
    discount: '50% BONUS',
    validUntil: '15 Feb',
    tag: 'Hot',
    image: require('@/assets/game_image/photo1.png')
  },
  {
    id: '2',
    title: 'Weekend Special',
    description: 'Special discount on Mobile Legends Weekly Pass.',
    discount: '20% OFF',
    validUntil: 'Sunday',
    tag: 'Limited',
    image: require('@/assets/game_image/photo2.png')
  },
  {
    id: '3',
    title: 'New Season Bundle',
    description: 'Exclusive skins and items for the new season.',
    discount: 'BUNDLE SAVE',
    validUntil: '30 Mar',
    tag: 'New',
    image: require('@/assets/game_image/photo3.png')
  },
];

const Promo = () => {
  const router = useRouter();

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>

      <LinearGradient
        colors={["#991b1b", "#dc2626", "#ef4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, isTablet && { paddingBottom: 40, alignItems: 'center' }]}
      >
        <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

        <View style={[styles.headerContent, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0 }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]} // Tablet Back Button Size
          >
            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 24 }]}>Promotions</Text>
            <Text style={[styles.subTitle, isTablet && { fontSize: 16 }]}>Best Deals For You</Text>
          </View>

          <TouchableOpacity style={[styles.iconBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
            <Ionicons name="gift-outline" size={isTablet ? 26 : 22} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={[styles.listContainer, isTablet && { alignItems: 'center' }]}>
        <View style={{ width: isTablet ? CONTENT_MAX_WIDTH : '100%', flex: 1 }}>
          <FlashList
            data={PROMOS}
            estimatedItemSize={220}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={isTablet && { marginBottom: 15 }}>
                <PromoCard
                  item={item}
                  index={index}
                  onPress={() => console.log("Promo Clicked", item.title)}
                />
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="pricetags-outline" size={isTablet ? 80 : 50} color="#cbd5e1" />
                <Text style={[styles.emptyText, isTablet && { fontSize: 20 }]}>No Active Promotions</Text>
              </View>
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Promo;

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
    zIndex: 10,
    width: '100%'
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    width: '100%'
  },
  titleContainer: {
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    letterSpacing: 0.5
  },
  subTitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center"
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