import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';
import "../global.css";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </AuthProvider>
      <Toast />
    </>
  );
}
