import ScreenWrapper from '@/components/ui/layout/screen-wrapper'
import React from 'react'
import { Text } from 'react-native'

const Transaction = () => {
  return (
    <ScreenWrapper headerShown={true} isSafeArea={true} >
      <Text>Transaction Page</Text>
    </ScreenWrapper>
  )
}

export default Transaction