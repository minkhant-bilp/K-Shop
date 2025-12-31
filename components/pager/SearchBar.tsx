import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchBar() {
    return (

        <View className="flex-1 justify-center items-center bg-[#212121] px-11">


            <View className="flex-row items-center w-[85%] h-14 bg-[#343434] rounded-full pl-10 pr-1.5 border border-gray-600 top-[-300px]">


                <TextInput
                    placeholder="Search something"
                    placeholderTextColor="#9ca3af"
                    className="flex-1 text-white text-[16px] font-medium"
                />


                <TouchableOpacity
                    className="w-11 h-11 bg-[#2DD4BF] rounded-full justify-center items-center shadow-lg shadow-teal-500/50"
                    style={{ elevation: 10, shadowColor: '#2DD4BF' }}
                >
                    <Feather name="search" size={22} color="white" />
                </TouchableOpacity>

            </View>

        </View>
    );
}