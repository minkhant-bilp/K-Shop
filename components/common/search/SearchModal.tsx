import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import useTranslation from "@/structure/hooks/useTranslation";
// 📍 သင်ရေးထားတဲ့ API Hook ကို Import လုပ်ပါမယ်
import { useGame } from "@/structure/hooks/useGame";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const BRAND_COLOR = "#FF3232";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // 📍 API ခေါ်မယ့် စာသား

  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 📍 1. Performance အတွက် Debounce လုပ်ခြင်း (စာရိုက်ရပ်ပြီး 500ms နေမှ API ကို ခေါ်ပါမယ်)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer); // နောက်တစ်လုံးထပ်ရိုက်ရင် အဟောင်းကိုဖျက်မယ်
  }, [searchText]);

  // 📍 2. API လှမ်းခေါ်ခြင်း (debouncedSearch ကို အသုံးပြု၍)
  const { games, gameListQuery } = useGame(
    debouncedSearch.trim() ? { gameName: debouncedSearch.trim() } : undefined
  );

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
      setDebouncedSearch("");
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, visible]);

  // ဂိမ်းတစ်ခုကို နှိပ်လိုက်တဲ့အခါ လုပ်မယ့် Action
  const handleGameSelect = (gameId: string | number) => {
    Keyboard.dismiss();
    onClose();
    // 📍 ဥပမာ - ရွေးလိုက်တဲ့ဂိမ်းရဲ့ Detail စာမျက်နှာကို သွားမယ်ဆိုရင်
    // router.push(`/(app)/home/game/${gameId}`);
  };

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
                  // စာဘာမှ မရိုက်ရသေးခင် အခြေအနေ
                  <View style={styles.emptyState}>
                    <Ionicons name="flash-outline" size={30} color={BRAND_COLOR} style={{ opacity: 0.5 }} />
                    <DynamicText style={{ color: '#94a3b8', fontSize: 12, marginTop: 8 }}>
                      {t.typeToFind || "Type to find instant results"}
                    </DynamicText>
                  </View>
                ) : gameListQuery.isFetching ? (
                  // 📍 3. API ကနေ ဒေတာရှာနေတုန်း Loading ပြပါမယ်
                  <View style={styles.emptyState}>
                    <ActivityIndicator size="large" color={BRAND_COLOR} />
                    <DynamicText style={{ color: '#94a3b8', fontSize: 13, marginTop: 12 }}>
                      {t.searching || "Searching..."}
                    </DynamicText>
                  </View>
                ) : (
                  // 📍 4. API ကနေ ပြန်ရလာတဲ့ ဒေတာတွေကို ပြသပါမယ်
                  <FlatList
                    data={games}
                    keyExtractor={(item: any, index: number) => item?.id?.toString() || index.toString()}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 10 }}
                    renderItem={({ item }: { item: any }) => (
                      <TouchableOpacity
                        style={styles.resultItem}
                        activeOpacity={0.7}
                        onPress={() => handleGameSelect(item.id)}
                      >
                        <View style={styles.itemDot} />
                        {/* Backend ကပြန်လာတဲ့ Game နာမည် (name သို့မဟုတ် title) ကို ယူသုံးပါမယ် */}
                        <DynamicText style={styles.resultText}>
                          {item?.name || item?.title || item?.gameName || "Game Title"}
                        </DynamicText>
                        <Ionicons name="chevron-forward" size={16} color="#cbd5e1" style={{ marginLeft: 'auto' }} />
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={30} color="#cbd5e1" />
                        <DynamicText style={{ color: '#ef4444', marginTop: 8 }}>
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

// Styles များကို အရင်အတိုင်းထားရှိပါသည်
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "center", alignItems: "center" },
  keyboardWrapper: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: "white", borderRadius: 24, padding: 24, shadowColor: BRAND_COLOR, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 15, borderWidth: 1, borderColor: '#fff1f2' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  decorativeBar: { width: 4, height: 18, backgroundColor: BRAND_COLOR, borderRadius: 2, marginRight: 8 },
  closeBtn: { backgroundColor: '#1e293b', borderRadius: 50, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff", borderRadius: 18, height: 56, borderWidth: 1, borderColor: "#e2e8f0", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 2, paddingHorizontal: 6 },
  searchIconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: BRAND_COLOR, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, height: '100%', marginLeft: 10, fontSize: 16, color: "#1e293b", fontWeight: "600", marginRight: 10 },
  resultContainer: { marginTop: 20, maxHeight: 280, minHeight: 100 },
  resultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  itemDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: BRAND_COLOR, marginRight: 12 },
  resultText: { fontSize: 15, color: '#334155', fontWeight: '500' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 30 }
});

export default SearchModal;