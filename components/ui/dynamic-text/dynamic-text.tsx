import { fontColorCode } from "@/structure/styles/colors";
import { fontStyles } from "@/structure/styles/fonts";
import React, { PropsWithChildren, useMemo } from "react";
import { Text, TextProps, TextStyle } from "react-native";

type FontSizeType = number | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

type DynamicTypeProps = PropsWithChildren<
  TextProps & {
    className?: string;
    type?: "en" | "rk";
    fontColor?: string;
    autoLang?: boolean;
    align?: "center" | "left" | "right" | "justify";
    fontSize?: FontSizeType;
    fontWeight?: "medium" | "semibold" | "bold" | "light";
    underline?: boolean;
    opacity?: number;
    lineHeightHelper?: boolean;
    style?: TextStyle;
  }
>;

const DynamicText = ({
  className: classname,
  type = "en",
  lineHeightHelper,
  children,
  fontWeight,
  fontSize = 14,
  fontColor = fontColorCode,
  underline = false,
  align,
  onPress,
  opacity = 1,
  numberOfLines,
  style,
  ...rest
}: DynamicTypeProps) => {
  const textAlignment = useMemo(() => {
    if (align === "center") return fontStyles.center;
    if (align === "left") return fontStyles.left;
    if (align === "right") return fontStyles.right;
    if (align === "justify") return fontStyles.justify;
    return fontStyles.left;
  }, [align]);

  const fontFamily = useMemo(() => {
    if (fontWeight === "semibold") return fontStyles.semiBold;
    if (fontWeight === "medium") return fontStyles.medium;
    if (fontWeight === "light") return fontStyles.light;
    if (fontWeight === "bold") return fontStyles.bold;
    return fontStyles.Regular;
  }, [fontWeight, type]);

  const fontSizeStyle = useMemo(() => {
    if (typeof fontSize === "number") {
      return { fontSize };
    }
    return fontStyles[fontSize];
  }, [fontSize]);

  const fontDecoration = useMemo(() => {
    return underline ? fontStyles.underline : fontStyles.decoNone;
  }, [underline]);

  const resolvedFontSize =
    typeof fontSize === "number"
      ? fontSize
      : (fontStyles[fontSize]?.fontSize ?? 14);

  return (
    <Text
      {...rest}   // 🔥 allows adjustsFontSizeToFit, ellipsizeMode, etc
      className={classname}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        fontFamily,
        textAlignment,
        fontSizeStyle,
        fontDecoration,
        { color: fontColor },
        { opacity },

        // 🔥 Myanmar Android Fix
        {
          includeFontPadding: true,
          lineHeight: resolvedFontSize * 1.35,
          textAlignVertical: "center",
        },

        lineHeightHelper ? fontStyles.lineHeightHelper : {},
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default DynamicText;