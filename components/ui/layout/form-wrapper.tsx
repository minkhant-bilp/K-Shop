import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle } from 'react-native';

interface FormWrapperProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  contentContainerStyle,
  wrapperStyle,
}) => {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, wrapperStyle]} // Allow additional styling for the wrapper
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ flexGrow: 1, padding: 10 }, contentContainerStyle]} // Merge additional styles
        keyboardShouldPersistTaps='handled' // Ensure taps are passed through
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormWrapper;
