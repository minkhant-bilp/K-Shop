import { redColorCode } from '@/styles/colors';
import React from 'react';
import { View } from 'react-native';
import DynamicText from './dynamic-text';


const ErrorText = ({ text }: { text: string }) => {
  return (
    <View>
      <DynamicText fontColor={redColorCode} fontSize='xs' lineHeightHelper>
        {text}
      </DynamicText>
    </View>
  );
};

export default ErrorText;
