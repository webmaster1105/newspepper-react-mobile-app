import { Stack } from 'expo-router';

export default function HomeLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
       <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>
  );
}


