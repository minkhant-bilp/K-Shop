
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function AuthLayout() {

  return (
    <React.Fragment>
      <Stack>
        <Stack.Protected guard={true}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={true}>
          <Stack.Screen
            name="sign-up"
            options={{ headerShown: false, presentation: "card" }}
          />
        </Stack.Protected>
        <Stack.Protected guard={true}></Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
