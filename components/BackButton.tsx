// components/BackButton.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function BackButton({screen}:{screen:string}) {

  return (
    <Pressable
      onPress={() => 
        
        {
            screen==="back"? router.back() : router.push(screen)
        }}
      className="p-3 bg-gray-200 opacity-85 rounded-full items-center justify-center absolute top-16 left-5 z-50"
    >
      
                                <Ionicons name="arrow-back" size={24} color="gray" />
    </Pressable>
  );
}
