// app/artworks/[id].tsx
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { useState } from "react"; // For favorite toggle

export default function ArtworkDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // State for favorite toggle
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock data
  const artWork = {
    id,
    title: "Holy Trinity Icon",
    artist: "Unknown Master",
    date: "15th Century",
    image:
      "https://media.istockphoto.com/id/1472548515/photo/painting-of-the-three-persons-of-the-holy-trinity-in-debre-berhan-selassie-church-gondar.jpg?s=612x612&w=0&k=20&c=1zWucdeoQ_bFz-3-7W65Spzvcwj2WLCFg1YyRryGXfI=",
    description:
      "This exquisite Holy Trinity Icon is a profound example of Ethiopian Orthodox iconography, " +
      "blending ancient Byzantine influences with Ethiopia's unique artistic tradition. " +
      "The composition portrays the Father, Son, and Holy Spirit in harmonious unity — " +
      "often with Christ enthroned at the center, flanked by symbolic representations of the Father " +
      "and the dove of the Holy Spirit. The rich palette of deep ultramarine blues, fiery reds, " +
      "and radiant gold creates a powerful sense of divine presence. " +
      "Painted with natural mineral pigments on gessoed wood, this sacred image has been central " +
      "to Ethiopian Christian devotion for centuries, used in churches, processions, " +
      "and personal prayer.",
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Full-width artwork image */}
      <Image
        source={{ uri: artWork.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content container */}
      <View style={styles.content}>
        {/* Title + Favorite button side by side */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{artWork.title}</Text>

          {/* Smaller favorite button next to title */}
          <TouchableOpacity onPress={toggleFavorite} style={styles.smallFavorite}>
            <Heart
              size={24}                    // Smaller size
              color="#4a2c2a"              // Outline color
              fill={isFavorited ? "#4a2c2a" : "transparent"} // Filled when favorited
            />
          </TouchableOpacity>
        </View>

        {/* Artist & Date */}
        <Text style={styles.subtitle}>
          {artWork.artist} • {artWork.date}
        </Text>

        {/* Description */}
        <Text style={styles.description}>{artWork.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f0",
  },
  image: {
    width: "100%",
    height: 450,
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
    flex: 1, // Title takes most space
  },
  smallFavorite: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    backgroundColor: "rgba(74,44,42,0.1)", // Very subtle background
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