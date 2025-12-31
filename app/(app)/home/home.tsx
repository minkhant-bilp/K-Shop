// screens/HomeScreen.tsx
import FlashSaleList from "@/components/pager/Category";
import SeeMore from "@/components/pager/SeeMore";
import ViewPager from "@/components/pager/ViewPager";
import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { HStack } from "@/components/ui/hstack";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import { Box } from "@gluestack-ui/themed";
import {
  FileText,
  Flame,
  Gift,
  Monitor,
  MoreHorizontal,
  Percent,
  Smartphone,
  Ticket
} from 'lucide-react-native';
import React from "react";
import { ScrollView, TouchableOpacity, View } from 'react-native';


const icons = [
  { id: 1, title: 'Popular', icon: Flame },
  { id: 2, title: 'Mobile Game', icon: Smartphone },
  { id: 3, title: 'PC Game', icon: Monitor },
  { id: 4, title: 'Voucher', icon: Ticket },
  { id: 5, title: 'Promo', icon: Percent },
  { id: 6, title: 'Transaction', icon: FileText },
  { id: 7, title: 'Gift Cards', icon: Gift },
  { id: 8, title: 'All features', icon: MoreHorizontal },
];

const HomeScreen = () => {

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false} >
      <Box>
        <ViewPager />
        <ScrollView>
          <Box>

            <HStack>
              <View className="flex-row flex-wrap justify-between px-4 mt-28">
                {icons.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="items-center w-[22%] mb-6"
                  >
                    {/* Icon Container */}
                    <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mb-2 border border-gray-200">

                      <item.icon size={24} color="#333" strokeWidth={1.5} />
                    </View>


                    <DynamicText fontWeight="bold" fontSize="xs" fontColor="gray" text-xs text-gray-600 font-medium text-center>
                      {item.title}
                    </DynamicText>
                  </TouchableOpacity>
                ))}
              </View>
            </HStack>
          </Box>
          <SeeMore />
          <FlashSaleList />
        </ScrollView>
      </Box>
    </ScreenWrapper>
  );
};

export default HomeScreen;