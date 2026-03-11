import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Components Imports
import CategoryList from '@/components/pager/popular-page/Icon';
import PagerViews from '@/components/pager/popular-page/PagerView';
import Products from '@/components/pager/popular-page/Products';
import PromoGameList from '@/components/pager/popular-page/PromoGameList';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import { HStack } from '@/components/ui/hstack';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { VStack } from '@/components/ui/vstack';

import HomeHeader from '@/components/deail-logic/HomeHeader';

// 🔥 Translation Hook ကို Import လုပ်ထားပါသည်
import useTranslation from "@/structure/hooks/useTranslation"; // လမ်းကြောင်း မှန်ကန်မှုရှိ/မရှိ စစ်ဆေးပါ

const Popular = () => {
  // 🔥 Translation ကို ခေါ်ယူထားပါသည်
  const { t } = useTranslation();

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>

      {/* 🔥 "Popular" စာသားကို translation ပြောင်းထားပါသည် */}
      <HomeHeader title={t.popular || 'Popular'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <VStack>

          <View style={styles.section}>
            <PagerViews />
          </View>

          <View style={styles.section}>
            <CategoryList />
          </View>

          <HStack className='px-4 mt-2 mb-2'>
            {/* 🔥 စာသားကို translation ပြောင်းထားပါသည် */}
            <DynamicText fontWeight='bold' style={styles.sectionTitle}>
              {t.specialPromoNewUser || "Special promo for new user"}
            </DynamicText>
          </HStack>

          <View style={styles.section}>
            <Products />
          </View>

          <View style={{ paddingHorizontal: 16, marginTop: 15, marginBottom: 10 }}>
            {/* 🔥 စာသားကို translation ပြောင်းထားပါသည် */}
            <DynamicText fontWeight='bold' style={styles.sectionTitle}>
              {t.mobileGamePromo || "Mobile game promo"}
            </DynamicText>
          </View>

          <View style={styles.section}>
            <PromoGameList />
          </View>

        </VStack>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#0f172a',
  }
});

export default Popular;