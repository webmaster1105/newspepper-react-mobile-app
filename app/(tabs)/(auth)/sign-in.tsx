import { auth } from '@/firebase.config';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { i18n, t } = useTranslation();

  const router = useRouter();

  // Higher Order Functions
  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (errorMessage) {
      setErrorMessage(null)
    }
  }

  const storeUser = async (user: any) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleLogin = () => {
    setErrorMessage(null);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // alert('User registered Successfully!')
        if (user.emailVerified) {
          // await storeUser(user);
          router.push('/settings')
        }
        else {
          setErrorMessage('Please verify your email before login')
        }
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        const errorMsg = error.message;
        setErrorMessage("Invaild email or password");
      })
  }

  return (
    <View className="flex-1 justify-center items-center px-12">

      <View className="flex-row hidden absolute top-12 right-0  justify-between px-12 py-3">


        <Link href="/(news)" className='dark:text-gray-300 mr-4'>
          <Feather size={24} name="bell" />
        </Link>

        <Link href="/settings" className='dark:text-gray-300'>
          <Feather size={24} name="menu" />
        </Link>

      </View>

      <Image source={require('@/assets/images/icon.png')} className="h-[250] w-[250]" />

      <Text className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-50">{t('login')}</Text>
      <View className="w-full mb-4">
        <TextInput
          placeholder='Email'
          value={email}
          placeholderTextColor={'gray'}
          style={{
            textAlignVertical: 'top',


          }}
          onChangeText={handleInputChange(setEmail)}
          keyboardType='email-address'
          className="px-3 py-3 rounded-lg border border-gray-300 dark:text-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </View>
      <View className="w-full mb-4">
        <TextInput
          placeholder='Password'
          value={password}
          placeholderTextColor={'gray'}
          onChangeText={handleInputChange(setPassword)}
          secureTextEntry
          className=" px-3 py-3 rounded-lg border border-gray-300 text-gray-900 dark:text-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </View>
      {
        errorMessage && (
          <Text className="text-red-500 mb-4 text-center">{errorMessage}</Text>
        )
      }
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 py-3 px-10 rounded-lg shadow-md w-full"
      >
        <Text className="text-center text-white text-lg font-semibold">Sign in</Text>
      </TouchableOpacity>

      <View className="mt-4">
        <Text className="text-gray-600">Don't have an account?{' '}
          <Text className="text-blue-500 font-semibold" onPress={() => router.push('sign-up')}>Sign up</Text>
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-gray-600">Forget Password?{' '}
          <Text className="text-blue-500 font-semibold" onPress={() => router.push('reset-password')}>Reset</Text>
        </Text>
      </View>
    </View>
  )
}

export default Signin