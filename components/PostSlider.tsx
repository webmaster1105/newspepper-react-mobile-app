import { Text, View,Image, ScrollView ,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { ThemedText } from './ThemedText'

export function PostSlider({blogs}:{
    blogs:any
}) {
  
    return (
      <ScrollView horizontal={true} style={{marginTop:10,marginBottom:35}}>
        {
          blogs.map((blog:any)=>{
            return  <View key={blog.id} style={{height:200, marginRight:15,
              width:300}}>
               
            <Image  source={{uri:blog.image.image}} style={styles.card}/>
            <ThemedText type='defaultSemiBold' 
            style={{position: 'absolute', fontSize: 20, bottom:0,opacity:.8, padding:15}}
            className='dark:bg-gray-800 bg-gray-50'
            >{blog.title}</ThemedText>
           
            </View>
          })
        }
         
          
         
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    
    card:{
      height:200,
      width:300,
      marginRight:10
    },
    input:{},
    cardSm:{
      height:70,
      width:70,
      borderRadius:35,
      margin:"auto",
      alignItems: 'center',
          justifyContent: 'center'
      
      // borderWidth:1,
      // borderColor:"#ccc"
    }
  });

export default PostSlider