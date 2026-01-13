import LanguageModal from "@/components/common/Modal/LanguageModal";
import SettingItem from "@/components/profile/SettingItem";
import ProfileHeader from "@/components/ui/header/profile-header";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import useLanguageStore from "@/structure/stores/useLanguageStore";
import { getTranslation } from "@/structure/translation/i18n";
import React, { useState } from "react";
import { View } from "react-native";

const ProfileScreen = () => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const { lang } = useLanguageStore();

  const t = getTranslation(lang);
  const getLanguageDisplayName = () => {
    return lang === "en" ? "English" : "မြန်မာ";
  };
  return (
    <>
      <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable>
        <ProfileHeader />
        <View className="flex-1 px-5 pt-12">
          <View className="space-y-3">
            <SettingItem
              icon="person-outline"
              title="Profile"
              subtitle="Update your profile"
            />

            <SettingItem
              icon="copy-outline"
              title="User ID"
              subtitle="Copy your user ID"
              right="@tgi72505"
            />

            <SettingItem
              icon="language-outline"
              title={""}
              subtitle={""}
              right={getLanguageDisplayName()}
              press={() => setLanguageModalVisible(true)}
            />

            <SettingItem
              icon="bug-outline"
              title="Bugs Report"
              subtitle="Send report if you see bugs in our app"
              arrow
            />
            <SettingItem
              icon="lock-closed-outline"
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              arrow
            />
            <SettingItem
              icon="information-circle-outline"
              title="About Us"
              subtitle="Learn more about us"
              arrow
            />

            <SettingItem
              icon="log-out-outline"
              title="Logout"
              subtitle="Logout your account"
              arrow
            />
          </View>
        </View>
      </ScreenWrapper>
      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />
    </>
  );
};

export default ProfileScreen;
