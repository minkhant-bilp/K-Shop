import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Screen အကျယ်
const { width } = Dimensions.get("window");

// Video Link (ကြိုက်တာပြောင်းလို့ရ)
const VIDEO_SOURCE = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

const PagerView = () => {

    const player = useVideoPlayer(VIDEO_SOURCE, player => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    return (
        <View className="py-4">


            <Animated.View
                entering={FadeInDown.delay(200).springify()}
                style={styles.container}
            >
                <View style={styles.card}>
                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                        contentFit="cover"
                        nativeControls={false}
                    />

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
                        style={StyleSheet.absoluteFillObject}
                        pointerEvents="none"
                    />

                    <View style={styles.contentOverlay} pointerEvents="none">
                        <View style={styles.tag}>
                            <DynamicText style={styles.tagText}>Tournament Final</DynamicText>
                        </View>

                        <DynamicText fontWeight="bold" fontSize="xl" style={{ color: "white", marginBottom: 4 }}>
                            Grand Final 2026
                        </DynamicText>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="eye" size={14} color="#cbd5e1" style={{ marginRight: 4 }} />
                            <DynamicText style={{ color: "#cbd5e1", fontSize: 12 }}>
                                1.2M Watching
                            </DynamicText>
                        </View>
                    </View>

                    <View style={styles.centerIcon} pointerEvents="none">
                        <View style={styles.glassCircle}>
                            <Ionicons name="play" size={24} color="white" style={{ marginLeft: 2 }} />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

export default PagerView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: width,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        position: 'relative',
        shadowColor: "#E11D48",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    contentOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        zIndex: 10
    },
    tag: {
        backgroundColor: "#E11D48",
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 8
    },
    tagText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold"
    },
    centerIcon: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    },
    glassCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    }
});