import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="products/index" options={{ headerShown: false, headerBackTitle: "Home" }} />
      <Stack.Screen name="balance/topup" options={{ headerShown: false }} />
      <Stack.Screen name="balance/paymet" options={{ headerShown: false, headerBackTitle: "Home" }} />
      <Stack.Screen name="popular/index" options={{ headerShown: false, headerBackTitle: "Home" }} />
      <Stack.Screen name="voucher/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="all-features/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="noti/index" options={{ headerShown: false }} />
      <Stack.Screen name="top-up/index" options={{ headerShown: false }} />
      <Stack.Screen name="pc-game/index" options={{ headerShown: false }} />
      <Stack.Screen name="promo/index" options={{ headerShown: false }} />
      <Stack.Screen name="transaction/index" options={{ headerShown: false }} />
    </Stack>

  );
}
