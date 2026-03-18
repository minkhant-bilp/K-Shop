import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ScreenWrapper from '@/components/ui/layout/screen-wrapper';

// 📍 Store အစား API Hook ကို Import လုပ်ပါမယ်
import { useCoin } from '@/structure/hooks/useCoin';
import useTranslation from "@/structure/hooks/useTranslation";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

// 📍 Item Type အသစ် (API ကလာတဲ့ ပုံစံအတိုင်း အကြမ်းဖျင်း)
const TransactionItem = ({ item }: { item: any }) => {
  const { t } = useTranslation();

  const getStatusConfig = (status: string) => {
    const s = status ? status.toLowerCase() : "pending";
    switch (s) {
      case 'success':
        return { color: '#10B981', icon: 'checkmark-circle', bg: '#ECFDF5', text: t.statusSuccesse || 'Success' };
      case 'failed':
        return { color: '#EF4444', icon: 'close-circle', bg: '#FEF2F2', text: t.statusFailede || 'Failed' };
      default:
        return { color: '#F59E0B', icon: 'time', bg: '#FFFBEB', text: t.statusPendinge || 'Pending' };
    }
  };

  const statusInfo = getStatusConfig(item.status);
  const isIncome = item.type === 'deposit';

  // 📍 Date Format လုပ်တဲ့ Function
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "Just now";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Just now";
    return date.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  // 📍 API Data ကနေ လိုအပ်တာတွေ ဆွဲထုတ်ပါမယ်
  const displayTitle = item.paymentMethod || item.title || (isIncome ? "Deposit" : "Purchase");
  const displaySubTitle = item.subTitle || (item.id ? `TXN-${String(item.id).slice(-6)}` : "Transaction");
  const displayAmount = item.amount || 0;
  const displayCurrency = item.currency || "Ks";
  const displayDate = formatDate(item.createdDateInMilliSeconds || item.createdAt || item.date);

  return (
    <View style={[styles.card, isTablet && styles.tabletCard]}>
      <View style={[styles.iconBox, isTablet && styles.tabletIconBox]}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        ) : (
          <Ionicons name={isIncome ? "wallet" : "cart"} size={isTablet ? 32 : 24} color="#64748b" />
        )}
      </View>

      <View style={[styles.content, isTablet && styles.tabletContent]}>
        <Text style={[styles.title, isTablet && styles.tabletTitle]} numberOfLines={1}>{displayTitle}</Text>
        <Text style={[styles.subTitle, isTablet && styles.tabletSubTitle]} numberOfLines={1}>{displaySubTitle}</Text>
        {!isTablet && <Text style={styles.date}>{displayDate}</Text>}
      </View>

      <View style={[styles.rightSection, isTablet && styles.tabletRightSection]}>
        <Text style={[
          styles.amount,
          { color: isIncome ? '#10B981' : '#0f172a' },
          item.status === 'failed' && { color: '#94a3b8', textDecorationLine: 'line-through' },
          isTablet && styles.tabletAmount
        ]}>
          {isIncome ? '+' : '-'}{Number(displayAmount).toLocaleString()} {displayCurrency}
        </Text>

        <View style={[styles.statusInfoRow, isTablet && { width: '100%', justifyContent: 'space-between', marginTop: 8 }]}>
          {isTablet && <Text style={styles.date}>{displayDate}</Text>}

          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }, isTablet && { alignSelf: 'flex-end' }]}>
            <Ionicons name={statusInfo.icon as any} size={12} color={statusInfo.color} />
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Transaction = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const TABS = [
    { key: 'All', label: t.all || 'All' },
    { key: 'Income', label: t.income || 'Income' },
    { key: 'Expense', label: t.expense || 'Expense' }
  ] as const;

  const [activeTab, setActiveTab] = useState<string>('All');

  // 📍 API ကနေ Data ယူပါမယ်
  const { rechargeHistory, topupHistory, walletQuery } = useCoin();

  // 📍 အဝင်နဲ့ အထွက်ကို Type သတ်မှတ်ပြီး ပေါင်းပါမယ်
  const incomeData = (rechargeHistory || []).map((item: any) => ({ ...item, type: 'deposit' }));
  const expenseData = (topupHistory || []).map((item: any) => ({ ...item, type: 'purchase' }));
  const allTransactions = [...incomeData, ...expenseData].sort((a, b) => {
    // အသစ်ဆုံးကို အပေါ်မှာထားဖို့ (Optional)
    const dateA = a.createdDateInMilliSeconds || a.createdAt || a.date || 0;
    const dateB = b.createdDateInMilliSeconds || b.createdAt || b.date || 0;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // 📍 Tab အလိုက် စစ်ထုတ်ပါမယ်
  const getFilteredData = () => {
    if (activeTab === 'All') return allTransactions;
    if (activeTab === 'Income') return incomeData;
    return expenseData;
  };

  const filteredData = getFilteredData();

  return (
    <ScreenWrapper headerShown={false} isSafeArea={true}>
      <View style={styles.container}>
        <View style={[styles.header, isTablet && { paddingVertical: 25, paddingHorizontal: 30 }]}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && styles.tabletBtn]} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={isTablet ? 28 : 24} color="#0f172a" />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, isTablet && { fontSize: 24 }]}>{t.history || "History"}</Text>

          <TouchableOpacity style={[styles.iconBtn, isTablet && styles.tabletBtn]} activeOpacity={0.7} onPress={() => router.navigate("/(app)/(bottom-tab)/notification")}>
            <Ionicons name="notifications" size={isTablet ? 26 : 22} color="#E11D48" />
            <View style={styles.redDot} />
          </TouchableOpacity>
        </View>

        <View style={[styles.tabWrapper, isTablet && { paddingHorizontal: 30, marginBottom: 20 }]}>
          <View style={[styles.tabContainer, isTablet && { padding: 8 }]}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  activeOpacity={0.8}
                  style={[styles.tabBtn, isActive && styles.activeTabBtn, isTablet && { paddingVertical: 16 }]}
                >
                  <Text style={[styles.tabText, isActive && styles.activeTabText, isTablet && { fontSize: 16 }]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {/* 📍 Loading ပြပါမယ် */}
          {walletQuery.isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#E11D48" />
              <Text style={{ marginTop: 10, color: '#64748b' }}>{t.loading || "Loading records..."}</Text>
            </View>
          ) : (
            <FlashList
              data={filteredData}
              numColumns={isTablet ? 3 : 1}
              key={isTablet ? 'tablet-grid' : 'mobile-list'}
              estimatedItemSize={85}
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              renderItem={({ item }) => (
                <View style={isTablet ? { padding: 8, width: '100%' } : {}}>
                  <TransactionItem item={item} />
                </View>
              )}
              contentContainerStyle={{
                ...styles.listContent,
                ...(isTablet ? { paddingHorizontal: 22 } : {})
              }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <View style={[styles.emptyIconCircle, isTablet && { width: 100, height: 100, borderRadius: 50 }]}>
                    <Ionicons name="receipt-outline" size={isTablet ? 50 : 40} color="#cbd5e1" />
                  </View>
                  <Text style={[styles.emptyText, isTablet && { fontSize: 22 }]}>{t.noHistoryYet || "No history yet"}</Text>
                  <Text style={[styles.emptySubText, isTablet && { fontSize: 16 }]}>{t.historyDesc || "Transactions will appear here when you make them"}</Text>
                </View>
              }
            />
          )}
        </View>
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
    backgroundColor: '#f8fafc'
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
    backgroundColor: '#fff1f2'
  },
  tabletBtn: {
    width: 50,
    height: 50,
    borderRadius: 16
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
    elevation: 3
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12
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
    paddingBottom: 40
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
    elevation: 2
  },
  tabletCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    height: 180,
    justifyContent: 'space-between'
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
  tabletIconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  tabletContent: {
    width: '100%',
    marginBottom: 6
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2
  },
  tabletTitle: {
    fontSize: 18,
    marginBottom: 4
  },
  subTitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4
  },
  tabletSubTitle: {
    fontSize: 14
  },
  date: {
    fontSize: 11,
    color: '#94a3b8'
  },
  rightSection: {
    alignItems: 'flex-end'
  },
  tabletRightSection: {
    width: '100%',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6
  },
  tabletAmount: {
    fontSize: 20,
    marginBottom: 0
  },
  statusInfoRow: {
    flexDirection: 'row',
    alignItems: 'center'
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
    marginTop: 100
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