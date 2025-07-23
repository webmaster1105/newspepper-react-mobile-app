import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// import Voice from '@react-native-voice/voice';
import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const SearchField = ({ placeholder = "Search...", value='', onSearch }) => {
  const [text, setText] = useState(value);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechResults = onSpeechResults;
    // Voice.onSpeechError = onSpeechError;
    // return () => {
    //   Voice.destroy().then(Voice.removeAllListeners);
    // };
  }, []);

  const onSpeechStart = (event) => {
    console.log("speech start", event)
  };

  const onSpeechResults = (event) => {
    const spokenText = event.value?.[0] || '';
    setText(spokenText);
    onSearch && onSearch(spokenText);
    setIsListening(false);
  };

  const onSpeechError = (e) => {
    Alert.alert("on speech Voice error", e.error?.message || 'Unknown error');
    setIsListening(false);
  };

  const handleVoiceInput = async () => {
    // try {
    //   if (isListening) {
    //     await Voice.stop();
    //     setIsListening(false);
    //   } else {
    //     setIsListening(true);
    //     await Voice.start('en-US');
    //   }
    // } catch (e) {
    //   Alert.alert("handle Voice Error", e.message);
    // }
  };

  const handleClear = () => {
    setText('');
    onSearch && onSearch('');
  };

  const handleChange = (val) => {
    setText(val);
    // onSearch && onSearch(val);
  };

  const handleSearch = () => {
    
    onSearch && onSearch(text);
  };

  return (
    <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-md mx-4 mt-4">
      <Feather name="search" size={20} color="#888" className="mr-2" />
      <TextInput
        className="flex-1 text-base text-gray-700"
        placeholder={placeholder}
        value={text}
        onChangeText={handleChange}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear} className="ml-2">
          <Feather name="x-circle" size={20} color="#888" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleVoiceInput} className="ml-2">
        <MaterialCommunityIcons
          name={isListening ? "microphone" : "microphone-outline"}
          size={22}
          color={isListening ? "#f87171" : "#555"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
