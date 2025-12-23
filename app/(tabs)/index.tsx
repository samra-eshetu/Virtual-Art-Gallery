import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { artWorks } from "../data/artWorks";
import { useWindowDimensions } from "react-native";
export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const featuredArtWorks = artWorks.slice(0, 3);
  const isTabletOrDesktop = width >= 768;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*Heaader Section with subtitle*/}
      <View style={styles.header}>
        <Text style={styles.title}>Ethiopian Art Gallery</Text>
        <Text style={styles.subtitle}>
          Discover the beauty of Ethiopian art
        </Text>
      </View>
      {/*Grid of Featured artworks*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // style={[styles.teaserGrid, isTabletOrDesktop && styles.teaserGridLarge]}
      >
        {featuredArtWorks.map((item) => (
          <View
            key={item.id}
            style={[
              styles.teaserGrid,
              isTabletOrDesktop && styles.teaserGridLarge,
            ]}
          >
            <Image
              key={item.id}
              source={{ uri: item.imageUrl }}
              style={styles.teaserImage}
              resizeMode="cover"
              // Optional: Show placeholder if image fails
              onError={() => console.log("Image failed:", item.imageUrl)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Debug message if no images */}
      {featuredArtWorks.length === 0 && (
        <Text style={styles.debugText}>
          No artworks loaded — check import path!
        </Text>
      )}

      {/*Get Started Button*/}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => router.push("/artGallery")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f5f0",
    alignItems: "center",
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
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
