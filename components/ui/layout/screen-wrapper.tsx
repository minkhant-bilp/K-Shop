import Loading from '@/components/common/Loading/Loading';
import { bgWhiteCode } from '@/styles/colors';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../header/header';

type ScreenWrapperProps = PropsWithChildren<{}> &
  ViewProps & {
    statusBarStyle?: 'default' | 'light-content' | 'dark-content';
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
    // Updated type definition for style to be more standard
    style?: StyleProp<ViewStyle>;
    headerRightComponent?: ReactNode;
  };

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  style: propStyle,
  children,
  statusBarStyle = 'dark-content',
  backgroundColor = bgWhiteCode,
  isSafeArea = false, // Default is false per your code
  headerShown = true,
  showBackButton = true,
  isScrollable = false,
  isFlex = true,
  headerName,
  image,
  showImage = false,
  leftIcon,
  isLoading,
  headerRightComponent,
  press,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    isFlex && styles.flex,
    { backgroundColor }, // Move background color here
    propStyle,
  ];

  const safeAreaPadding = isSafeArea ? { paddingTop: top, paddingBottom: bottom } : {};


  const ContainerComponent = View; 

  const contentWrapperStyle = [styles.content];

  return (
    <ContainerComponent style={[containerStyle, safeAreaPadding]} {...props}>
      <StatusBar  />
      
      {headerShown && (
        <Header
          showBackButton={showBackButton}
          title={headerName}
          leftIcon={leftIcon}
          headerRightComponent={headerRightComponent}
        />
      )}

      {isScrollable ? (
        <ScrollView contentContainerStyle={[contentWrapperStyle, styles.scrollable]}>
          {children}
        </ScrollView>
      ) : (
        <View style={contentWrapperStyle}>{children}</View>
      )}

      {isLoading && <Loading />}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollable: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;