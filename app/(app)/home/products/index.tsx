import ProductsDeail from '@/components/deali/ProductsDeail'
import ScreenWrapper from '@/components/ui/layout/screen-wrapper'
import React from 'react'

const index = () => {
    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>
            <ProductsDeail />
        </ScreenWrapper>
    )
}

export default index