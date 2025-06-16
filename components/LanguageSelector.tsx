import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' }
];

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);




  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  return (
    <View className="mt-4">
      <TouchableOpacity
        className="p-3 rounded border border-gray-200"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-gray-800 dark:text-gray-50">{languages.find(l => l.code === currentLanguage)?.label}</Text>
      </TouchableOpacity>

      {/* Modal for language selection */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1  justify-center items-center"
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View className="bg-white dark:bg-neutral-950 rounded w-[80%] max-h-80 p-4">
            <Text className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Select Language</Text>
            <FlatList
              data={languages}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-2"
                  onPress={() => changeLanguage(item.code)}
                >
                  <Text
                    className={`text-gray-800 dark:text-gray-100 ${
                      currentLanguage === item.code ? 'font-bold' : ''
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default LanguageSelector;
