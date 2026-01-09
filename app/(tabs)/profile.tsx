// app/(tabs)/profile.tsx
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { getFavorites, FavoriteItem } from "../utils/favorites"; // Adjust path if needed

export default function Profile() {
  // State to hold the list of favorited artworks
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites when the profile tab is opened
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favs = await getFavorites(); // Fetch from AsyncStorage
        setFavorites(favs); // Update UI
      } catch (error) {
        console.error("Error loading favorites in Profile:", error);
      }
    };

    loadFavorites(); // Run when component mounts
  }, []); // Empty dependency array = run once on mount

  // Render each favorited artwork as a card
  const renderFavorite = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.favItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.favImage}
        resizeMode="cover"
      />
      <Text style={styles.favTitle}>{item.title}</Text>
      <Text style={styles.favSubtitle}>
        {item.artist} • {item.date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Page header */}
      <Text style={styles.header}>Your Favorites</Text>

      {/* If no favorites yet, show friendly message */}
      {favorites.length === 0 ? (
        <Text style={styles.empty}>
          No favorites yet. Tap the heart on any artwork to save it here!
        </Text>
      ) : (
  
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id}
          numColumns={2} // 2 columns like your gallery
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f0",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a2c2a",
    marginBottom: 20,
    textAlign: "center",
  },
  empty: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 100,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  favItem: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  favImage: {
    width: "100%",
    height: 180,
  },
  favTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a2c2a", 
    textAlign: "center",
    padding: 8,
  },
  favSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
});