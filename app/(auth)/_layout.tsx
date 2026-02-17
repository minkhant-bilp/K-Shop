import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <React.Fragment>
      <Stack>
        <Stack.Protected guard={true}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={true}>
          <Stack.Screen
            name="sign-in"
            options={{ headerShown: false, presentation: "card" }}
          />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}
