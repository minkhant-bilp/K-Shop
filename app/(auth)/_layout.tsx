import useAuthStore from "@/structure/stores/useAuthStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());

  if (isLoggedIn) {
    return <Redirect href="/(app)/(bottom-tab)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false, presentation: "card" }}
      />
    </Stack>
  );
}
