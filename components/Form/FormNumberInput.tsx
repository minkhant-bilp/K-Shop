// import React from "react";
// import { View, TextInputProps, StyleSheet, ViewStyle } from "react-native";
// import { Controller, useFormContext } from "react-hook-form";
// import { Input,  Button } from "@ui-kitten/components";
// import ErrorText from "@/components/ui/dynamic-text/error-text";
// import Entypo from '@expo/vector-icons/Entypo';
// import { formatPhoneNumber } from "@/utils";

// interface FormInputProps {
//   name: string;
//   label?: string;
//   rules?: object;
//   containerStyle?: ViewStyle;
// }


// const FormNumberInput: React.FC<FormInputProps & TextInputProps> = ({
//   name,
//   rules,
//   containerStyle,
//   ...rest
// }) => {
//   const { control, formState, setValue } = useFormContext();
//   const error = formState.errors[name];

//   return (
//     <View style={[styles.container, containerStyle]}>
//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field: { onChange, onBlur, value } }) => {
//           const isFilled = !!value;
//           return (
//             <Input
//               maxLength={13}
//               size="large"
//               style={[
//                 styles.input,
//                 {
//                   borderColor: error
//                     ? "#FF0000" 
//                     : isFilled
//                     ? "#FAA91E" 
//                     : "#A2A2A2", 
//                   backgroundColor: error
//                     ? "#FF000010" 
//                     : isFilled
//                     ? "#FAA91E0D"
//                     : "#F5F5F5",
//                 },
//               ]}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value ? formatPhoneNumber(value) : ""}
//               accessoryRight={() => (
//                 <>
//                   {value ? (
//                     <Entypo
//                       name="circle-with-cross"
//                       size={20}
//                       color="grey"
//                       onPress={() => setValue(name, "")}
//                     />
//                   ) : null}
//                 </>
//               )}
//               {...rest}
//             />
//           );
//         }}
//       />
//       {error && <ErrorText text={error.message as string} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   input: {
//     borderRadius: 8,
//     marginTop: 8,
//     height: 50,
//   },
// });


// export default FormNumberInput;
