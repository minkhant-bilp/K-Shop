import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { primaryColor } from "@/styles/colors";
import React, { useCallback } from "react";
import { Pressable, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type Props = {
  currentLang: "en" | "kr";
  onChangeLang: (lang: "en" | "kr") => void;
};

const LanguageSwitchButton: React.FC<Props> = ({
  currentLang,
  onChangeLang,
}) => {
  const sliderPosition = useSharedValue(currentLang === "en" ? 0 : 1);

  const handleToggle = useCallback(
    (lang: "en" | "kr") => {
      sliderPosition.value = withTiming(lang === "en" ? 0 : 1, {
        duration: 300,
      });
      onChangeLang(lang);
    },
    [onChangeLang]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(sliderPosition.value === 0 ? 0 : 50),
        },
      ],
    };
  });

  return (
    <View
      style={{
        width: 100,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#DBE2E9",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            width: "50%",
            height: "100%",
            backgroundColor: primaryColor,
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 20,
            zIndex: 0,
          },
          animatedStyle,
        ]}
      />
      <Pressable
        onPress={() => handleToggle("en")}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <DynamicText fontColor={"black"}>EN</DynamicText>
      </Pressable>
      <Pressable
        onPress={() => handleToggle("kr")}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <DynamicText fontColor={"black"}>Koera</DynamicText>
      </Pressable>
    </View>
  );
};

export default LanguageSwitchButton;
