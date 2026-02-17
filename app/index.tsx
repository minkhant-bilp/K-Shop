import { Redirect } from "expo-router";
import useAuthStore from "@/structure/stores/useAuthStore";

export default function Index() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());

  if (isLoggedIn) {
    return <Redirect href="/(app)/(bottom-tab)/home" />;
  }

  return <Redirect href="/(auth)" />;
}
