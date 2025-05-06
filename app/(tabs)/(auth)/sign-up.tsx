import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase.config';
import { useRouter } from 'expo-router';



const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const router = useRouter();

    // Higher Order Functions
    const handleInputChange = (setter) => (value) => {
      setter(value);
      if(errorMessage){
        setErrorMessage("")
      }
    }

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // alert('User registered Successfully!')
            sendEmailVerification(user)
            .then(() => {
              setSuccessMessage("Verification email sent! Please check your inbox")
            })
            .catch((error) => {
              setErrorMessage('Error sending verification email');
            })
            setEmail('');
            setPassword('');
        })
        .catch((error) => {
            const errorMsg = error.message;
            setErrorMessage(errorMsg);
        })
    }

  return (
    <View className="flex-1 justify-center items-center  px-12">
       <Image  source={require('@/assets/images/icon.png')} style={{ height:250,width:250}}/>
      <Text className="text-3xl font-bold text-gray-800 dark:text-gray-50 mb-4">Sign up</Text>
      <View className="w-full mb-4">
        <TextInput
            placeholder='Email'
            value={email}
            onChangeText={handleInputChange(setEmail)}
            placeholderTextColor={'gray'}
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
     {
      !emailSent && (
        <TouchableOpacity
        onPress={handleSignup}
        className="bg-blue-500 py-3 px-10 rounded-lg shadow-md w-full"
      >
        <Text className="text-center text-white text-lg font-semibold">Sign up</Text>
      </TouchableOpacity>
      )

      
     }
     {
      emailSent && (
        <Text className="text-green-500 mt-4 text-center">A verification email has been sent to your email address. Please verify your email before login!</Text>
      )
     }

      <View className="mt-4">
        <Text className="text-gray-600">Already have an account?{' '}
        <Text className="text-blue-500 font-semibold" onPress={() => router.push('sign-in')}>Login</Text>
        </Text>
      </View>
    </View>
  )
}

export default Signup