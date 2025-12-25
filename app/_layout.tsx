import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { TouchableOpacity, Text } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#f9f5f0" },
          headerTintColor: "#4a2c2a",
          headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
          headerTitleAlign: "center",
          // Custom back button for ALL full-screen routes
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")} // Force go to Home tab root
              style={{
                marginLeft: 0,
                padding: 8,
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <Text
                style={{
                  color: "#4a2c2a",
                  fontSize: 24,
                  fontWeight: "bold",
                  marginRight: 6,
                }}
              >
                {"<"}
              </Text>
              <Text
                style={{ color: "#4a2c2a", fontWeight: "bold", fontSize: 17 }}
              >
                Home
              </Text>
            </TouchableOpacity>
          ),
        }}
      >
        {/*Signup Page */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: "Signup" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
