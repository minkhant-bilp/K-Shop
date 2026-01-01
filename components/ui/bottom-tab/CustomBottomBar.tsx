import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#FFF";
const SECONDARY_COLOR = ["#FF3232", "#000000"];

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  function capitalizeFirstWord(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: Platform.OS === "ios" ? 70 + insets.bottom : 100,
        paddingBottom: Platform.OS === "ios" ? insets.bottom : 10,
        backgroundColor: PRIMARY_COLOR,
        alignSelf: "center",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        paddingHorizontal: 20,
        shadowRadius: 5,
        elevation: 20,
      }}
    >
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? capitalizeFirstWord(String(options.tabBarLabel))
            : options.title !== undefined
            ? capitalizeFirstWord(String(options.title))
            : capitalizeFirstWord(route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5).stiffness(100)}
            key={route.key}
            onPress={onPress}
            style={styles.tabItemWrapper}
          >
            {isFocused ? (
              <LinearGradient
                colors={SECONDARY_COLOR as any}
                start={{ x: 1, y: 0 }}
                end={{ x: -1, y: 0 }}
                style={styles.tabItem}
              >
                {getIconByRouteName(route.name, PRIMARY_COLOR)}
                <Animated.Text
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                  style={styles.text}
                >
                  {label}
                </Animated.Text>
              </LinearGradient>
            ) : (
              <View style={styles.tabItem}>
                {getIconByRouteName(route.name, "#000")}
              </View>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case "home":
        return <Feather name="home" size={18} color={color} />;
      case "feed":
        return (
          <FontAwesome5 name="facebook-messenger" size={18} color={color} />
        );
      case "search":
        return <FontAwesome5 name="microphone-alt" size={18} color={color} />;
      case "library":
        return <Ionicons name="wallet-outline" size={18} color={color} />;
      default:
        return <Ionicons name="person" size={18} color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  tabItemWrapper: {
    borderRadius: 30,
    overflow: "hidden",
  },

  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default CustomNavBar;
