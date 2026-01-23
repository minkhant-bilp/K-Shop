import HomeHeader from '@/components/deail-logic/HomeHeader'
import PagerView from '@/components/pager/popular-page/PagerView'
import PhoneBillProducts from '@/components/top-up/PhoneBillShop'
import ScreenWrapper from '@/components/ui/layout/screen-wrapper'
import React from 'react'

const MobileGame = () => {
  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>
      <HomeHeader title='Top up' />
      <PagerView />
      <PhoneBillProducts />
    </ScreenWrapper>
  )
}

export default MobileGame