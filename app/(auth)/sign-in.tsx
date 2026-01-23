import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

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
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fadeAnim = useState(new Animated.Value(0))[0];
  const toastAnim = useRef(new Animated.Value(-150)).current;

  const [toastConfig, setToastConfig] = useState({ message: "", type: "error" });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const showToast = (message: string, type: "error" | "success") => {
    setToastConfig({ message, type });

    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: insets.top + 10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleSignIn = () => {
    if (!email.trim()) {
      showToast("Email address is required!", "error");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address!", "error");
      return;
    }

    if (!password.trim()) {
      showToast("Password is required!", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      showToast("Login Successful!", "success");

      setTimeout(() => {
        router.replace("/(app)/(bottom-tab)/home");
      }, 1000);
    }, 1500);
  };

  return (
    <View style={styles.container}>

      <Animated.View
        style={[
          styles.toastContainer,
          {
            transform: [{ translateY: toastAnim }],
            backgroundColor: toastConfig.type === "success" ? COLORS.success : COLORS.darkRed,
            marginTop: Platform.OS === 'android' ? 30 : 0
          }
        ]}
      >
        <Ionicons
          name={toastConfig.type === "success" ? "checkmark-circle" : "warning"}
          size={28}
          color="white"
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.toastTitle}>{toastConfig.type === "success" ? "Success" : "Action Required"}</Text>
          <Text style={styles.toastText}>{toastConfig.message}</Text>
        </View>
      </Animated.View>

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>

            <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Sign in to continue your journey.</Text>
            </Animated.View>

            {/* 🔥 FORM SECTION */}
            <View style={styles.formContainer}>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail" size={20} color={COLORS.gray} />
                  <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
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

                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', marginTop: 10 }}
                  onPress={() => console.log("Help Pressed")}
                >
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
                  {isLoading ? (
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
                <AntDesign name="google" size={22} color="black" />
                <Text style={styles.googleText}>Sign in with Google</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.footer}>
              <Text style={{ color: COLORS.gray }}>Dont have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(app)/(bottom-tab)/home")}>
                <Text style={{ color: COLORS.primary, fontWeight: "800" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  toastContainer: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 20,
  },
  toastTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 2
  },
  toastText: {
    color: "rgba(255,255,255,0.95)",
    fontWeight: "500",
    fontSize: 13,
  },

  header: {
    marginTop: 80,
    paddingHorizontal: 24,
    marginBottom: 40
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 8,
    fontWeight: "500"
  },

  // Form
  formContainer: {
    paddingHorizontal: 24,
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
    justifyContent: 'center',
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
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
    elevation: 2
  },
  googleText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark
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