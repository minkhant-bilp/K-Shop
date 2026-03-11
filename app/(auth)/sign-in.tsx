import { useAuth } from "@/structure/hooks/useAuth";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const isTablet = width > 600;
const contentWidth = isTablet ? 500 : "100%";

const COLORS = {
  primary: "#FF3232",
  darkRed: "#b91c1c",
  dark: "#0f172a",
  gray: "#64748b",
  lightInput: "#f8fafc",
  white: "#ffffff",
  border: "#e2e8f0",
  success: "#10b981",
};

const LoginScreen = () => {
  const router = useRouter();
  const { loginMutation } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSignIn = async () => {
    if (!username.trim()) {
      Toast.show({ type: "error", text1: "Error", text2: "Username is required!" });
      return;
    }

    if (!password.trim()) {
      Toast.show({ type: "error", text1: "Error", text2: "Password is required!" });
      return;
    }

    try {
      await loginMutation.mutateAsync({ username: username.trim(), password });
      Toast.show({ type: "success", text1: "Success", text2: "Login Successful!" });
      setTimeout(() => router.replace("/(app)/(bottom-tab)/home"), 100);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const message =
        err.response?.data?.message ?? err.message ?? "Login failed. Please try again.";
      Toast.show({ type: "error", text1: "Error", text2: message });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 30, alignItems: 'center' }}
          >

            <View style={{ width: contentWidth }}>

              <View style={styles.logoContainer}>
                <View >
                  <Image
                    source={require('@/assets/game_image/pc-image/image.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Sign in to continue your journey.</Text>
              </Animated.View>

              <View style={styles.formContainer}>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person" size={20} color={COLORS.gray} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username"
                      placeholderTextColor="#94a3b8"
                      autoCapitalize="none"
                      value={username}
                      onChangeText={setUsername}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color={COLORS.gray} />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 10 }} onPress={() => console.log("Help Pressed")}>
                    <Text style={styles.helpText}>Need Help?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={handleSignIn} style={styles.shadowBtn}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.darkRed]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryBtn}
                  >
                    {loginMutation.isPending ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.btnText}>Log In</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.dividerBox}>
                  <View style={styles.line} />
                  <Text style={styles.orText}>Or continue with</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
                  <AntDesign name="google" size={22} color="black" style={{ left: 70 }} />
                  <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.footer}>
                <Text style={{ color: COLORS.gray }}>Dont have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)")}>
                  <Text style={{ color: COLORS.primary, fontWeight: "800" }}>Sign Up</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },

  logoContainer: {
    alignItems: 'center',

  },
  logo: {
    width: 100,
    height: 100,
  },

  header: {
    paddingHorizontal: 24,
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: 0.5,
    textAlign: "left"
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 8,
    fontWeight: "500",
    textAlign: "left"
  },

  formContainer: {
    paddingHorizontal: 24
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 8,
    marginLeft: 4
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightInput,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 58,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: "600"
  },

  helpText: {
    color: COLORS.gray,
    fontWeight: "500",
    fontSize: 14,
    textDecorationLine: 'underline'
  },

  shadowBtn: {
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10
  },
  primaryBtn: {
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginTop: 15
  },

  dividerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border
  },
  orText: {
    marginHorizontal: 12,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500"
  },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    backgroundColor: "white",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  googleText: {
    marginLeft: 85,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark,
    flex: 1
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 30
  }
});

export default LoginScreen;