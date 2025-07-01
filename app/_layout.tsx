import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import store from '@/store';
import { Provider } from 'react-redux';

import "@/global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import "@/i18n";
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      
      router.push({
          pathname: "/(tabs)/(categories)/[id]",
          params: { id:  0 , fromHome:Math.random()}
        });
        SplashScreen.hideAsync();
    }

   
    
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
 
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </Provider>
    </ThemeProvider>
   
  );
}
