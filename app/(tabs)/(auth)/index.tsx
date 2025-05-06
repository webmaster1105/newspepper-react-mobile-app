import { auth } from '@/firebase.config';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

function Profile() {
     const [authUser,setAuthUser] = useState(null);
     const router = useRouter()
    
      useEffect(() => {
         auth.onAuthStateChanged((user) => {
               if (user) {
                 // User is signed in
                 setAuthUser(user);
               } else {
                 // User is signed out
                 router.push("sign-in");
                 console.log('User signed out');
               }
             });
             
      }, []);
    
      console.log('curr auth user',authUser);

  return (
    <View className="flex-1 ">
      <View className="flex items-center mt-20">
      {/* <UserAvatar size={150} 
      name={authUser?.email.match(/^([^@]*)@/)[1]}

      /> */}
        <Text className="text-2xl font-bold mt-4 dark:text-gray-50">{authUser?.email.match(/^([^@]*)@/)[1]}</Text>
        <Text className="text-gray-600 dark:text-gray-50">{authUser?.email}</Text>
      </View>

      <View className="mt-10 px-4">
        <Text className="text-lg font-bold mb-2 text-gray-600 dark:text-gray-50">About</Text>
        <Text className="text-gray-600 dark:text-gray-50">
          A brief description about the user's background and interests.
        </Text>
      </View>

      <View className="mt-10 px-4">
        <Text className="text-lg font-bold mb-2 text-gray-600 dark:text-gray-50">Contact</Text>
        <Text className="text-gray-600 dark:text-gray-50">Phone: (123) 456-7890</Text>
      </View>
      <View className="mt-10 px-4"
        onTouchEnd={() => {
         
          signOut(auth).then(() => {
            setAuthUser(null);
            console.log('User signed out!')});
          // router.push("/");
          router.back()
        }}
      >
<Text className={"font-bold text-red-500 "}>
          <FontAwesome
          name={'sign-out'}
          size={24}
        />   Sign Out</Text>
      </View>
      
      
    </View>
  );
}

export default Profile;