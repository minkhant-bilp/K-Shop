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
    switch (lang) {
      case "en":
        return t.english;
      case "my":
        return t.myanmar;
      case "th":
        return t.thai;
      default:
        return t.english;
    }
  };

  return (
    <>
      <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable>
        <ProfileHeader />
        <View className="flex-1 px-5 pt-12">
          <View className="space-y-3">
            <SettingItem
              icon="person-outline"
              title={t.profile || "Profile"}
              subtitle={t.updateProfile || "Update your profile"}
            />

            <SettingItem
              icon="copy-outline"
              title={t.userId || "User ID"}
              subtitle={t.copyUserId || "Copy your user ID"}
              right="@tgi72505"
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
              subtitle={
                t.reportBugs || "Send report if you see bugs in our app"
              }
              arrow
            />
            <SettingItem
              icon="lock-closed-outline"
              title={t.privacyPolicy || "Privacy Policy"}
              subtitle={t.readPrivacyPolicy || "Read our privacy policy"}
              arrow
            />
            <SettingItem
              icon="information-circle-outline"
              title={t.aboutUs || "About Us"}
              subtitle={t.learnMoreAboutUs || "Learn more about us"}
              arrow
            />

            <SettingItem
              icon="log-out-outline"
              title={t.logout || "Logout"}
              subtitle={t.logoutAccount || "Logout your account"}
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
