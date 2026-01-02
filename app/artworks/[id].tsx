import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Heart } from "lucide-react-native";
export default function ArtworkDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  //Mock data
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
        {/* Title */}
        <Text style={styles.title}>{artWork.title}</Text>

        {/* Artist & Date */}
        <Text style={styles.subtitle}>
          {artWork.artist} • {artWork.date}
        </Text>

        {/* Description */}
        <Text style={styles.description}>{artWork.description}</Text>

        {/* Favorite Button (optional) */}
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={24} color="#fff" fill="#fff" />
          <Text style={styles.favoriteText}>Add to Favorites</Text>
        </TouchableOpacity>

        {/* Back Button (optional - native back usually works fine) */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back to Gallery</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4a2c2a",
    marginBottom: 8,
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
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4a2c2a",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  favoriteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
  backButton: {
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#4a2c2a",
    fontSize: 14,
    fontWeight: "600",
  },
});
