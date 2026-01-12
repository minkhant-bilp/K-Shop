import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";

const SettingItem = ({ icon, title, subtitle, right, arrow, press }: any) => {
  return (
    <Pressable
      className="flex-row items-center rounded-2xl px-4 py-4 border-collapse border border-gray-200 m-2"
      onPress={press}
    >
      <View className="w-10 h-10 bg-[#F3F4F6] rounded-full items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#FF3232" />
      </View>

      <View className="flex-1">
        <DynamicText fontWeight="bold">{title}</DynamicText>

        <DynamicText fontSize="xs">{subtitle}</DynamicText>
      </View>

      {right && (
        <DynamicText fontSize={"sm"} className="mr-2">
          {right}
        </DynamicText>
      )}

      {arrow && <Ionicons name="chevron-forward" size={18} color="#6b7280" />}
    </Pressable>
  );
};

export default SettingItem;
