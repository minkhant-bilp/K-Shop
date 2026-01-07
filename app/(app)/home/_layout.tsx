import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="popular/index" options={{ headerShown: false, headerBackTitle: "Home" }} />
      <Stack.Screen name="voucher/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="all-features/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="gift-cards/index" options={{ headerShown: false }} />
      <Stack.Screen name="top-up/index" options={{ headerShown: false }} />
      <Stack.Screen name="pc-game/index" options={{ headerShown: false }} />
      <Stack.Screen name="promo/index" options={{ headerShown: false }} />
      <Stack.Screen name="transaction/index" options={{ headerShown: false }} />
    </Stack>
  );
}
