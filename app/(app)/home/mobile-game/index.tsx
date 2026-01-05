import ScreenWrapper from '@/components/ui/layout/screen-wrapper'
import React from 'react'
import { Text } from 'react-native'

const MobileGame = () => {
  return (
    <ScreenWrapper headerShown={true} isSafeArea={true} >
      <Text>Mobile Game Page</Text>
    </ScreenWrapper>
  )
}

export default MobileGame