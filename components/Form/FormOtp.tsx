// import React, { memo } from "react";
// import { View, StyleSheet } from "react-native";
// import { Controller, useFormContext } from "react-hook-form";
// import { OtpInput } from "react-native-otp-entry";
// import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
// import ErrorText from "@/components/ui/dynamic-text/error-text";
// import { bgBlack, goldenColorCode } from "@/styles/colors";

// interface FormInputProps {
//   name: string;
//   label?: string;
//   rules?: object;
// }

// const FormOtp: React.FC<FormInputProps> = ({ name, label, rules }) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const error = errors[name];

//   return (
//     <View style={styles.container}>
//       {label && <DynamicText>{label}</DynamicText>}

//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field: { onChange, onBlur } }) => (
//           <OtpInput
//             type="numeric"
//             numberOfDigits={6}
//             onTextChange={onChange}
//             onBlur={onBlur}
//             focusColor={goldenColorCode}
//             theme={{
//               pinCodeContainerStyle: styles.underlineContainer,
//               pinCodeTextStyle: styles.otpText,
//             }}
//           />
//         )}
//       />

//       {error && <ErrorText text={error.message as string} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   underlineContainer: {
//     borderWidth: 0,
//     borderBottomColor:"#A2A2A2",
//     borderBottomWidth: 1,
//     width: 50,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 6,
//   },
//   otpText: {
//     fontSize: 20,
//     color: bgBlack,
//     fontWeight: "bold",
//   },
// });

// export default memo(FormOtp);


// // import React, { memo } from "react";
// // import { View, StyleSheet } from "react-native";
// // import { Controller, useFormContext } from "react-hook-form";
// // import { CodeField, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
// // import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
// // import ErrorText from "@/components/ui/dynamic-text/error-text";

// // interface FormInputProps {
// //   name: string;
// //   label?: string;
// //   rules?: object;
// // }

// // const CELL_COUNT = 6;

// // const FormOtp: React.FC<FormInputProps> = ({ name, label, rules }) => {
// //   const {
// //     control,
// //     formState: { errors },
// //   } = useFormContext();

// //   const error = errors[name];

// //   return (
// //     <View style={styles.container}>
// //       {label && <DynamicText>{label}</DynamicText>}

// //       <Controller
// //         control={control}
// //         name={name}
// //         rules={rules}
// //         render={({ field: { onChange, value } }) => {
// //           const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
// //           const [props, getCellOnLayoutHandler] = useClearByFocusCell({
// //             value,
// //             setValue: onChange,
// //           });

// //           return (
// //             <CodeField
// //               ref={ref}
// //               {...props}
// //               value={value}
// //               onChangeText={onChange}
// //               cellCount={CELL_COUNT}
// //               rootStyle={styles.codeFieldRoot}
// //               keyboardType="number-pad"
// //               textContentType="oneTimeCode"
// //               renderCell={({ index, symbol, isFocused }) => (
// //                 <View
// //                   key={index}
// //                   style={[
// //                     styles.cell,
// //                     {
// //                       borderBottomColor: error
// //                         ? "#FF0000" // Red if error
// //                         : symbol
// //                         ? "#FAA91E" // Yellow when a digit is entered
// //                         : isFocused
// //                         ? "#FAA91E" // Also yellow when focused
// //                         : "#A2A2A2", // Default gray
// //                     },
// //                   ]}
// //                   onLayout={getCellOnLayoutHandler(index)}
// //                 >
// //                   <DynamicText fontColor="#000" fontSize={"xl"} fontWeight="bold">{symbol || " "}</DynamicText>
// //                 </View>
// //               )}
// //             />
// //           );
// //         }}
// //       />

// //       {error && <ErrorText text={error.message as string} />}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     alignItems: "center",
// //     marginBottom: 10,
// //   },
// //   codeFieldRoot: {
// //     marginTop: 20,
// //     width: "100%",
   
// //   },
// //   cell: {
// //     marginHorizontal: 3,
// //     width: 50,
// //     height: 50,
// //     borderBottomWidth: 2,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   errorText: {
// //     color: "#FF0000",
// //     marginTop: 5,
// //   },
// // });

// // export default memo(FormOtp);
