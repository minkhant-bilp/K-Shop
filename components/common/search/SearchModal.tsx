import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

// 🔥 Translation Hook
import useTranslation from "@/structure/hooks/useTranslation"; // လမ်းကြောင်းမှန်ကန်အောင် စစ်ဆေးပါ

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const BRAND_COLOR = "#FF3232";

const ALL_PRODUCTS = [
  "Pubg UC", "Mobile Legends Diamonds", "Free Fire Diamonds",
  "Netflix Subscription", "Spotify Premium", "Steam Wallet",
  "Valorant Points", "Honor of Kings", "Apple Gift Card"
];

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { t } = useTranslation(); // 🔥 Translation ခေါ်ယူထားပါသည်

  useEffect(() => {
    if (visible) {
      setTimeout(() => inputRef.current?.focus(), 100);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      setSearchText("");
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, visible]);

  const filteredProducts = !searchText
    ? []
    : ALL_PRODUCTS.filter(product =>
      product.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardWrapper}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  width: isTablet ? 500 : width * 0.9,
                  opacity: fadeAnim,
                  transform: [{ scale: fadeAnim }]
                }
              ]}
            >

              <View style={styles.headerRow}>
                <View style={styles.titleContainer}>
                  <View style={styles.decorativeBar} />
                  <DynamicText fontWeight="bold" style={{ fontSize: 18, color: '#1e293b' }}>
                    {t.fastSearch || "Fast"} <DynamicText style={{ color: BRAND_COLOR }}>{t.searchKeyword || "Search"}</DynamicText>
                  </DynamicText>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.searchIconBox}>
                  <Ionicons name="search" size={20} color="white" />
                </View>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder={t.searchPlaceholder || "Search games & cards..."}
                  placeholderTextColor="#94a3b8"
                  value={searchText}
                  onChangeText={setSearchText}
                  cursorColor={BRAND_COLOR}
                  selectionColor={BRAND_COLOR}
                />
              </View>

              <View style={styles.resultContainer}>
                {searchText.length === 0 ? (
                  <View style={styles.emptyState}>
                    <Ionicons name="flash-outline" size={30} color={BRAND_COLOR} style={{ opacity: 0.5 }} />
                    <DynamicText style={{ color: '#94a3b8', fontSize: 12, marginTop: 8 }}>
                      {t.typeToFind || "Type to find instant results"}
                    </DynamicText>
                  </View>
                ) : (
                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 10 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.resultItem}
                        activeOpacity={0.7}
                      >
                        <View style={styles.itemDot} />
                        <DynamicText style={styles.resultText}>{item}</DynamicText>
                        <Ionicons name="chevron-forward" size={16} color="#cbd5e1" style={{ marginLeft: 'auto' }} />
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <View style={styles.emptyState}>
                        <DynamicText style={{ color: '#ef4444' }}>
                          {t.noResultsFound || "No results found"}
                        </DynamicText>
                      </View>
                    }
                  />
                )}
              </View>

            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    shadowColor: BRAND_COLOR,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#fff1f2'
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  decorativeBar: {
    width: 4, height: 18, backgroundColor: BRAND_COLOR, borderRadius: 2, marginRight: 8
  },
  closeBtn: {
    backgroundColor: '#1e293b',
    borderRadius: 50,
    width: 28, height: 28,
    alignItems: 'center', justifyContent: 'center'
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 18,
    height: 56,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 6
  },
  searchIconBox: {
    width: 44, height: 44,
    borderRadius: 14,
    backgroundColor: BRAND_COLOR,
    alignItems: 'center', justifyContent: 'center'
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "600",
    marginRight: 10
  },

  resultContainer: {
    marginTop: 20,
    maxHeight: 280,
    minHeight: 100,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  itemDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: BRAND_COLOR, marginRight: 12
  },
  resultText: {
    fontSize: 15, color: '#334155', fontWeight: '500'
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  }
});

export default SearchModal;