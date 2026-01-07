import { Image } from "expo-image";
import React, { useEffect, useRef } from "react"; // useEffect နဲ့ useRef ကို ထည့်ပါ
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import type { PagerViewOnPageScrollEventData } from "react-native-pager-view";
import PagerView from "react-native-pager-view";

const p1 = require("@/assets/game_image/t1.png");
const p2 = require("@/assets/game_image/t2.png");
const p3 = require("@/assets/game_image/t3.png");

const sample = [
    { key: 1, image: p1 },
    { key: 2, image: p2 },
    { key: 3, image: p3 },
];

const { width } = Dimensions.get("window");
const DOT_SIZE = 20;
const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Pagination = ({ scrollOffsetAnimatedValue, positionAnimatedValue }: any) => {
    const inputRange = [0, sample.length];
    const translateX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
        inputRange,
        outputRange: [0, sample.length * DOT_SIZE],
    });

    return (
        <View style={styles.pagination}>
            <Animated.View style={[styles.paginationIndicator, { transform: [{ translateX }] }]} />
            {sample.map((item) => (
                <View key={item.key} style={styles.paginationDotContainer}>
                    <View style={styles.paginationDot} />
                </View>
            ))}
        </View>
    );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const PagerViews = () => {
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

    const ref = useRef<PagerView>(null);

    const currentPage = useRef(0);

    useEffect(() => {
        const timer = setInterval(() => {

            let next = currentPage.current + 1;

            if (next >= sample.length) {
                next = 0;
            }

            ref.current?.setPage(next);
            currentPage.current = next;

        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <View style={styles.container} className="top-[-20px] ">
            <AnimatedPagerView
                ref={ref}
                initialPage={0}
                style={styles.pagerView}


                onPageSelected={(e) => {
                    currentPage.current = e.nativeEvent.position;
                }}

                onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
                    [{ nativeEvent: { offset: scrollOffsetAnimatedValue, position: positionAnimatedValue } }],
                    { useNativeDriver: true }
                )}
            >
                {sample.map((item) => (
                    <View key={item.key}>
                        <Image
                            style={styles.image}
                            source={item.image}
                            placeholder={{ blurhash }}
                            contentFit="cover"
                            transition={300}
                        />
                    </View>
                ))}
            </AnimatedPagerView>

            <Pagination
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                positionAnimatedValue={positionAnimatedValue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    pagerView: {
        height: 220,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 16,
    },
    pagination: {
        flexDirection: "row",
        alignSelf: "center",
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.4,
        height: DOT_SIZE * 0.4,
        borderRadius: DOT_SIZE * 0.2,
        backgroundColor: "red",
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: "center",
        justifyContent: "center",
    },
    paginationIndicator: {
        position: "absolute",
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 1,
        borderColor: "red",
    },
});

export default PagerViews;