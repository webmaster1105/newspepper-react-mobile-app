import { auth } from '@/firebase.config';
import { FontAwesome } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-facebook";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function AuthButtons() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "simplest-invoice.apps.googleusercontent.com",
    androidClientId: "simplest-invoice.apps.googleusercontent.com",
    iosClientId: "simplest-invoice.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication!;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(err => {
        Alert.alert("Google Login Error", err.message);
      });
    }
  }, [response]);

  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({ appId: "YOUR_FACEBOOK_APP_ID" });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success" && token) {
        const credential = FacebookAuthProvider.credential(token);
        await signInWithCredential(auth, credential);
      }
    } catch (err: any) {
      Alert.alert("Facebook Login Error", err.message);
    }
  };

  return (
    <View className="p-4 space-y-4">
      <Pressable
        onPress={() => promptAsync()}
        className="flex-row items-center justify-center px-4 py-2 bg-white rounded-xl border border-gray-300 shadow"
      >
        <FontAwesome name="google" size={20} color="#DB4437" />
        <Text className="ml-2 text-base text-black">Continue with Google</Text>
      </Pressable>

      <Pressable
        onPress={handleFacebookLogin}
        className="flex-row items-center justify-center px-4 py-2 bg-blue-600 rounded-xl shadow"
      >
        <FontAwesome name="facebook" size={20} color="#fff" />
        <Text className="ml-2 text-base text-white">Continue with Facebook</Text>
      </Pressable>
    </View>
  );
}
