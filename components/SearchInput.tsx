import { Feather } from '@expo/vector-icons'; // Expo icon pack
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

const SearchInput = ({ placeholder = "Search...", onSearch }) => {
  const [text, setText] = useState('');

  const handleClear = () => {
    setText('');
    onSearch && onSearch('');
  };

  const handleChange = (val) => {
    setText(val);
    onSearch && onSearch(val);
  };

  return (
    <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-2  mx-2 mt-4">
      <Feather name="search" size={20} color="#888" className="mr-2" />
      <TextInput
        className="flex-1 text-base dark:text-gray-50"
        placeholder={placeholder}
        value={text}
        onChangeText={handleChange}
        returnKeyType="search"
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Feather name="x-circle" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
