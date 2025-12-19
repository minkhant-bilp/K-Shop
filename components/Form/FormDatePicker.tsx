// import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
// import ErrorText from "@/components/ui/dynamic-text/error-text";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import React, { useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import DatePicker from "react-native-neat-date-picker";

// interface FormDatePickerProps {
//   name: string;
//   label?: string;
//   className?: string;
//   placeholder?: string;
//   rules?: object;
// }

// const FormDatePicker: React.FC<FormDatePickerProps> = ({
//   name,
//   label,
//   placeholder = "Select a date",
//   rules,
//   className,
//   ...rest
// }) => {
//   const { control, formState } = useFormContext();
//   const error = formState.errors[name];

//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const onShowDatePicker = () => setShowDatePicker(true);
//   const onHideDatePicker = () => setShowDatePicker(false);

//   return (
//     <View style={styles.container}>
//       {label && <DynamicText>{label}</DynamicText>}

//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field: { onChange, value } }) => (
//           <>
//             <View style={styles.inputWrapper}>
//               <TouchableOpacity
//                 className={className}
//                 style={[
//                   styles.input,
//                   error && styles.errorInput,
//                 ]}
//                 onPress={onShowDatePicker}
//               >
//                 <DynamicText fontColor={value ? "#000" : "#aaa"}>
//                   {value ? new Date(value).toLocaleDateString() : placeholder}
//                 </DynamicText>
//               </TouchableOpacity>

//               {/* Right-side icon */}
//               <AntDesign
//                 name="calendar"
//                 size={20}
//                 color="#666"
//                 style={styles.iconRight}
//               />
//             </View>

//             {showDatePicker && (
//               <DatePicker
//                 withoutModal={true}
//                 isVisible={showDatePicker}
//                 mode="single"
//                 onConfirm={(output) => {
//                   onHideDatePicker();
//                   if (output.date) {
//                     onChange(output.date);
//                   }
//                 }}
//                 onCancel={onHideDatePicker}
//                 {...rest}
//               />
//             )}
//           </>
//         )}
//       />

//       {error && <ErrorText text={error.message as string} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   inputWrapper: {
//     position: "relative",
//     justifyContent: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#A2A2A2",
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     paddingRight: 40, // space for icon
//     height: 55,
//     backgroundColor: "white",
//     fontSize: 16,
//     justifyContent: "center",
//   },
//   errorInput: {
//     borderColor: "red",
//   },
//   iconRight: {
//     position: "absolute",
//     right: 12,
//     top: "50%",
//     transform: [{ translateY: -10 }],
//   },
// });

// export default FormDatePicker;
