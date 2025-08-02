// PostReaderHindiFinal.tsx
import { speakText, stopSpeaking } from '@/scripts/TextToSpeech';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

export default function TextToSpeech({text}:{text:string}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakText(text, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

 


  return (
    
      <Pressable
        onPress={toggleSpeech}
        className={`px-2 py-1`}
      >
{
  !isSpeaking &&      <Text className='dark:text-gray-100 '><FontAwesome  name={isSpeaking ? "stop" :"play"} size={20}/></Text>

    
}
{isSpeaking && (
        <Text className='text-red-600 animate-pulse mb-1'><FontAwesome  name={isSpeaking ? "volume-up" :"play"} size={20}/></Text>

      )}

      </Pressable>
    
  );
}
