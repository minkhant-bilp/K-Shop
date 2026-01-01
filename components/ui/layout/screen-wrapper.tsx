import Loading from "@/components/common/Loading/Loading";
import { bgWhiteCode } from "@/structure/styles/colors";
import { StatusBar } from "expo-status-bar";
import React, { PropsWithChildren, ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../header/header";

type ScreenWrapperProps = PropsWithChildren<{}> &
  ViewProps & {
    statusBarStyle?: "default" | "light-content" | "dark-content";
    backgroundColor?: string;
    isSafeArea?: boolean;
    headerShown?: boolean;
    headerName?: string;
    showBackButton?: boolean;
    leftIcon?: ReactNode;
    isScrollable?: boolean;
    showImage?: boolean;
    image?: string;
    isFlex?: boolean;
    isLoading?: boolean;
    rightIcon?: React.ReactNode;
    press?: () => void;
    style?: StyleProp<ViewStyle>;
    headerRightComponent?: ReactNode;
  };

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  style: propStyle,
  children,
  backgroundColor = bgWhiteCode,
  isSafeArea = false,
  headerShown = true,
  showBackButton = true,
  isScrollable = false,
  isFlex = true,
  headerName,
  leftIcon,
  isLoading,
  headerRightComponent,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        isFlex && styles.flex,
        { backgroundColor },
        isSafeArea && { paddingTop: top, paddingBottom: bottom },
        propStyle,
      ]}
      {...props}
    >
      <StatusBar />

      {headerShown && (
        <Header
          showBackButton={showBackButton}
          title={headerName}
          leftIcon={leftIcon}
          headerRightComponent={headerRightComponent}
        />
      )}

      {isScrollable ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}

      {isLoading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});

export default ScreenWrapper;
