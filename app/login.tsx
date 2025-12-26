import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Successful:", data);
    router.replace("/(tabs)/artGallery");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome Back</Text>
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>🎨</Text>
        </View>
        {/* Email */}
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

        {/* Password */}
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
        {/*Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/*Link to signup */}
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.linkText}> Do not have an account? Signup</Text>
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
    paddingVertical: 60,
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
    marginBottom: 50,
  },
  illustration: {
    fontSize: 180,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d4a373",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: "#4a2c2a",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
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
