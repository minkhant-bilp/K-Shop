// import ErrorText from "@/components/ui/dynamic-text/error-text";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { StyleSheet, TextInput, View } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import DynamicText from "../ui/dynamic-text/dynamic-text";


// interface FormDropdownProps {
//   name: string;
//   label?: string;
//   rules?: object;
//   data: { label: string; value: string }[];
//   placeholder?: string;
//   search?: boolean;
//   disabled?: boolean;
// }

// const FormDropdown: React.FC<FormDropdownProps> = ({
//   name,
//   label,
//   rules,
//   data,
//   placeholder = "Select an option",
//   search = false,
//   disabled = false,
// }) => {
//   const { control, formState } = useFormContext();
//   const error = formState.errors[name];
//   const [searchText, setSearchText] = useState("");

//   // Memoized filtered data
//   const filteredData = useMemo(() => {
//     if (!search || !searchText) return data;
//     return data.filter((item) =>
//       item.label.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [searchText, data, search]);

//   return (
//     <View style={styles.container}>
//       {label && (
//         <View style={{ marginBottom: 5 }}>
//           <DynamicText fontSize="sm" fontWeight="bold" lineHeightHelper>
//             {label}
//           </DynamicText>
//         </View>
//       )}

//       <Controller
//         control={control}
//         name={name}
//         rules={rules}
//         render={({ field: { onChange, value } }) => (
//           <Dropdown
//             style={[styles.dropdown, error && styles.errorBorder]}
//             itemTextStyle={styles.itemText}
//             selectedTextStyle={styles.itemText}
//             itemContainerStyle={styles.itemContainer}
//             data={filteredData}
//             labelField="label"
//             valueField="value"
//             search={search}
//             disable={disabled}
//             placeholderStyle={styles.placeholderStyle}
//             placeholder={placeholder}
//             value={value}
//             onChange={(item) => onChange(item.value)}
//             renderInputSearch={() =>
//               search ? (
//                 <View style={styles.searchContainer}>
//                   <Ionicons
//                     name="search"
//                     size={18}
//                     color="#888"
//                     style={{ marginRight: 6 }}
//                   />
//                   {/* <TextInput
//                     placeholder="Search"
//                     value={searchText}
//                     onChangeText={setSearchText}
//                     style={styles.searchInput}
//                     placeholderTextColor="#aaa"
//                   /> */}
//                   <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search"
//                     value={searchText}
//                     onChangeText={setSearchText}
//                   />
//                 </View>
//               ) : null
//             }
//           />
//         )}
//       />

//       {error && <ErrorText text={error.message as string} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { marginBottom: 16 },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: "#A2A2A2",
//     borderRadius: 14,
//     marginTop: 4,
//     paddingHorizontal: 16,
//     backgroundColor: "transparent",
//     height: 48,
//   },
//   placeholderStyle: { color: "#aaa" },
//   itemText: { fontSize: 14 },
//   itemContainer: {},
//   errorBorder: { borderColor: "red", borderWidth: 1 },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#A2A2A2",
//     borderRadius: 16,
//     paddingHorizontal: 10,
//     margin: 10,
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 0,
//     fontSize: 14,
//     backgroundColor: "transparent",
//     paddingVertical:10,
//   },
// });

// export default FormDropdown;
