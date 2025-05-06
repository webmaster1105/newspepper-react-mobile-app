import { News } from '@/components/News';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';


export function NewsScrollView({baseUrl}:{
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

      setBlogs(blogs.concat(response.data.data.data));
      setNextPageUrl(response.data.data.next_page_url);
     // Sharing.shareAsync(url)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const [blogs,setBlogs] = useState([]);
  const [nextPageUrl,setNextPageUrl] = useState(baseUrl);
    useEffect(() => {
      setIsLoading(true);
      fetchData(baseUrl);
    }, [baseUrl]);
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
                        return <News news={item} />
                            
                    }
                   }/>
                  }
   {               
isLoading && <><View className="bg-gray-500 opacity-30 w-full h-[200] mb-4 " ></View>
<View className="bg-gray-500 opacity-30 mx-4 h-[10]"></View>
<View className="bg-gray-500 opacity-30 mx-4 h-[10] w-3/4 my-2"></View>
<View className="bg-gray-500 opacity-30 mx-4 h-[150] my-2"></View>
</>}
                

</>
    
  )
}
