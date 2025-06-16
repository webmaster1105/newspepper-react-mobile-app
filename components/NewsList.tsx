import { getDomain, showTimeAgo } from '@/scripts/utilities';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { ThemedText } from './ThemedText';

const Item = ({news}:{news:any}) => (
  
  <View className="flex flex-row mb-4">
              {news.image &&  <Image  className="w-1/4 h-auto" source={{uri:news.image.image}} />}
               <View className="pl-4 pr-1 py-0 w-3/4">
               <ThemedText type="subtitle" className="">{news.title}</ThemedText>
             
             
            
  
             {
             news.source_link && 
             
                              <Text
                              className="dark:text-gray-100"
                              onTouchEnd={() => {
                                      router.push(
                                        {
                                          pathname:"/(tabs)/(news)/source",
                                          params: { 
                                            url: news.source_link
                                          }
                                        }
                                        );
                                    }}
                              
                              >{showTimeAgo(news.created_at) + " | "+getDomain(news.source_link) }
                              
                              </Text>
                                 
  
                                
  }
                                  
             </View>
       
             </View>
  
);



export function NewsList({baseUrl}:{
    baseUrl:string
}) {

const [isLoading,setIsLoading] = useState(true)

  const fetchData = async (url:string) => {
    try {
      const response = await axios.get(url);

      setBlogs(response.data.data.data);
      setNextPageUrl(response.data.data.next_page_url);
      setIsLoading(false);
     // Sharing.shareAsync(url)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const paginateData = async (url:string) => {
    try {
      const response = await axios.get(url);

      setBlogs([...blogs, ...response.data.data.data]);
      setNextPageUrl(response.data.data.next_page_url);
     // Sharing.shareAsync(url)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const [blogs,setBlogs] = useState([]);
  const [nextPageUrl,setNextPageUrl] = useState(baseUrl);
     useFocusEffect(
        useCallback(() => {
          // Reset state when screen is focused
          setIsLoading(true);
          fetchData(baseUrl);
    
          // Optional: cleanup when screen is unfocused
          return () => {
            setBlogs([]);
          };
        }, [baseUrl])
      );
      
  return (

<>
  { !isLoading &&   <FlatList
                   data={blogs} 
                   pagingEnabled
                   showsVerticalScrollIndicator={false}
                   onEndReached={()=>{if(nextPageUrl)paginateData(nextPageUrl)}}
                   onEndReachedThreshold={0.5}
                   keyExtractor={(item, index) => String(index)}
                   renderItem={({item, index})=>
                    {
                        return (
                        
                            <Item news={item} />
                           
                            
                            )
                    }
                   }/>
                  }
   {               
isLoading && <FlatList
                   data={[1,2,3,4,5,6,7,8,9,10]} 

                   renderItem={({item, index})=>
                    {
                        return (
                        
                            <>
                            <View className="opacity-30 flex flex-row mb-4" >
                            <View className="bg-gray-500 opacity-30 w-1/4 h-[100]"></View>
<View className="opacity-30 mx-4 h-[100] w-3/4">
<View className="bg-gray-500 opacity-30 mx-4 h-[10] my-2"></View>
<View className="bg-gray-500 opacity-30 mx-4 h-[10] my-2"></View>
<View className="bg-gray-500 opacity-30 mx-4 h-[10] my-2"></View>
</View>

                            </View>

                            </>
                           
                            
                            )
                    }
                   }

/>
                

                  }

                  </>
    
  )
}
