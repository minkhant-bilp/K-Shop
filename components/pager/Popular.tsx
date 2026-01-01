import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import DynamicText from '../ui/dynamic-text/dynamic-text';
import { HStack } from '../ui/hstack';

const Popular = () => {
    return (
        <HStack className='justify-between px-6 items-center top-[-20px]'>
            <DynamicText fontSize="lg" fontWeight='bold' >Popular</DynamicText>
            <HStack className='items-center gap-2'>
                <DynamicText fontSize="lg">See More</DynamicText>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </HStack>
        </HStack>
    )
}

export default Popular