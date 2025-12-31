import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Profile</Text>
      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          color: "#666",
          textAlign: "center",
        }}
      >
        Your saved artworks, favorites, and settings will appear here.
      </Text>
    </View>
  );
}
