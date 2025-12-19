import { primaryColorCode } from '@/styles/colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute', // Absolute positioning
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 1000, // High z-index to ensure it's above other content
      }}
    >
      <View
        style={{
          backgroundColor: '#F1F5F9',
          width: 80,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
      >
        <ActivityIndicator size='large' color={primaryColorCode} />
      </View>
    </View>
  );
};

export default Loading;
