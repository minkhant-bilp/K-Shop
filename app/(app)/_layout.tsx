import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  return (
    <React.Fragment>
      <Stack>
        <Stack.Screen name="(bottom-tab)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="setting" options={{ headerShown: false }} />
      </Stack>
    </React.Fragment>
  );
}

