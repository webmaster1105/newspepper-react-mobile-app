import Avatar from '@/components/Avatar';
import LanguageSelector from '@/components/LanguageSelector';
import { auth } from '@/firebase.config';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Switch, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { i18n, t } = useTranslation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setAuthUser(user);
      } else {
        // User is signed out
        console.log('User signed out');
      }
    });

  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-4 pt-6">
        <View className="bg-white dark:bg-neutral-900 rounded-2xl my-10 px-4 py-8 shadow-sm">
          {!authUser &&
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-gray-800 dark:text-gray-100">{t('login_message')}</Text>
              <Link href="/(tabs)/(auth)/sign-in" className='bg-blue-600 px-5 py-3 font-bold rounded text-gray-50'>Login</Link>
            </View>}
          {authUser &&
            <View className="flex items-center">
              <Avatar size={150}
                name={authUser?.email.match(/^([^@]*)@/)[1]}


              />
              <Text className="text-2xl font-bold mt-4 dark:text-gray-50">{authUser?.email.match(/^([^@]*)@/)[1]}</Text>
              <Text className="text-gray-600 dark:text-gray-50">{authUser?.email}</Text>
            </View>
          }

        </View>
<View className='hidden'>
        <Text className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{t('settings')}</Text>

        {/* Language Section */}
        <View className="bg-white dark:bg-neutral-900 rounded-2xl mb-6 p-4 shadow-sm">
          <View className="flex-row justify-between items-center py-3">
            <Text className="text-gray-800 dark:text-gray-100">{t('language')}</Text>
            <LanguageSelector />
          </View>
        </View>

        {/* Notifications Section */}
        <View className="bg-white dark:bg-neutral-900 rounded-2xl mb-6 p-4 shadow-sm">
          <Text className="text-gray-500 dark:text-gray-100 font-bold mb-2">{t('notifications')}</Text>
          <View className="flex-row justify-between items-center py-3">
            <Text className="text-gray-800 dark:text-gray-100">{t('enable_notifications')}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        {/* Appearance Section */}
        <View className="bg-white dark:bg-neutral-900 rounded-2xl mb-6 p-4 shadow-sm">
          <Text className="text-gray-500 font-bold mb-2 dark:text-gray-100">{t('appearance')}</Text>
          <View className="flex-row justify-between items-center py-3">
            <Text className="text-gray-800 dark:text-gray-100">{t('dark_mode')}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>
</View>
       
        {authUser &&
          <View className="bg-white dark:bg-neutral-900 rounded-2xl mb-6 p-4 shadow-sm ">
            <Text className="text-gray-500 font-bold mb-2 dark:text-gray-100">{t('account')}</Text>

            

            <TouchableOpacity className="py-3 border-b border-gray-200 dark:border-neutral-950"
            >

              <Link  href="/(tabs)/(auth)/reset-password"
                        >
                         <Text className="text-gray-800 dark:text-gray-100">{t('change_password')}</Text>
                          </Link>
              
            </TouchableOpacity>

            <TouchableOpacity className="py-3" onPress={() => {

              return signOut(auth).then(() => {
                setAuthUser(null);
              });
              // router.push("/");

            }}>


              <Text className={"font-bold text-red-500 "}>
                <FontAwesome
                  name={'sign-out'}
                  size={24}
                />   Sign Out</Text>

            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
