import { AlarmIcon, AtivityIcon, MailIcon, StarIcon } from "@/assets/svg";
// import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";

type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

type AnimatedTabsProps = {
  activeTab: string;
  setActiveTab: (key: string) => void;
};

type TabItemProps = {
  item: Tab;
  isActive: boolean;
  onPress: (key: string) => void;
};

const { width } = Dimensions.get("window");

const TABS: Tab[] = [
  { key: "follow", label: "Follow", icon: <AtivityIcon /> },
  { key: "mix", label: "Mix", icon: <MailIcon /> },
  { key: "discover", label: "Discover", icon: <StarIcon /> },
  { key: "trending", label: "Trending", icon: <AlarmIcon /> },
  { key: "article", label: "Article", icon: <AlarmIcon /> },
];
const TabItem = React.memo(({ item, isActive, onPress }: TabItemProps) => {
  const tabWidth = width * 0.18;

  return (
    <Pressable
      onPress={() => onPress(item.key)}
      style={{ marginHorizontal: 12 }}
    >
      {({ pressed }) =>
        isActive ? (
          <LinearGradient
            colors={["#5956E9", "#FAB8C4"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: -1 }}
            style={{
              width: tabWidth,
              height: tabWidth + 50,
              borderRadius: tabWidth,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </View>
            <Text
              style={{
                color: "white",
                marginTop: 6,
                fontWeight: "600",
                fontSize: 12,
                lineHeight: 20,
              }}
            >
              {item.label}
            </Text>
          </LinearGradient>
        ) : (
          <View
            style={{
              width: tabWidth,
              height: tabWidth + 50,
              borderRadius: tabWidth,
              backgroundColor: pressed ? "#EAEAEA" : "#FCFAFE",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </View>
            <Text
              style={{
                color: "#7F85A2",
                marginTop: 6,
                fontWeight: "500",
                fontSize: 12,
                lineHeight: 20,
              }}
            >
              {item.label}
            </Text>
          </View>
        )
      }
    </Pressable>
  );
});

export default function AnimatedTabs({
  activeTab,
  setActiveTab,
}: AnimatedTabsProps) {
  return (
    <View className="mt-5">
      <FlatList
        data={TABS}
        renderItem={({ item }) => (
          <TabItem
            key={item.key}
            item={item}
            isActive={activeTab === item.key}
            onPress={setActiveTab}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        extraData={activeTab}
      />
    </View>
  );
}
