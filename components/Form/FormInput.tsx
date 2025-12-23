// import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
// import ErrorText from "@/components/ui/dynamic-text/error-text";
// import { MaterialIcons } from "@expo/vector-icons";
// import React from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import {
//     Pressable,
//     StyleSheet,
//     TextInput,
//     TextInputProps,
//     TextStyle,
//     View,
//     ViewStyle,
// } from "react-native";
// // import CountryPicker, {
// //   Country,
// //   CountryCode,
// // } from "react-native-country-picker-modal";

// interface FormInputProps {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   rules?: object;
//   multiline?: boolean;
//   containerStyle?: ViewStyle;
//   disabled?: boolean;
//   minHeight?: TextStyle;
//   iconName?: () => React.ReactElement;
//   addMore?: boolean;
//   addMorePress?: () => void;
//   showRemove?: boolean;
//   onRemovePress?: () => void;
//   showCountryPicker?: boolean;
// }

// const FormInput: React.FC<FormInputProps & TextInputProps> = ({
//   name,
//   label,
//   placeholder,
//   rules,
//   multiline,
//   containerStyle,
//   minHeight,
//   iconName,
//   addMore,
//   addMorePress,
//   showRemove,
//   onRemovePress,
//   disabled = false,
//   showCountryPicker = false,
//   ...rest
// }) => {
//   const { control, formState } = useFormContext();
//   const error = formState.errors[name];

// //   const [countryCode, setCountryCode] = useState<CountryCode>("US");
// //   const [country, setCountry] = useState<Country | null>(null);
// //   const [pickerVisible, setPickerVisible] = useState(false);

// //   const onSelect = (country: Country) => {
// //     setCountryCode(country.cca2);
// //     setCountry(country);
// //   };

//   return (
//     <View style={[styles.container, containerStyle]}>
//       {label && (
//         <View style={styles.labelRow}>
//           <DynamicText fontSize={"sm"} fontWeight="bold" lineHeightHelper>
//             {label}
//           </DynamicText>
//           {addMore && (
//             <Pressable onPress={addMorePress}>
//               <DynamicText fontSize={"xs"} underline>
//                 Add More
//               </DynamicText>
//             </Pressable>
//           )}
//         </View>
//       )}
//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field: { onChange, onBlur, value } }) => {
     
//           return (
//             <View style={styles.inputWrapper}>
//               {/* {showCountryPicker && (
//                 <Pressable
//                   style={styles.iconLeft}
//                   onPress={() => setPickerVisible(true)}
//                 >
//                   <CountryPicker
//                     visible={pickerVisible}
//                     withFilter
                    
//                     withFlag
//                     withCallingCode
//                     countryCode={countryCode}
//                     onSelect={onSelect}
//                     onClose={() => setPickerVisible(false)}
//                   />
//                 </Pressable>
//               )} */}
//               <TextInput
//                 editable={!disabled}
//                 style={[
//                   styles.input,
//                   minHeight,
//                   error && styles.errorInput,
//                   disabled && styles.disabledInput,
//                   showCountryPicker && { paddingLeft: 50 },
//                 ]}
//                 placeholder={placeholder}
//                 placeholderTextColor="#999"
//                 multiline={multiline}
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value ?? ""}
//                 textAlignVertical={multiline ? "top" : "center"}
//                 {...rest}
//               />
//               {showRemove && (
//                 <Pressable
//                   style={styles.iconRight}
//                   onPress={onRemovePress}
//                   hitSlop={10}
//                 >
//                   <MaterialIcons
//                     name="highlight-remove"
//                     size={22}
//                     color="#000"
//                   />
//                 </Pressable>
//               )}
//               {!showRemove && iconName && (
//                 <View style={styles.iconRight}>{iconName()}</View>
//               )}
//             </View>
//           );
//         }}
//       />
//       {error?.message && <ErrorText text={error.message as string} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   labelRow: {
//     marginBottom: 5,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   inputWrapper: {
//     position: "relative",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#A2A2A2",
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     paddingRight: 40,
//     height: 55,
//     backgroundColor: "white",
//     fontSize: 16,
//   },
//   errorInput: {
//     borderColor: "red",
//   },
//   disabledInput: {
//     backgroundColor: "#f2f2f2",
//     color: "#999",
//   },
//   iconLeft: {
//     position: "absolute",
//     left: 10,
//     top: "40%",
//     transform: [{ translateY: -12 }],
//     zIndex: 2,
//   },
//   iconRight: {
//     position: "absolute",
//     right: 10,
//     top: "50%",
//     transform: [{ translateY: -11 }],
//   },
// });

// export default FormInput;
