// app/mapping.tsx
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

// Mock data: Ethiopian art periods (you can expand with real data later)
const artPeriods = [
  {
    id: "1",
    name: "Aksumite Period",
    years: "1st–7th Century",
    description:
      "Early Christian art with monumental stelae, coinage, and rock-hewn churches.",
    artworks: [
      {
        id: "aks1",
        title: "Aksumite Stela",
        image: "https://example.com/aksum-stela.jpg", // Replace with real URL
      },
      {
        id: "aks2",
        title: "King Ezana Throne",
        image: "https://example.com/ezana.jpg",
      },
    ],
  },
  {
    id: "2",
    name: "Medieval Period",
    years: "8th–15th Century",
    description:
      "Illuminated manuscripts, Lalibela churches, and early icon painting.",
    artworks: [
      {
        id: "med1",
        title: "Garima Gospels",
        image: "https://example.com/garima.jpg",
      },
      {
        id: "med2",
        title: "Lalibela Cross",
        image: "https://example.com/lalibela-cross.jpg",
      },
    ],
  },
  {
    id: "3",
    name: "Gondarine Period",
    years: "16th–18th Century",
    description:
      "Golden age of icon painting with vibrant colors and detailed compositions.",
    artworks: [
      {
        id: "gon1",
        title: "Holy Trinity Icon",
        image:
          "https://media.istockphoto.com/id/1472548515/photo/painting-of-the-three-persons-of-the-holy-trinity-in-debre-berhan-selassie-church-gondar.jpg?s=612x612&w=0&k=20&c=1zWucdeoQ_bFz-3-7W65Spzvcwj2WLCFg1YyRryGXfI=",
      },
      {
        id: "gon2",
        title: "Virgin Mary with Child",
        image: "https://example.com/mary-gondar.jpg",
      },
    ],
  },
  {
    id: "4",
    name: "19th–20th Century",
    years: "1800s–1900s",
    description:
      "Influence of European styles, modern religious art, and secular themes.",
    artworks: [
      {
        id: "mod1",
        title: "Emperor Menelik II Portrait",
        image:
          "https://media.istockphoto.com/id/1472548515/photo/painting-of-the-three-persons-of-the-holy-trinity-in-debre-berhan-selassie-church-gondar.jpg?s=612x612&w=0&k=20&c=1zWucdeoQ_bFz-3-7W65Spzvcwj2WLCFg1YyRryGXfI=",
      },
    ],
  },
  {
    id: "5",
    name: "Contemporary",
    years: "Late 20th–Today",
    description:
      "Modern Ethiopian artists blending tradition with contemporary expression.",
    artworks: [
      {
        id: "cont1",
        title: "Modern Icon Fusion",
        image: "https://example.com/modern-fusion.jpg",
      },
    ],
  },
];

const { width } = Dimensions.get("window");

export default function InteractiveMapping() {
  const router = useRouter();

  // Renders one period card (full screen width)
  const renderPeriod = ({ item }: { item: (typeof artPeriods)[0] }) => (
    <View style={styles.periodCard}>
      {/* Period title */}
      <Text style={styles.periodName}>{item.name}</Text>

      {/* Year range */}
      <Text style={styles.periodYears}>{item.years}</Text>

      {/* Short description */}
      <Text style={styles.periodDesc}>{item.description}</Text>

      {/* Horizontal scroll of artworks in this period */}
      <FlatList
        data={item.artworks}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(art) => art.id}
        renderItem={({ item: art }) => (
          <TouchableOpacity
            style={styles.artworkCard}
            onPress={() =>
              router.push({
                pathname: "/artworks/[id]",
                params: { id: art.id, title: art.title },
              })
            }
          >
            <Image source={{ uri: art.image }} style={styles.artworkImage} />
            <Text style={styles.artworkTitle}>{art.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Main horizontal timeline */}
      <FlatList
        data={artPeriods}
        renderItem={renderPeriod}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled // Snap to each period card
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f0",
  },
  timeline: {
    padding: 20,
  },
  periodCard: {
    width, // Full screen width for paging feel
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  periodName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a2c2a",
    marginBottom: 8,
  },
  periodYears: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  periodDesc: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  artworkCard: {
    width: 180,
    marginRight: 16,
    alignItems: "center",
  },
  artworkImage: {
    width: 180,
    height: 220,
    borderRadius: 12,
  },
  artworkTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
