// import { cn } from '@/lib/utils';
// import React, { PropsWithChildren } from 'react';
// import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import DynamicText from '../dynamic-text/dynamic-text';

// type LinerButtonVariant = 'normal' | 'large';

// type LinerButtonProps = PropsWithChildren<{
//   className?: string;
//   variant?: LinerButtonVariant;
//   isDisabled?: boolean;
// }> &
//   TouchableOpacityProps;

// const LinerButton: React.FC<LinerButtonProps> = ({
//   className,
//   onPress = () => {},
//   children,
//   variant,
//   isDisabled,
//   ...props
// }) => {
//   const isLarge = variant === 'large';

//   return (
//     <TouchableOpacity activeOpacity={0.5} disabled={isDisabled} onPress={onPress} {...props}>
//       <LinearGradient
//         className={cn(
//           'px-[16] min-h-[40] my-1 justify-center items-center',
//           !isLarge ? 'rounded-[8px]' : 'rounded-full',
//           className,
//         )}
//         colors={isDisabled ? ['#D3C4E1', '#B18DC0'] : ['#8730F5', '#5908C0']}
//       >
//         {typeof children === 'string' ? (
//           <DynamicText fontColor={'#ffffff'} lineHeightHelper align='center' fontSize='sm'>
//             {children}
//           </DynamicText>
//         ) : (
//           children
//         )}
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// };

// export default LinerButton;
