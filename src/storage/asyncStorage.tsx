import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  // Función para guardar un valor en AsyncStorage
  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
  },

  // Función para obtener un valor de AsyncStorage
  async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener de AsyncStorage:', error);
      return null;
    }
  },

  // Función para eliminar un valor de AsyncStorage
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar de AsyncStorage:', error);
    }
  },
};
