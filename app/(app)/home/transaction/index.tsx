import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { useWalletStore, TransactionData } from '@/store/useWalletStore';

const TABS = ['All', 'Income', 'Expense'] as const;

const TransactionItem = ({ item }: { item: TransactionData }) => {

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':
        return { color: '#10B981', icon: 'checkmark-circle', bg: '#ECFDF5', text: 'Success' };
      case 'failed':
        return { color: '#EF4444', icon: 'close-circle', bg: '#FEF2F2', text: 'Failed' };
      default:
        return { color: '#F59E0B', icon: 'time', bg: '#FFFBEB', text: 'Pending' };
    }
  };

  const statusInfo = getStatusConfig(item.status);
  const isIncome = item.type === 'deposit';

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        {item.image ? (
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        ) : (
          <Ionicons name={isIncome ? "wallet" : "cart"} size={24} color="#64748b" />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.subTitle} numberOfLines={1}>{item.subTitle}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[
          styles.amount,
          { color: isIncome ? '#10B981' : '#0f172a' },
          item.status === 'failed' && { color: '#94a3b8', textDecorationLine: 'line-through' }
        ]}>
          {isIncome ? '+' : '-'}{item.amount.toLocaleString()} {item.currency}
        </Text>

        <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
          <Ionicons name={statusInfo.icon as any} size={12} color={statusInfo.color} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Transaction = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('All');
  const router = useRouter();

  const transactions = useWalletStore((state) => state.transactions);

  const getFilteredData = () => {
    if (activeTab === 'All') return transactions;
    if (activeTab === 'Income') return transactions.filter(i => i.type === 'deposit');
    return transactions.filter(i => i.type === 'purchase');
  };

  const filteredData = getFilteredData();

  return (
    <ScreenWrapper headerShown={false} isSafeArea={true}>

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#0f172a" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>History</Text>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} onPress={() => router.navigate("/(app)/(bottom-tab)/notification")}>
            <Ionicons name="notifications" size={22} color="#E11D48" />
            <View style={styles.redDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabWrapper}>
          <View style={styles.tabContainer}>
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                  style={[styles.tabBtn, isActive && styles.activeTabBtn]}
                >
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <FlashList
          data={filteredData}
          estimatedItemSize={85}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem item={item} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="receipt-outline" size={40} color="#cbd5e1" />
              </View>
              <Text style={styles.emptyText}>မှတ်တမ်းမရှိသေးပါ</Text>
              <Text style={styles.emptySubText}>အရောင်းအဝယ်ပြုလုပ်သည့်အခါ ဤနေရာတွင် ပေါ်လာပါမည်</Text>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8fafc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 0.5
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#fff1f2',
  },
  redDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E11D48',
    borderWidth: 1.5,
    borderColor: '#fff1f2'
  },

  tabWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 5
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 16,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTabBtn: {
    backgroundColor: '#E11D48',
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600'
  },
  activeTabText: {
    color: 'white',
    fontWeight: '700'
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2
  },
  subTitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4
  },
  date: {
    fontSize: 11,
    color: '#94a3b8'
  },
  rightSection: {
    alignItems: 'flex-end'
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700'
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8
  },
  emptySubText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center'
  }
});