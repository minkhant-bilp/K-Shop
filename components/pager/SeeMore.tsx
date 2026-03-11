import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import DynamicText from '../ui/dynamic-text/dynamic-text';
import { HStack } from '../ui/hstack';

import useTranslation from '@/structure/hooks/useTranslation';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const SeeMore = () => {
    const router = useRouter();

    const { t } = useTranslation();

    const handlePress = () => {
        router.navigate("/(app)/home/popular");
    };

    return (
        <HStack className='justify-between px-6 items-center'>
            <DynamicText
                fontSize={isTablet ? "2xl" : "lg"}
                fontWeight='bold'
            >
                {t.flashSale || "Flash Sale"}
            </DynamicText>

            <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
                <HStack className='items-center gap-2'>
                    <DynamicText
                        fontSize={isTablet ? "xl" : "lg"}
                        style={{ color: "#E11D48" }}
                    >
                        {t.seeMore || "See More"}
                    </DynamicText>

                    <Ionicons
                        name="chevron-forward"
                        size={isTablet ? 26 : 20}
                        color="#E11D48"
                    />
                </HStack>
            </TouchableOpacity>
        </HStack>
    )
}

export default SeeMore;