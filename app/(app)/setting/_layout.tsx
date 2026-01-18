import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack >
            <Stack.Screen name="setting-profile/index" options={{ headerShown: false }} />
            <Stack.Screen name="about/index" options={{ headerShown: false }} />
            <Stack.Screen name="bugs-report/index" options={{ headerShown: false }} />
            <Stack.Screen name="privacy/index" options={{ headerShown: false }} />

        </Stack>
    )
}