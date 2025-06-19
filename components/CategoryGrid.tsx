import { Link } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, TouchableOpacity } from 'react-native';



const Item = ({category}:{category:any}) => (
  
  <TouchableOpacity className="w-1/4 mt-8 items-center">
    {
     <Link
    className='mb-2'
        href={{
          pathname: "/(categories)/[id]",
          params: { id: category.name=="All"? 0 : category.id , name:'Latest News in '+ category.name, fromHome:Math.random()}
        }} key={category.id}>
     <Image className='w-[50] h-[50] rounded-full' source={{uri:"https://www.newspepperapp.in/uploads/category/"+category.image}} />
     </Link>
     }
     
    <Text className="text-gray-600 text-sm dark:text-gray-300">{category.name}</Text>
    
  </TouchableOpacity>
  
);

export function CategoryGrid({categories}:{
  categories:any
  
}) {

 const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
     setRefreshing(true);
     setTimeout(() => {
       setRefreshing(false);
     }, 1000);
   }, []);

    return  <FlatList
      className='flex justify-items-center mb-8'
        data={categories}
        renderItem={({item}) => <Item category={item} />}
        keyExtractor={item => item.id}
        numColumns={4}
          refreshControl={
                <RefreshControl refreshing={refreshing} 
                onRefresh={onRefresh} 
                />
              }
        
      />
    }



export default CategoryGrid;

