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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

{
  /* Define schema for form validation */
}
const signupSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  birthdate: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  //To store what user types in each of the fields
  const router = useRouter();

  {
    /*Setup React Hook form and Zod resolver*/
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });
  {
    /*Form submit handler*/
  }
  const onSubmit = (data: SignupFormData) => {
    console.log("Profile created successfully:", data);
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

        {/*Input fields with controller and react-hook-form*/}
        <Controller
          control={control}
          name="userName"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  errors.userName && { borderColor: "#ff6b6b" },
                ]}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
              />
              {errors.userName && (
                <Text style={styles.errorText}>{errors.userName.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  errors.email && { borderColor: "#ff6b6b" },
                ]}
                placeholder="Email Address"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  errors.password && { borderColor: "#ff6b6b" },
                ]}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="birthdate"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Birthdate (optional)"
              placeholderTextColor="#aaa"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/*Create Profile Button*/}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleSubmit(onSubmit)}
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
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
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
