import { musicList } from "@/data/musicData";
import usePlayerStore from "@/stores/playerStore";
import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DynamicText from "../dynamic-text/dynamic-text";

interface Item {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  streams: string;
  cover: ImageSourcePropType | undefined;
}

interface FollowScreenProps {
  data: Item[];
  song: Song[];
}

const renderItem = ({ item }: { item: Item }) => {
  return (
    <TouchableOpacity className="flex-1 items-center justify-center mr-4">
      <Image
        source={item.image}
        className="w-[120px] h-[88px] rounded-lg"
        resizeMode="cover"
      />
      <Text className="mt-2 text-center text-white">{item.title}</Text>
    </TouchableOpacity>
  );
};

const renderSongItem = ({ item, onPress }: { item: Song; onPress: () => void }) => {
  return (
    <TouchableOpacity 
      className="flex-row items-center mb-4"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={item.cover}
        className="w-24 h-24 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <DynamicText fontSize="lg" fontWeight="medium" classname="text-white">
          {item.title}
        </DynamicText>
        <DynamicText fontSize="sm" classname="text-gray-400">
          {item.artist}
        </DynamicText>
        <DynamicText fontSize="sm" classname="text-gray-400">
          {item.streams}
        </DynamicText>
      </View>
      <TouchableOpacity className="p-2">
        <Text className="text-gray-400 text-xl">⋯</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const FollowScreen: React.FC<FollowScreenProps> = ({ data, song }) => {
  // Grab functions from store
  const playTrack = usePlayerStore((state) => state.playTrack);
  const setQueue = usePlayerStore((state) => state.setQueue);

  const handleSongPress = (songId: string) => {
    // Find the track from musicList
    const track = musicList.find(t => t.id === songId);
    
    if (track) {
      // 1. Set the queue
      setQueue(musicList);
      // 2. Play the track (This will internally set playerBarVisible: true)
      playTrack(track);
    }
  };

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      />
      
      <DynamicText fontSize="lg" fontWeight="bold" classname="my-6 text-white">
        Recommend for you
      </DynamicText>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        data={song}
        renderItem={({ item }) => 
          renderSongItem({ 
            item, 
            onPress: () => handleSongPress(item.id) 
          })
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FollowScreen;