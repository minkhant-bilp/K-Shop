import { Platform, StyleSheet } from "react-native";

const isIos = Platform.OS === "ios";

const fontName = (weight: string) =>
  isIos ? `Nunito-${weight}` : `Nunito-${weight}`;
export const fontStyles = StyleSheet.create({
  Regular: { fontFamily: fontName("Regular") },
  bold: { fontFamily: fontName("Bold") },
  black: { fontFamily: fontName("Black") },
  extraBold: { fontFamily: fontName("ExtraBold") },
  semiBold: { fontFamily: fontName("SemiBold") },
  medium: { fontFamily: fontName("Medium") },
  light: { fontFamily: fontName("Light") },
  extraLight: { fontFamily: fontName("ExtraLight") },
  thin: { fontFamily: fontName("Thin") },

  underline: { textDecorationLine: "underline" },
  decoNone: { textDecorationLine: "none" },

  center: { textAlign: "center" },
  left: { textAlign: "left" },
  right: { textAlign: "right" },
  justify: { textAlign: "justify" },

  xs: { fontSize: 12, lineHeight: 18 },
  sm: { fontSize: 14, lineHeight: 20 },
  base: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  "2xl": { fontSize: 24, lineHeight: 32 },
  "3xl": { fontSize: 30, lineHeight: 36 },
  "4xl": { fontSize: 32, lineHeight: 36 },

  lineHeightHelper: { minHeight: 23, lineHeight: 30 },
});
