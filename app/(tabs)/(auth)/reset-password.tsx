import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase.config';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    
    const [successMessage, setSuccessMessage] = useState(null);

    const router = useRouter();

    // Higher Order Functions
    const handleInputChange = (setter) => (value) => {
      setter(value);
      if(errorMessage){
        setErrorMessage(null)
      }
    }

    const storeUser = async (user:any) => {
      try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('user', jsonValue);
      } catch (e) {
        // saving error
      }
    };

    const handleLogin = () => {
        setErrorMessage(null);
        sendPasswordResetEmail(auth, email)
        .then(()=> {
          setSuccessMessage('Password reset link sent to your email')
            }
            )
        .catch((error) => {
            const errorMsg = error.message;
            setErrorMessage(errorMsg);
        })
    }

  return (
    <View className="flex-1 justify-center items-center px-12">
      
      <Image  source={require('@/assets/images/icon.png')} style={{ height:250,width:250}}/>

      <Text className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-50">Reset Password</Text>
      <View className="w-full mb-4">
        <TextInput
            placeholder='Email'
            placeholderTextColor={'gray'}
            value={email}
            style={{
              textAlignVertical: 'top',
              
            
          }}
            onChangeText={handleInputChange(setEmail)}
            keyboardType='email-address'
           className="px-3 py-3 rounded-lg border border-gray-300 dark:text-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </View>
     
      {
        errorMessage && (
            <Text className="text-red-500 mb-4 text-center">{errorMessage}</Text>
        )
      }
      {

        successMessage && (
          <Text className="text-green-500 mb-4 text-center">{successMessage}</Text>
      )
      }
        <TouchableOpacity
        disabled={(successMessage && true)}
        onPress={handleLogin}
        className="bg-blue-500 disabled:bg-gray-500 py-3 px-10 rounded-lg shadow-md w-full"
      >
        <Text className="text-center text-white text-lg font-semibold">Reset</Text>
      </TouchableOpacity>
     
     
      
    </View>
  )
}

export default ResetPassword