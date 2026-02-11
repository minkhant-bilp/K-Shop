import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";

import LanguageModal from "@/components/common/Modal/LanguageModal";
import SettingItem from "@/components/profile/SettingItem";
import ProfileHeader from "@/components/ui/header/profile-header";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import useLanguageStore from "@/structure/stores/useLanguageStore";
import { getTranslation } from "@/structure/translation/i18n";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const COLORS = {
  primary: "#FF3232",
  primaryDark: "#b91c1c",
  dark: "#0f172a",
  gray: "#64748b",
  white: "#ffffff",
  lightRed: "#FEF2F2"
};

const LogoutModal = ({ visible, onClose, onConfirm }: any) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [scaleAnim, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContent,
            isTablet && { width: 500, padding: 40, borderRadius: 30 },
            { transform: [{ scale: scaleAnim }] }
          ]}
        >

          <View style={[styles.iconBox, isTablet && { width: 90, height: 90, borderRadius: 45, marginBottom: 25 }]}>
            <Ionicons name="log-out" size={isTablet ? 45 : 32} color={COLORS.primary} style={{ marginLeft: 4 }} />
          </View>

          <Text style={[styles.modalTitle, isTablet && { fontSize: 28, marginBottom: 15 }]}>Log Out</Text>
          <Text style={[styles.modalSub, isTablet && { fontSize: 18, marginBottom: 35 }]}>Are you sure you want to log out?</Text>

          <View style={[styles.btnRow, isTablet && { gap: 20 }]}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.cancelBtn, isTablet && { paddingVertical: 18, borderRadius: 20 }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.cancelText, isTablet && { fontSize: 18 }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm} activeOpacity={0.8} style={styles.shadowWrapper}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.confirmBtn, isTablet && { paddingVertical: 18, borderRadius: 20 }]}
              >
                <Text style={[styles.confirmText, isTablet && { fontSize: 18 }]}>Yes, Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </View>
    </Modal>
  );
};

const ProfileScreen = () => {
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { lang } = useLanguageStore();

  const USER_ID = "@tgi72505";
  const t = getTranslation(lang);

  const getLanguageDisplayName = () => {
    switch (lang) {
      case "en": return t.english;
      case "my": return t.myanmar;
      case "th": return t.thai;
      default: return t.english;
    }
  };

  const handleCopyUserId = async () => {
    await Clipboard.setStringAsync(USER_ID);
    if (Platform.OS === 'android') {
      ToastAndroid.show('User ID Copied!', ToastAndroid.SHORT);
    } else {
      Alert.alert("Copied", "User ID copied to clipboard");
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setTimeout(() => {
      router.replace("/(auth)/sign-in");
    }, 300);
  };

  return (
    <>
      <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable>
        <ProfileHeader />

        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{
            flex: 1,
            width: isTablet ? 600 : '100%',
            paddingHorizontal: isTablet ? 0 : 20,
            paddingTop: isTablet ? 60 : 48
          }}>

            <View style={{ gap: isTablet ? 20 : 12 }}>
              <SettingItem
                icon="person-outline"
                title={t.profile || "Profile"}
                subtitle={t.updateProfile || "Update your profile"}
                press={() => router.navigate("/(app)/setting/setting-profile")}
              />

              <SettingItem
                icon="copy-outline"
                title={t.userId || "User ID"}
                subtitle={t.copyUserId || "Copy your user ID"}
                right={USER_ID}
                press={handleCopyUserId}
              />

              <SettingItem
                icon="language-outline"
                title={t.language || "Language"}
                subtitle={t.selectLanguage || "Select your language"}
                right={getLanguageDisplayName()}
                press={() => setLanguageModalVisible(true)}
              />

              <SettingItem
                icon="bug-outline"
                title={t.bugsReport || "Bugs Report"}
                subtitle={t.reportBugs || "Send report if you see bugs"}
                arrow
                press={() => router.navigate("/setting/bugs-report")}
              />
              <SettingItem
                icon="lock-closed-outline"
                title={t.privacyPolicy || "Privacy Policy"}
                subtitle={t.readPrivacyPolicy || "Read our privacy policy"}
                arrow
                press={() => router.navigate("/setting/privacy")}
              />
              <SettingItem
                icon="information-circle-outline"
                title={t.aboutUs || "About Us"}
                subtitle={t.learnMoreAboutUs || "Learn more about us"}
                arrow
                press={() => router.navigate("/setting/about")}
              />

              <SettingItem
                icon="log-out-outline"
                title={t.logout || "Logout"}
                subtitle={t.logoutAccount || "Logout your account"}
                arrow
                press={() => setShowLogoutModal(true)}
              />
            </View>
          </View>
        </View>
      </ScreenWrapper>

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />

      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10
  },
  iconBox: {
    width: 64, height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.lightRed,
    alignItems: "center", justifyContent: "center",
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 8
  },
  modalSub: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 24
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%"
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  cancelText: {
    color: COLORS.gray,
    fontWeight: "700",
    fontSize: 15
  },
  shadowWrapper: {
    flex: 1,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  confirmText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15
  }
});

export default ProfileScreen;