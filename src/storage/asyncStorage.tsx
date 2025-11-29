import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  // Función para guardar un valor en AsyncStorage
  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
      throw error;
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
      throw error;
    }
  },

  // ========== MÉTODOS PARA COLECCIONES (LISTAS Y PRODUCTOS) ==========

  // Obtener todos los items de una colección
  async getAllItems<T>(collectionKey: string): Promise<T[]> {
    try {
      const items = await this.getItem(collectionKey);
      return Array.isArray(items) ? items : [];
    } catch (error) {
      console.error(
        `Error al obtener todos los items de ${collectionKey}:`,
        error,
      );
      return [];
    }
  },

  // Agregar un item a una colección
  async addItem<T extends {id: number}>(
    collectionKey: string,
    item: T,
  ): Promise<T> {
    try {
      const items = await this.getAllItems<T>(collectionKey);
      const existingIndex = items.findIndex(i => i.id === item.id);

      if (existingIndex >= 0) {
        // Si ya existe, actualizarlo
        items[existingIndex] = item;
      } else {
        // Si no existe, agregarlo
        items.push(item);
      }

      await this.setItem(collectionKey, items);
      return item;
    } catch (error) {
      console.error(`Error al agregar item a ${collectionKey}:`, error);
      throw error;
    }
  },

  // Obtener un item específico por ID de una colección
  async getItemById<T extends {id: number}>(
    collectionKey: string,
    id: number,
  ): Promise<T | null> {
    try {
      const items = await this.getAllItems<T>(collectionKey);
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Error al obtener item por ID de ${collectionKey}:`, error);
      return null;
    }
  },

  // Actualizar un item específico en una colección
  async updateItem<T extends {id: number}>(
    collectionKey: string,
    id: number,
    updates: Partial<T>,
  ): Promise<T | null> {
    try {
      const items = await this.getAllItems<T>(collectionKey);
      const index = items.findIndex(item => item.id === id);

      if (index >= 0) {
        items[index] = {...items[index], ...updates} as T;
        await this.setItem(collectionKey, items);
        return items[index];
      }

      return null;
    } catch (error) {
      console.error(`Error al actualizar item en ${collectionKey}:`, error);
      throw error;
    }
  },

  // Eliminar un item específico de una colección
  async removeItemById(collectionKey: string, id: number): Promise<boolean> {
    try {
      const items = await this.getAllItems<any>(collectionKey);
      const filteredItems = items.filter(item => item.id !== id);

      if (filteredItems.length !== items.length) {
        await this.setItem(collectionKey, filteredItems);
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Error al eliminar item de ${collectionKey}:`, error);
      throw error;
    }
  },

  // Limpiar toda una colección
  async clearCollection(collectionKey: string): Promise<void> {
    try {
      await this.removeItem(collectionKey);
    } catch (error) {
      console.error(`Error al limpiar colección ${collectionKey}:`, error);
      throw error;
    }
  },

  // Obtener múltiples items por IDs
  async getItemsByIds<T extends {id: number}>(
    collectionKey: string,
    ids: number[],
  ): Promise<T[]> {
    try {
      const items = await this.getAllItems<T>(collectionKey);
      return items.filter(item => ids.includes(item.id));
    } catch (error) {
      console.error(
        `Error al obtener items por IDs de ${collectionKey}:`,
        error,
      );
      return [];
    }
  },
};
