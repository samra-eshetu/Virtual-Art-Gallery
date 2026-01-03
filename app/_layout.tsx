// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();

  const isDetailPage = pathname.startsWith("/artworks");

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          drawerStyle: { backgroundColor: "#f9f5f0", width: 280 },
          drawerActiveTintColor: "#4a2c2a",
          drawerInactiveTintColor: "#666",
          drawerLabelStyle: { fontSize: 16, fontWeight: "500" },

          headerShown: true,
          headerStyle: { backgroundColor: "#f9f5f0" },
          headerTintColor: "#4a2c2a",
          headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          headerTitleAlign: "center",

          // Only override headerLeft on detail pages
          headerLeft: isDetailPage
            ? () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ marginLeft: 16 }}
                >
                  <Text
                    style={{
                      fontSize: 26,
                      color: "#4a2c2a",
                      fontWeight: "bold",
                    }}
                  >
                    ←
                  </Text>
                </TouchableOpacity>
              )
            : undefined, // ← IMPORTANT: undefined means "use default Drawer toggle"
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Ethiopian Art Gallery",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            drawerLabel: "Explore Artworks",
            title: "Explore Artworks",
          }}
        />
        <Drawer.Screen
          name="mapping"
          options={{
            drawerLabel: "Interactive Mapping",
            title: "Interactive Mapping",
          }}
        />
        <Drawer.Screen
          name="compare"
          options={{
            drawerLabel: "Compare Artworks",
            title: "Compare Artworks",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{ drawerLabel: "Profile", title: "My Profile" }}
        />
      </Drawer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}