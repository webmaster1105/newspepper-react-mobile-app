import AuthButtons from '@/components/AuthButton';
import Avatar from '@/components/Avatar';
import LanguageSelector from '@/components/LanguageSelector';
import { auth } from '@/firebase.config';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
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


  const deleteConfirmation = () => {

    Alert.alert(
      "Confirm Delete Account", // Title of the alert
      "Are you sure you want to proceed?", // Message of the alert
      [
        {
          text: "No", // Text for the first button
          onPress: () => console.log("No Pressed"), // Callback for "No" button
          style: "cancel" // Style for the "No" button (often makes it a "cancel" style)
        },
        {
          text: "Yes", // Text for the second button
          onPress: () => {
            console.log("Yes Pressed")
            deleteCurrentUser()

          }
          // Callback for "Yes" button
        }
      ],
      { cancelable: true } // Prevents dismissing the alert by tapping outside (optional)
    );


  }

  const deleteCurrentUser = async () => {

    const user = auth.currentUser;

    if (user) {
      try {
        //await user.delete();
        signOut(auth).then(() => {
          setAuthUser(null);
        });
        console.log('User account deleted successfully.');
        // Navigate the user to a different screen (e.g., login screen)
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          console.log('Re-authentication required to delete account.');
          // Prompt user to re-authenticate (e.g., ask for password)
          // Then try deleting again after successful re-authentication.
        } else {
          console.error('Error deleting user:', error);
        }
      }
    } else {
      console.log('No user is currently signed in.');
    }
  };

  return (
    <SafeAreaView className="flex px-4">
      <ScrollView className="px-4 pt-6 mb-10">
        <View className="bg-white dark:bg-neutral-900 rounded my-10 px-4 py-8 shadow-sm">
          {!authUser &&
            <View className="flex-col justify-between items-center py-3">
              <Text className="text-gray-800 dark:text-gray-100">{t('login_message')}</Text>
              <Link href="/(tabs)/(auth)/sign-in" className='bg-blue-600 px-5 py-3 mt-8 font-bold rounded text-gray-50'>Login</Link>
            </View>}
          {authUser &&
            <View className="flex items-center">
              <Avatar size={100}
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
          <View className="bg-white dark:bg-neutral-900 rounded mb-6 p-4 shadow-sm">
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-gray-800 dark:text-gray-100">{t('language')}</Text>
              <LanguageSelector />
            </View>
          </View>

          {/* Notifications Section */}
          <View className="bg-white dark:bg-neutral-900 rounded mb-6 p-4 shadow-sm">
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
          <View className="bg-white dark:bg-neutral-900 rounded mb-6 p-4 shadow-sm">
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

        <View className="bg-white dark:bg-neutral-900 rounded mb-6 p-4 shadow-sm ">
          <Text className="text-gray-500 font-bold mb-2 border-b border-gray-200 pb-2 dark:text-gray-100">{t('activity')}</Text>



          <TouchableOpacity className="py-3 dark:border-neutral-950"
          >

            <Link href="/(tabs)/SavedNewsScrollList"
            >
              <Text className="text-gray-800 dark:text-gray-100">{t('bookmarkedNews')}</Text>
            </Link>

          </TouchableOpacity>

        </View>

        {authUser &&
          <View className="bg-white dark:bg-neutral-900 rounded mb-6 p-4 shadow-sm ">
            <Text className="text-gray-500 font-bold mb-2 border-b border-gray-200 pb-2 dark:text-gray-100">{t('account')}</Text>



            <TouchableOpacity className="py-3  dark:border-neutral-950"
            >

              <Link href="/(tabs)/(auth)/reset-password"
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
            <TouchableOpacity className="py-3" onPress={deleteConfirmation}>


              <Text className={"font-bold text-red-500 "}>
                <FontAwesome
                  name={'trash'}
                  size={24}
                />  Delete Account</Text>

            </TouchableOpacity>
          </View>
        }




        <View className="flex-1 justify-center items-center px-12 mb-10">
          <Text className="dark:text-gray-100">

            <Link href={"/WebPage?url=https://newspepperapp.in/privacy-policy"}>Privacy Policy</Link>
            {" | "}

            <Link href={"/WebPage?url=https://newspepperapp.in/terms-of-usage"}>Terms of usage mm</Link>
          </Text>
        </View>


      </ScrollView>


      {/* <BookmarkedNews /> */}

      <AuthButtons />


    </SafeAreaView>
  );
};

export default Settings;
