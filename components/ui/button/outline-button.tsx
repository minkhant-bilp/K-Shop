import { cn } from '@/lib/utils/utils';
import { primaryColorCode } from '@/styles/colors';
import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import DynamicText from '../dynamic-text/dynamic-text';

type OutlineButtonVariant = 'normal' | 'large';

type OutlineButtonProps = PropsWithChildren<{
  className?: string;
  variant?: OutlineButtonVariant;
  isDisabled?: boolean;
  showOutline?: boolean;
}> &
  TouchableOpacityProps;

const OutlineButton: React.FC<OutlineButtonProps> = ({
  className,
  onPress = () => {},
  children,
  variant,
  isDisabled,
  showOutline = true,
  ...props
}) => {
  const isLarge = variant === 'large';

  return (
    <TouchableOpacity activeOpacity={0.5} disabled={isDisabled} onPress={onPress} {...props}>
      <View
        className={cn(
          `px-[16] min-h-[40] justify-center my-1 items-center border-[#CCB5E9]`,
          !isLarge ? 'rounded-[8px]' : 'rounded-full',
          showOutline ? 'border-2' : 'border-0',
          className,
        )}
      >
        {typeof children === 'string' ? (
          <DynamicText fontColor={primaryColorCode} lineHeightHelper align='center' fontSize='sm'>
            {children}
          </DynamicText>
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OutlineButton;
