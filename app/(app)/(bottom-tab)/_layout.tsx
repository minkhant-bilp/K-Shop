import CustomNavBar from "@/components/ui/bottom-tab/CustomBottomBar";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="notification" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
