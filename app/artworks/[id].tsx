import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

/* =======================
   Route params typing
======================= */
type ArtworkParams = {
  id: string;
  title?: string;
};

export default function ArtworkDetail() {
  const params = useLocalSearchParams<ArtworkParams>();
  const { id, title: passedTitle } = params;
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState(false);

  /* =======================
     Artwork data (mock)
  ======================= */
  const artWork = {
    id,
    title: passedTitle || "Holy Trinity Icon",
    artist: "Unknown Master",
    date: "15th Century",
    image:
      "https://media.istockphoto.com/id/1472548515/photo/painting-of-the-three-persons-of-the-holy-trinity-in-debre-berhan-selassie-church-gondar.jpg?s=612x612&w=0&k=20&c=1zWucdeoQ_bFz-3-7W65Spzvcwj2WLCFg1YyRryGXfI=",
    description:
      "This exquisite Holy Trinity Icon is a profound example of Ethiopian Orthodox iconography...",
  };

  /* =======================
     REANIMATED VALUES
  ======================= */
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Used to store pan start values (IMPORTANT for TS safety)
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  /* =======================
     PINCH TO ZOOM
  ======================= */
  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      } else {
        savedScale.value = scale.value;
      }
    });

  /* =======================
     PAN (MOVE IMAGE)
     Uses translationX/Y (TS safe)
  ======================= */
  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (scale.value > 1) {
        translateX.value = startX.value + event.translationX;
        translateY.value = startY.value + event.translationY;
      }
    });

  /* =======================
     DOUBLE TAP TO ZOOM
  ======================= */
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      } else {
        scale.value = withTiming(2.5);
        savedScale.value = 2.5;
      }
    });

  /* =======================
     COMBINE ALL GESTURES
  ======================= */
  const gesture = Gesture.Simultaneous(pan, pinch, doubleTap);

  /* =======================
     ANIMATED IMAGE STYLE
  ======================= */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const toggleFavorite = () => setIsFavorited(!isFavorited);

  return (
    <>
      {/* =======================
          HEADER
      ======================= */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: artWork.title,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 16 }}
            >
              <Text
                style={{ fontSize: 32, color: "#4a2c2a", fontWeight: "bold" }}
              >
                ←
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* =======================
          MAIN LAYOUT
      ======================= */}
      <View style={styles.container}>
        {/* ===== FIXED IMAGE AREA ===== */}
        <View style={styles.imageWrapper}>
          <GestureDetector gesture={gesture}>
            <Animated.Image
              source={{ uri: artWork.image }}
              style={[styles.image, animatedStyle]}
              resizeMode="contain"
            />
          </GestureDetector>
        </View>

        {/* ===== SCROLLABLE TEXT ===== */}
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{artWork.title}</Text>

            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.smallFavorite}
            >
              <Heart
                size={24}
                color="#4a2c2a"
                fill={isFavorited ? "#4a2c2a" : "transparent"}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            {artWork.artist} • {artWork.date}
          </Text>

          <Text style={styles.description}>{artWork.description}</Text>
        </ScrollView>
      </View>
    </>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f0",
  },

  // Prevents zoomed image from overlapping text
  imageWrapper: {
    height: 500,
    backgroundColor: "#000",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 24,
  },

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

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    marginBottom: 32,
  },
});
