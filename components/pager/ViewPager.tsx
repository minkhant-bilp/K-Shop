import { Image } from "expo-image";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import type { PagerViewOnPageScrollEventData } from "react-native-pager-view";
import PagerView from "react-native-pager-view";
import SearchBar from "./SearchBar";

const p1 = require("@/assets/game_image/viewPager1.png");
const p2 = require("@/assets/game_image/viewPager2.png");
const p3 = require("@/assets/game_image/viewPager3.png");


const sample = [
  { key: 1, image: p1 },
  { key: 2, image: p2 },
  { key: 3, image: p3 },

];

const { width, height } = Dimensions.get("window");
const DOT_SIZE = 20;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Pagination = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, sample.length];
  const translateX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, sample.length * DOT_SIZE],
  });

  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: "absolute",
            transform: [{ translateX: translateX }],
          },
        ]}
      />
      {sample.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View style={styles.paginationDot} />
          </View>
        );
      })}
    </View>
  );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ViewPager = () => {
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <AnimatedPagerView
        initialPage={0}
        style={styles.pagerView}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue,
              },
            },
          ],
          {

            useNativeDriver: true,
          },
        )}
      >
        {sample.map((item) => (
          <View collapsable={false} key={item.key}>
            <Image
              style={styles.image}
              source={item.image}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>
        ))}
      </AnimatedPagerView>
      <Pagination
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 3,
  },
  pagerView: { height: height / 2 },
  image: {
    width: "100%",
    aspectRatio: 16 / 14,
  },
  pagination: {
    position: "absolute",
    right: width / 6 - DOT_SIZE * 2,
    bottom: - 60,

    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.4,
    height: DOT_SIZE * 0.4,
    borderRadius: DOT_SIZE * 0.20,
    backgroundColor: "red",
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1,
    borderColor: "red",
  },
});

export default ViewPager;




