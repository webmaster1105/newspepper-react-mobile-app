import { Stack } from 'expo-router';

export default function NewsLayout() {

  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="source" options={{ headerShown: false }} />
    </Stack>
  );
}


