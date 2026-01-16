import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import PcGameCard, { PcGameData } from '@/components/pc-game/PcGameCard';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';

// Mock Data
const PC_GAMES: PcGameData[] = [
  { id: '1', title: 'Grand Theft Auto V', price: '15,000 Ks', platform: 'Steam', genre: 'Open World', image: require('@/assets/game_image/pc-image/pc1.png') },
  { id: '2', title: 'Elden Ring', price: '45,000 Ks', platform: 'Steam', genre: 'RPG', image: require('@/assets/game_image/pc-image/pc2.png') },
  { id: '3', title: 'Valorant Points', price: '3,000 Ks', platform: 'Battle.net', genre: 'FPS', image: require('@/assets/game_image/pc-image/pc3.png') },
  { id: '4', title: 'FIFA 24', price: '60,000 Ks', platform: 'Epic', genre: 'Sports', image: require('@/assets/game_image/pc-image/pc4.png') },
  { id: '5', title: 'Red Dead Redemption 2', price: '25,000 Ks', platform: 'Steam', genre: 'Adventure', image: require('@/assets/game_image/pc-image/pc5.png') },
  { id: '6', title: 'Cyberpunk 2077', price: '30,000 Ks', platform: 'Steam', genre: 'Sci-Fi', image: require('@/assets/game_image/pc-image/pc6.png') },
];

const PcGame = () => {
  const router = useRouter();

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>

      <LinearGradient
        colors={["#991b1b", "#dc2626", "#ef4444"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

        <View style={styles.headerContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#dc2626" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <DynamicText fontWeight="bold" style={styles.headerTitle}>PC Games</DynamicText>
          </View>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.listContainer}>
        <FlashList
          data={PC_GAMES}
          numColumns={2}
          estimatedItemSize={250}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PcGameCard
              item={item}
              index={index}
              onPress={() => {
                console.log("Clicked", item.title);
              }}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  )
}

export default PcGame;

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
    paddingHorizontal: 8,
    paddingTop: 20,
    paddingBottom: 40
  }
});