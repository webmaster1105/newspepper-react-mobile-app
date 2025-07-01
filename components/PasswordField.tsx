// components/PasswordInput.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';



export const PasswordField = ({
  value,
  onChangeText,
  placeholder = "Enter password",
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 dark:bg-black">
      <TextInput
        className="flex-1 text-base  text-gray-900 dark:text-gray-50"
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable onPress={() => setSecure(!secure)}>
        {secure ? (

           <FontAwesome className="text-red-500"
                            name={'eye-slash'}
                            size={20}
                            color={'gray'}
                          /> 
        ) : (
          <FontAwesome className="text-red-500"
                            name={'eye'}
                            size={20}
                            color={'gray'}
                          /> 
        )}
      </Pressable>
    </View>
  );
};
