import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import NotificationItem, { NotificationData } from '@/components/common/noti/NotificationItem';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';

const NOTIFICATIONS: NotificationData[] = [
  { id: '1', type: 'order', title: 'Payment Successful', message: 'Your top-up of 1000 Diamonds has been successfully added to your account.', time: '2m ago', isRead: false },
  { id: '2', type: 'promo', title: 'Weekend Flash Sale!', message: 'Get 50% Bonus Diamonds only for today! Don\'t miss out.', time: '1h ago', isRead: false },
  { id: '3', type: 'security', title: 'Login Alert', message: 'New login detected from iPhone 14 Pro Max. Was this you?', time: '5h ago', isRead: true },
  { id: '4', type: 'system', title: 'System Maintenance', message: 'Server maintenance is scheduled for tomorrow at 2:00 AM.', time: '1d ago', isRead: true },
  { id: '5', type: 'order', title: 'Order Completed', message: 'Weekly Pass purchase successful. Thank you for using our service.', time: '2d ago', isRead: true },
];

const Notification = () => {
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
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#dc2626" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <DynamicText fontWeight="bold" style={styles.headerTitle}>Notifications</DynamicText>
          </View>


        </View>
      </LinearGradient>

      <View style={styles.listContainer}>
        <FlashList
          data={NOTIFICATIONS}
          estimatedItemSize={80}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NotificationItem
              item={item}
              onPress={() => console.log("Read Noti", item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="notifications-off-outline" size={40} color="#cbd5e1" />
              </View>
              <DynamicText style={styles.emptyText}>No Notifications</DynamicText>
              <DynamicText style={styles.emptySubText}>Youre all caught up!</DynamicText>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  )
}

export default Notification;

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
  titleContainer: {
    alignItems: 'center',
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    letterSpacing: 0.5,
    marginRight: 30
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
    paddingTop: 10,
    paddingBottom: 40
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    gap: 10
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  emptyText: {
    color: "#334155",
    fontSize: 18,
    fontWeight: "bold"
  },
  emptySubText: {
    color: "#94a3b8",
    fontSize: 14
  }
});