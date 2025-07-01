import React from 'react';
import { TextInput, View } from 'react-native';



export const TextField = ({
  value,
  onChangeText,
  placeholder = "",
}) => {

  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 dark:bg-black">
      <TextInput
        className="flex-1 text-base text-gray-900 dark:text-gray-50"
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
      
    </View>
  );
};
