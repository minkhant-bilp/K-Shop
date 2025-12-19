// import { MenuIcon, SearchHIcon } from "@/assets/svg";
// import React from "react";
// import { TouchableOpacity, View } from "react-native";
// import DynamicText from "../dynamic-text/dynamic-text";

// interface Props {
//   showMiddleIcon?: boolean;
// }

// const CommonHeader : React.FC<Props> = ({
//   showMiddleIcon = false
// }) => {
//   return (
//     <View className="flex-row items-center justify-between bg-white px-4 mx-4 my-10 pt-4 pb-2 ">
//      <View>
//          <MenuIcon />
//         <DynamicText fontColor="">
//           Gita Music
//         </DynamicText>
//      </View>
//       {
//         showMiddleIcon && (
//           <View className="flex-row items-center">
//             <TouchableOpacity className="mr-4 bg-[#D9D9D9] py-2 px-4 rounded-full">
//               <DynamicText fontSize="xs" fontWeight="bold">
//                 Discover
//               </DynamicText>
//             </TouchableOpacity>
//              <TouchableOpacity>
//               <DynamicText fontSize="xs" fontWeight="bold">
//                 Following
//               </DynamicText>
//             </TouchableOpacity>
//           </View>
//         )
//       }
//       <TouchableOpacity>
//         <SearchHIcon />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CommonHeader;
