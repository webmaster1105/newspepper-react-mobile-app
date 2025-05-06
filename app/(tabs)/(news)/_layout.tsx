import { Stack } from 'expo-router';


export default function PostLayout() {
  

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title:'Latest News' }} />

        <Stack.Screen  name="source" options={{ headerShown: false, title:"" }}  /> 
             
      </Stack>
  );
}
