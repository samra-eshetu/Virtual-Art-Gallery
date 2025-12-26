// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer"; // Drawer root
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer"; // ← Official hamburger
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f9f5f0",
            width: 280,
          },
          drawerActiveTintColor: "#4a2c2a",
          drawerInactiveTintColor: "#666",
          drawerLabelStyle: { fontSize: 16, fontWeight: "500" },

          headerShown: true,
          headerStyle: { backgroundColor: "#f9f5f0" },
          headerTintColor: "#4a2c2a",
          headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          headerTitleAlign: "center",

          // Show official hamburger (☰) + optional custom elements
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Hamburger menu icon - opens drawer */}
              <DrawerToggleButton tintColor="#4a2c2a" />

              {/* Optional: your custom back arrow if needed on some screens */}
              {/* Remove or move to individual screens */}
            </View>
          ),
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
          options={{
            drawerLabel: "Profile",
            title: "My Profile",
          }}
        />
      </Drawer>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
