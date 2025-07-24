import { Feather } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import React, { JSX, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { captureRef } from 'react-native-view-shot';

export default function ShareNews({ news }: {
  news: any
}): JSX.Element {
  const viewRef = useRef<View>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const remoteImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Example.jpg/320px-Example.jpg';

  const shareCombinedImage = async () => {
    if (!imageLoaded) {
      Alert.alert('Wait', 'Image is still loading.');
      return;
    }

    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      await Sharing.shareAsync(uri);
    } catch (err) {
      console.error('Sharing failed:', err);
      Alert.alert('Error', 'Failed to share image.');
    }
  };

  return (
    <View>

      {/* <Pressable className='h-48'
        style={[styles.button, !imageLoaded && { backgroundColor: '#ccc' }]}
        disabled={!imageLoaded}
        onPress={shareCombinedImage}
      >
        <Text style={styles.buttonText}>📤 Share Hidden Content</Text>
      </Pressable> */}

     <Pressable  className='px-2 py-1'  onPress={shareCombinedImage}>
                <Text className='text-gray-50 '><Feather  name="share-2" size={20}/></Text>
              </Pressable >
              

      {/* 🔒 Hidden View Only for Capture */}
      <View
        ref={viewRef}
        collapsable={false}
        style={styles.hiddenView}
      >
        <Image
          source={{ uri: news.image.image }}
          style={styles.image}
          onLoadEnd={() => setImageLoaded(true)}
          resizeMode="cover"
        />
        <Text className='text-gray-800 text-lg font-bold px-4'>{news.title}</Text>
        <Text className='text-gray-800 text-sm px-4 mb-8'>{news.description}</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  

  // Hidden but renderable view
  hiddenView: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    width: width - 40,
    padding: 0,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },

  image: {
    width: '100%',
    height: 160,
    marginBottom: 12,
  }
});
