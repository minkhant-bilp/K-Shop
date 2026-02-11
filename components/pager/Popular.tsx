import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import DynamicText from '../ui/dynamic-text/dynamic-text';
import { HStack } from '../ui/hstack';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const Popular = () => {
    const router = useRouter();

    return (
        <HStack className={`justify-between items-center top-[-20px] ${isTablet ? 'px-10' : 'px-6'}`}>

            <DynamicText
                fontSize={isTablet ? "3xl" : "lg"}
                fontWeight='bold'
            >
                Popular
            </DynamicText>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    router.navigate("/(app)/home/popular");
                }}
            >
                <HStack className='items-center gap-2'>
                    <DynamicText
                        fontSize={isTablet ? "2xl" : "lg"}
                        style={{ color: "#E11D48" }}
                    >
                        See More
                    </DynamicText>

                    <Ionicons
                        name="chevron-forward"
                        size={isTablet ? 28 : 20}
                        color="#E11D48"
                    />
                </HStack>
            </TouchableOpacity>
        </HStack>
    )
}

export default Popular;