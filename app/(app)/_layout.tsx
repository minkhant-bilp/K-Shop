import { Redirect, Stack } from "expo-router";
import React from "react";
import useAuthStore from "@/structure/stores/useAuthStore";

export default function AppLayout() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
        <Stack.Screen name="(bottom-tab)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} />
      </Stack>
  );
}

