import CategoryList from '@/components/pager/popular-page/Icon';
import PagerViews from '@/components/pager/popular-page/PagerView';
import Products from '@/components/pager/popular-page/Products';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import { HStack } from '@/components/ui/hstack';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { VStack } from '@/components/ui/vstack';
import React from 'react';
import { ScrollView } from 'react-native';

const Popular = () => {
  return (
    <ScreenWrapper headerShown={true} isSafeArea={true} >
      <PagerViews />
      <ScrollView>
        <VStack>
          <CategoryList />
          <HStack className='px-4'>
            <DynamicText fontWeight='bold' fontSize="lg"  >Special promo for new user</DynamicText>
          </HStack>
          <Products />
          <DynamicText fontWeight='bold' fontSize="lg" style={{ paddingHorizontal: 15 }}>Mobile game promo</DynamicText>
          <Products />
        </VStack>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Popular

