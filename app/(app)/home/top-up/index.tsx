import PagerViews from '@/components/pager/popular-page/PagerView'
import PhoneBillShop from '@/components/top-up/PhoneBillShop'
import ScreenWrapper from '@/components/ui/layout/screen-wrapper'
import React from 'react'

const MobileGame = () => {
  return (
    <ScreenWrapper headerShown={true} isSafeArea={true} >
      <PagerViews />
      <PhoneBillShop />
    </ScreenWrapper>
  )
}

export default MobileGame