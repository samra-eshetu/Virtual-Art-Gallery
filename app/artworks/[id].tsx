import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { useState, useEffect } from "react";

import {
  isFavorited,
  toggleFavorites,
  FavoriteItem,
} from "../utils/favorites";

type ArtworkParams = {
  id: string;
  title?: string;
};

export default function ArtworkDetail() {
  const { id, title } = useLocalSearchParams<ArtworkParams>();
  const router = useRouter();

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (id) {
        const favorited = await isFavorited(id);
        setIsFav(favorited);
      }
    };
    check();
  }, [id]);

  const artWork = {
    id,
    title: title ?? "Holy Trinity Icon",
    artist: "Unknown Master",
    date: "15th Century",
    image:
      "https://media.istockphoto.com/id/172485431/photo/last-supper-painting-in-ethiopian-monastery.jpg?s=170667a&w=0&k=20&c=PZ9Ws-3EYkMfIFGlAqd3OukIfVGsb8oG3HAiskxA3do=",
    description:
      "This exquisite Holy Trinity Icon is a profound example of Ethiopian Orthodox iconography, " +
      "blending ancient Byzantine influences with Ethiopia's unique artistic tradition.",
  };

  const handleToggle = async () => {
    const item: FavoriteItem = {
      id: artWork.id,
      title: artWork.title,
      artist: artWork.artist,
      date: artWork.date,
      image: artWork.image,
    };

    const newState = await toggleFavorites(item);
    setIsFav(newState);
  };

  return (
    <>
      {/* ✅ THIS IS THE ONLY CORRECT HEADER CONFIG */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: artWork.title,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 16 }}
            >
              <Text
                style={{
                  fontSize: 32,
                  color: "#4a2c2a",
                  fontWeight: "bold",
                }}
              >
                ←
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => null,
        }}
      />

      <ScrollView style={styles.container}>
        <Image
          source={{ uri: artWork.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{artWork.title}</Text>

            <TouchableOpacity
              onPress={handleToggle}
              style={styles.smallFavorite}
            >
              <Heart
                size={24}
                color="#4a2c2a"
                fill={isFav ? "#4a2c2a" : "transparent"}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            {artWork.artist} • {artWork.date}
          </Text>

          <Text style={styles.description}>{artWork.description}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f5f0" },
  image: { width: "100%", height: 450 },
  content: { padding: 24 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4a2c2a",
    flex: 1,
  },
  smallFavorite: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    backgroundColor: "rgba(74,44,42,0.1)",
  },
  subtitle: { fontSize: 18, color: "#666", marginBottom: 20 },
  description: { fontSize: 16, lineHeight: 26, color: "#333" },
});
