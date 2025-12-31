import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <React.Fragment>
      <Stack>
        <Stack.Screen name="(bottom-tab)" options={{ headerShown: false }} />
        <Stack.Screen name="home/home" options={{ headerShown: false }} />
        {/*<Stack.Screen name="let-try" options={{ headerShown: false }} />
        <Stack.Screen name="my" options={{ headerShown: false }} />
        <Stack.Screen name="q&a" options={{ headerShown: false }} />
        <Stack.Screen name="univ" options={{ headerShown: false }} /> */}
      </Stack>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
