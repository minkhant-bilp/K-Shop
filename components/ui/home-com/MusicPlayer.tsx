// components/music/FullMusicPlayer.tsx
import usePlayerStore from '@/stores/playerStore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const FullMusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    position,
    duration,
    isShuffled,
    isRepeating,
    playbackRate,
    fullPlayerVisible,
    hideFullPlayer,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    setPlaybackRate,
  } = usePlayerStore();

  const [slideAnim] = useState(new Animated.Value(height));
  const [rotationAnim] = useState(new Animated.Value(0));
  const rotationAnimationRef = useRef<any>(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (rotationAnimationRef.current) {
        rotationAnimationRef.current.stop();
      }
    };
  }, []);

  // Slide animation
  useEffect(() => {
    if (fullPlayerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [fullPlayerVisible]);

  // Album rotation animation
  useEffect(() => {
    if (rotationAnimationRef.current) {
      rotationAnimationRef.current.stop();
    }

    if (isPlaying && currentTrack) {
      rotationAnim.setValue(0);
      rotationAnimationRef.current = Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 20000,
          // easing: Animated.,
          useNativeDriver: true,
        })
      );
      rotationAnimationRef.current.start();
    } else {
      rotationAnim.stopAnimation();
    }

    return () => {
      if (rotationAnimationRef.current) {
        rotationAnimationRef.current.stop();
      }
    };
  }, [isPlaying, currentTrack]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (milliseconds: number) => {
    if (!milliseconds || milliseconds < 0) return '0:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlaybackRate = () => {
    const rates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const handleSeekComplete = (value: number) => {
    if (!isNaN(value) && value >= 0) {
      seekTo(value);
    }
  };

  // Handle modal backdrop press
  const handleBackdropPress = () => {
    hideFullPlayer();
  };

  if (!currentTrack) return null;

  return (
    <Modal
      visible={fullPlayerVisible}
      transparent={true}
      animationType="none"
      onRequestClose={hideFullPlayer}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <TouchableOpacity 
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleBackdropPress}
      />
      
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={styles.gradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={hideFullPlayer} 
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-down" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Now Playing</Text>
            <TouchableOpacity 
              style={styles.menuButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Album Art */}
            <View style={styles.albumContainer}>
              <Animated.Image
                source={currentTrack.artwork}
                style={[
                  styles.albumArt,
                  { transform: [{ rotate: rotation }] }
                ]}
                resizeMode="cover"
              />
            </View>

            {/* Track Info */}
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={styles.trackArtist} numberOfLines={1}>
                {currentTrack.artist}
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              {/* <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration > 0 ? duration : 1}
                value={position}
                onSlidingComplete={handleSeekComplete}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#4a4a6a"
                thumbTintColor="#FF6B6B"
                tapToSeek={true}
              /> */}
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
              <TouchableOpacity 
                onPress={toggleShuffle} 
                style={styles.controlButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name="shuffle" 
                  size={24} 
                  color={isShuffled ? "#FF6B6B" : "#fff"} 
                />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={previousTrack} 
                style={styles.controlButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="play-skip-back" size={32} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={togglePlayPause} 
                style={styles.playButton}
                activeOpacity={0.8}
              >
                {isPlaying ? (
                  <Ionicons name="pause" size={32} color="#fff" />
                ) : (
                  <Ionicons name="play" size={32} color="#fff" />
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={nextTrack} 
                style={styles.controlButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="play-skip-forward" size={32} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={toggleRepeat} 
                style={styles.controlButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons 
                  name={isRepeating === 'one' ? "repeat-once" : "repeat"} 
                  size={24} 
                  color={isRepeating ? "#FF6B6B" : "#fff"} 
                />
              </TouchableOpacity>
            </View>

            {/* Extra Controls */}
            <View style={styles.extraControls}>
              <TouchableOpacity 
                onPress={handlePlaybackRate} 
                style={styles.extraButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.extraButtonText}>{playbackRate.toFixed(1)}x</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.extraButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="heart-outline" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.extraButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="share-outline" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.extraButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  albumContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  albumArt: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    maxWidth: '100%',
  },
  trackArtist: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '100%',
  },
  progressContainer: {
    marginBottom: 30,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
    paddingHorizontal: 5,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    backgroundColor: '#FF6B6B',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  extraButton: {
    padding: 10,
    alignItems: 'center',
  },
  extraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FullMusicPlayer;