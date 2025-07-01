import { router, Tabs } from 'expo-router';
import React from 'react';
import { Button, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';


export default function TabLayout() {
  const colorScheme = useColorScheme();
    const { t } = useTranslation();

  return (
    <Tabs

    initialRouteName='(categories)'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            //display:'none'
            

          },
        }),
      }}>

 

       <Tabs.Screen
        name="(categories)"
        options={{
          href: null,
        }}
       
      />

      <Tabs.Screen
        name="(auth)"
        options={{
          href: null,
        }}
      />
      

        <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color }) => <IconSymbol size={18} name="house.fill" color={color} />,
        }}
      />

          

      

      
       

      

      
      <Tabs.Screen
        name="search"
        options={{
          title: t('search'),
          tabBarIcon: ({ color }) => <FontAwesome size={18} name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="WebPage"
        options={{
          href: null,
          // headerShown:true,
          headerLeft: () => (
                <Button
                  onPress={() => router.push("/settings")} // Custom navigation
                  title="<"
                />
              ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: t('you'),
          tabBarIcon: ({ color }) => <FontAwesome size={18} name="user" color={color} />,
        }}
      />
     

    </Tabs>
  );
}
