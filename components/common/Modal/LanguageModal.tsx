import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import useTranslation from "@/structure/hooks/useTranslation";
import useLanguageStore from "@/structure/stores/useLanguageStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { lang, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  
  const languages = [
    { code: "en" as const, name: t.english, nativeName: "English" },
    { code: "my" as const, name: t.myanmar, nativeName: "မြန်မာ" },
    { code: "th" as const, name: t.thai, nativeName: "ไทย" },
  ];

  const handleLanguageSelect = (languageCode: 'my' | 'en' | 'th') => {
    setLanguage(languageCode);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.modalView}>
          <View style={styles.header}>
            <DynamicText fontSize={"lg"} fontWeight="bold">
              {t.selectLanguage}
            </DynamicText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.languageList}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  lang === language.code && styles.selectedItem,
                ]}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <View style={styles.languageContent}>
                  <View style={styles.languageTextContainer}>
                    <DynamicText fontSize="sm" fontWeight="medium">
                      {language.name}
                    </DynamicText>
                    <DynamicText fontSize="xs" className="text-gray-500">
                      {language.nativeName}
                    </DynamicText>
                  </View>
                  {lang === language.code && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#007AFF"
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "85%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    gap: 12,
  },
  languageItem: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  selectedItem: {
    backgroundColor: "rgba(255, 50, 50, 0.1)",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  languageContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageTextContainer: {
    flex: 1,
  },
});

export default LanguageModal;