import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  //To store what user types in each of the fields
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  //Function called when user taps "Create Profile"
  const handleCreateProfile = () => {
    if (!userName || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Profile Created:", { userName, email, password, birthdate });
    router.replace("/(tabs)/artGallery");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}> Join the Gallery</Text>

        {/*illustration placeholder*/}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>🎨</Text>
        </View>

        {/*Input fields*/}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="birthdate (optional)"
          placeholderTextColor="#aaa"
          value={birthdate}
          onChangeText={setBirthdate}
        />

        {/*Create Profile Button*/}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateProfile}
        >
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
        {/*link to login page*/}
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f0",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a2c2a",
    textAlign: "center",
    marginBottom: 0,
    marginTop: 0,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  illustration: {
    fontSize: 160,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d4a373",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  createButton: {
    backgroundColor: "#4a2c2a",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  linkText: {
    color: "#4a2c2a",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
