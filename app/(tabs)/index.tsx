import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const artWorks = [
  {
    id: 1,
    title: "Church Painting (Traditional Icon)",
    artist: "Ethiopian Orthodox Art",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Ethiopian_Church_Painting_%282262019698%29.jpg",
  },
  {
    id: 2,
    title: "Miracles of Archangel Michael",
    artist: "Folding Processional Icon",
    imageUrl:
      "https://i0.wp.com/farm8.staticflickr.com/7399/8719769427_8bf0acd774_o.jpg",
  },
  {
    id: "3",
    title: "Folding Processional Icon",
    artist: "Ethiopian Sacred Art",
    uri: "https://apollo-magazine.com/wp-content/uploads/2023/12/1.5-Folding-Processional-Icon-in-the-Shape-of-a-Fan-LEAD.jpg?fit=1000%2C667",
  },
  {
    id: "4",
    title: "Last Supper (Monastery Painting)",
    artist: "Traditional Ethiopian",
    uri: "https://media.istockphoto.com/id/172485431/photo/last-supper-painting-in-ethiopian-monastery.jpg?s=612x612&w=0&k=20&c=JGfxXMZN75LExPE85XfaRIUmrlXwoqzpf29Z8gJccNs=",
  },
  {
    id: "5",
    title: "Self-Portrait in the Studio",
    artist: "Afewerk Tekle",
    uri: "https://sothebys-com.brightspotcdn.com/dims4/default/c0a7373/2147483647/strip/false/crop/3373x1897+0+400/resize/1200x675!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F70%2F75%2F341aaa474b73bc4c77a3f58873cc%2F080l18802-9x428-1.jpg",
  },
  {
    id: "6",
    title: "The Horrors of War",
    artist: "Afewerk Tekle",
    uri: "https://c8.alamy.com/comp/2F34TGK/london-uk-15th-mar-2021-geoffrey-ernest-katantazi-mukasa-ugandan-1954-2009-contrapposto-in-blue-est-5000-8000-and-afewerk-tekle-ethiopian-1932-2012-the-horrors-of-war-no-3-est-4000-6000-preview-of-bonhams-modern-contemporary-african-art-sale-at-bonhams-new-bond-street-the-sale-itself-will-take-place-on-wednesday-17-march-credit-guy-bellalamy-live-news-2F34TGK.jpg",
  },
  {
    id: "7",
    title: "Bet Giyorgis (Lalibela)",
    artist: "Rock-Hewn Church",
    uri: "https://www.world-archaeology.com/wp-content/uploads/2006/07/H-Beta-Giyorgis-plus-pilgrims.jpg",
  },
  {
    id: "8",
    title: "Traditional Coffee Ceremony",
    artist: "Ethiopian Culture",
    uri: "https://www.orinococoffeeandtea.com/wp-content/uploads/2022/05/iStock-1300998594.jpg",
  },
];

export default function ArtGallery() {
  const renderItem = ({ item }: { item: (typeof artWorks)[0] }) => (
    <TouchableOpacity style={Styles.item}>
      <Image
        source={{ uri: item.imageUrl || item.uri }}
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
      <Text style={Styles.header}>Virtual Art Gallery 🎨 </Text>
      <FlatList
        data={artWorks}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
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
    color: "#4a2c2a",
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
