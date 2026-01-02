import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import {useRouter} from 'expo-router';
import { artWorks } from "../data/artWorks";

export default function ArtGallery() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  let numColumns = 2; //default for phones
  if (width >= 768) numColumns = 3; //tablets
  if (width >= 1200) numColumns = 4; //desktops

  const ITEM_MARGIN = 8;
  const ITEM_WIDTH = (width - ITEM_MARGIN * (numColumns + 1)) / numColumns;

  const renderItem = ({ item }: { item: (typeof artWorks)[0] }) => (
    <TouchableOpacity
  onPress={() => {
    router.push({
      pathname: '/artworks/[id]',
      params: { id: item.id }
    });
  }}
  style={[Styles.item, { width: ITEM_WIDTH }]}
>
      
      <Image
        source={{ uri: item.imageUrl }}
        style={Styles.image}
        resizeMode="cover"
      />
      <View style={Styles.info}>
        <Text style={Styles.title}>{item.title}</Text>
        <Text style={Styles.artist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={Styles.container}>
      <FlatList
        key={numColumns}
        data={Array.isArray(artWorks) ? artWorks : []}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns} //dynamic column count based on screen width
        contentContainerStyle={Styles.list}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f5f0" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginTop: 10,
    color: "#4a2c2a",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#556b2f",
  },
  list: { padding: 10 },
  item: {
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
  image: { width: "100%", height: 220 },
  info: { padding: 12 },
  title: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  artist: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 4 },
});
