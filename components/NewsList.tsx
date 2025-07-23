import { getDomain, showTimeAgo } from '@/scripts/utilities';
import { RootState } from '@/store';
import { fetchNews, fetchNewsNextPage } from '@/store/NewsSlice';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoData from './NoData';
import { ThemedText } from './ThemedText';

const Item = ({news}:{news:any}) => (
  
  <View className="flex flex-row mb-4">
              {news.image &&  <Image  className="w-1/4 h-auto" source={{uri:news.image.image}} />}
               <View className="pl-4 pr-1 py-0 w-3/4">
               <ThemedText  className="text-lg font-semibold">{news.title}</ThemedText>
             
             
            
  
             {
             news.source_link && 
             
                              <Text
                              className="dark:text-gray-100 text-sm"
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



export function NewsList({url}:{url:string}) {

const [isLoading,setIsLoading] = useState(true)
const news = useSelector((state: RootState) => state.news)
const dispatch = useDispatch();
const [refreshing, setRefreshing] = useState(false);

useEffect(() => {
   dispatch(fetchNews(url))
  }, [url]);

  


 const handleRefresh = useCallback(() => {
      setRefreshing(true);
      // fetchData(url);
  dispatch(fetchNews(url))
      // Simulate fetching new data (e.g., from API)
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);


  const [blogs,setBlogs] = useState([]);
    //  useFocusEffect(
    //     useCallback(() => {
    //       // Reset state when screen is focused
    //       setIsLoading(true);
    //       fetchData(baseUrl);
    
    //       // Optional: cleanup when screen is unfocused
    //       return () => {
    //         setBlogs([]);
    //       };
    //     }, [baseUrl])
    //   );
      
  return (

<>
  { !news.loading &&   <FlatList
                   data={news.items} 
                   pagingEnabled
                   decelerationRate="fast"
        snapToAlignment="start"
                   showsVerticalScrollIndicator={false}
                  //  onEndReached={()=>{if(nextPageUrl)paginateData(nextPageUrl)}}
                   onEndReached={() => { if (news.nextPageUrl) dispatch(fetchNewsNextPage(news.nextPageUrl)) }}
                   onEndReachedThreshold={0.6}
                   keyExtractor={(item, index) => String(index)}
                   ListEmptyComponent={<NoData/>}
                   refreshControl={
                             <RefreshControl refreshing={refreshing}
                               onRefresh={()=> handleRefresh}
                             />
                           }
                   renderItem={({item, index})=>
                    {
                        return (
                         <Pressable  onPress={ () =>  router.push({
          pathname: "/(tabs)/(categories)/[id]",
          params: { id:0, searchURL:url, index:index,fromHome:Math.random()}
        })
        }>
                          <Item news={item} />
                         </Pressable >
                           
                           
                            
                            )
                    }
                   }/>
                  }
   {               
news.loading && <FlatList
                   data={[1,2,3,4,5,6,7,8,9,10]} 

                   renderItem={({item, index})=>
                    {
                        return (
                        
                            <>
                            <View className="opacity-70 flex flex-row mb-4" >
                            <View className="bg-gray-300 opacity-70 w-1/4 h-[100]"></View>
<View className="opacity-70 mx-4 h-[100] w-3/4">
<View className="bg-gray-300 opacity-70 mx-4 h-[10] my-2"></View>
<View className="bg-gray-300 opacity-70 mx-4 h-[10] my-2"></View>
<View className="bg-gray-300 opacity-70 mx-4 h-[10] my-2"></View>
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
