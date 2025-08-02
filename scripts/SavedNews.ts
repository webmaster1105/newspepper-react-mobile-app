// utils/storageUtil.ts
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = 'MY_SAVED_NEWS';

export const SavedNews = {
  async addOrRemoveItem(item: any): Promise<boolean> {
    try {
      
      const exists = await SavedNews.itemExists(item.id)
      if (!exists) {
        const existingList = await SavedNews.getList();
        const updatedList = [item,...existingList];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        return true
      } else {
        //delete item
        await SavedNews.deleteItemById(item.id);
        return false
      }
    } catch (e) {
      console.error('Error adding item to storage:', e);
      return false;
    }
  },

  async getList(): Promise<any[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading list from storage:', e);
      return [];
    }
  },

  async deleteItemById(id: string | number): Promise<void> {
    try {
      const existingList = await SavedNews.getList();
      const updatedList = existingList.filter(item => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Error deleting item from storage:', e);
    }
  },

  async deleteList(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error deleting list from storage:', e);
    }
  },

  async itemExists(id: string | number): Promise<boolean> {
    try {
      const existingList = await SavedNews.getList();
      return existingList.some(item => item.id === id);
    } catch (e) {
      console.error('Error checking item existence in storage:', e);
      return false;
    }
  }
};
