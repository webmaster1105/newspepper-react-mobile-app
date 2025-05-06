import { Link } from 'expo-router';
import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';


const Item = ({category}:{category:any}) => (
  
  <View className="w-1/4 mt-8 items-center">
    {
    category.name!="All" && <Link
    className='mb-2'
        href={{
          pathname: "/(categories)/[id]",
          params: { id: category.id , name:'Latest News in '+ category.name}
        }} key={category.id}>
     <Image className='w-[70] h-[70] rounded-full' source={{uri:"https://www.newspepperapp.in/uploads/category/"+category.image}} />
     </Link>
     }
     {
    category.name=="All" && <Link
    className='mb-2'
        href="/(news)" key={category.id}>
     <Image className='w-[70] h-[70] rounded-full' source={{uri:"https://www.newspepperapp.in/uploads/category/"+category.image}} />
     </Link>
     }
    <Text >{category.name}</Text>
    
  </View>
  
);

const CategoryGrid = ({categories}:{
  categories:any
}) => (
      <FlatList
      className='flex justify-items-center'
        data={categories}
        renderItem={({item}) => <Item category={item} />}
        keyExtractor={item => item.id}
        numColumns={4}
      />
);



export default CategoryGrid;