import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { artWorks } from "../data/artWorks";
export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const featuredArtWorks = artWorks.slice(0, 3);
  const scrollX = useRef(new Animated.Value(0)).current;
  const MAX_WIDTH = 420;
  const ITEM_WIDTH = Math.min(width * 0.8, MAX_WIDTH);

  return (
    <View style={styles.container}>
      {/*Header Section with subtitle*/}
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Discover the beauty of Ethiopian art
        </Text>
      </View>
      {/*Grid of Featured artworks*/}
      <Animated.FlatList
        scrollEventThrottle={16}
        data={featuredArtWorks}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={[styles.carouselItem, { width: ITEM_WIDTH }]}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.teaserImage}
              resizeMode="cover"
            />
          </View>
        )}
      />
      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {featuredArtWorks.map((_, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View key={index} style={[styles.dot, { opacity }]} />
          );
        })}
      </View>
      {/*Welcome Message */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          Immerse yourself in centuries of sacred traditions,{"\n"}
          vibrant colors, and spiritual storytelling.{"\n\n"}
          From ancient illuminated manuscripts{"\n"}
          to modern masterpieces by Ethiopian Artists.
        </Text>
      </View>

      {/* Debug message if no images */}
      {featuredArtWorks.length === 0 && (
        <Text style={styles.debugText}>
          No artworks loaded — check import path!
        </Text>
      )}

      {/*Get Started Button*/}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f5f0",
    alignItems: "center",
    paddingBottom: 40,
  },
  carouselItem: {
    height: 220,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeSection: {
    marginTop: 0,
    marginVertical: 30,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "#4a2c2a",
    textAlign: "center",
    lineHeight: 24,
  },
  separator: {
    height: 1,
    width: "60%",
    backgroundColor: "#ddd",
    marginVertical: 20,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4a2c2a",
    marginHorizontal: 6,
    marginBottom: 10,
    marginTop: 0,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4a2c2a",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#4a2c2a",
  },
  teaserGrid: {
    marginHorizontal: 10,
    width: 200,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  teaserGridLarge: {
    width: 200,
    height: 300,
  },
  teaserImage: {
    width: "100%",
    height: 180,
    margin: 8,
    borderRadius: 16,
    backgroundColor: "#eee",
  },
  getStartedButton: {
    backgroundColor: "#4a2c2a",
    margin: 40,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  debugText: {
    color: "red",
    fontSize: 16,
    margin: 40,
  },
});
