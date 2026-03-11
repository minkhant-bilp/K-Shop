import useAuthStore from "@/structure/stores/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());

  if (isLoggedIn) {
    return <Redirect href="/(app)/(bottom-tab)/home" />;
  }

  return <Redirect href="/(auth)" />;
}
