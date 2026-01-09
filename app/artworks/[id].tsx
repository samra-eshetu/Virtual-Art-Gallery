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
import { useState } from "react";

export default function ArtworkDetail() {
  const { id, title } = useLocalSearchParams<{
    id: string;
    title?: string;
  }>();
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState(false);

  const artWork = {
    id,
    title: title ?? "Holy Trinity Icon",
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
    <>
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
              onPress={() => setIsFavorited(!isFavorited)}
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
        </View>
      </ScrollView>
    </>
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
