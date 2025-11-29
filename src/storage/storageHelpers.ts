import {StorageService} from './asyncStorage';
import {IListSupabase, IListDTO} from '../models/types/list';
import {IProductSupabase, IProductDTO} from '../models/types/product';
import {ICategory} from '../models/types/category';

// ========== CONSTANTES PARA LAS CLAVES DE STORAGE ==========
const STORAGE_KEYS = {
  LISTS: 'lists',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
} as const;

// ========== CATEGORÍAS POR DEFECTO ==========
const DEFAULT_CATEGORIES: ICategory[] = [
  {id: 1, name: 'Frutas y Verduras'},
  {id: 2, name: 'Carnes y Pescados'},
  {id: 3, name: 'Lácteos y Huevos'},
  {id: 4, name: 'Panadería y Pastelería'},
  {id: 5, name: 'Bebidas'},
  {id: 6, name: 'Limpieza'},
  {id: 7, name: 'Higiene Personal'},
  {id: 8, name: 'Despensa'},
  {id: 9, name: 'Congelados'},
  {id: 10, name: 'Otros'},
];

// ========== HELPERS PARA LISTAS ==========

export const ListsStorage = {
  /**
   * Obtener todas las listas almacenadas localmente
   */
  async getAllLists(): Promise<IListSupabase[]> {
    return await StorageService.getAllItems<IListSupabase>(STORAGE_KEYS.LISTS);
  },

  /**
   * Obtener una lista específica por ID
   */
  async getListById(id: number): Promise<IListSupabase | null> {
    return await StorageService.getItemById<IListSupabase>(
      STORAGE_KEYS.LISTS,
      id,
    );
  },

  /**
   * Guardar o actualizar una lista
   * Si la lista ya existe (mismo ID), la actualiza
   * Si no existe, la crea
   */
  async saveList(list: IListSupabase): Promise<IListSupabase> {
    return await StorageService.addItem<IListSupabase>(
      STORAGE_KEYS.LISTS,
      list,
    );
  },

  /**
   * Actualizar una lista existente
   */
  async updateList(
    id: number,
    updates: Partial<IListSupabase>,
  ): Promise<IListSupabase | null> {
    return await StorageService.updateItem<IListSupabase>(
      STORAGE_KEYS.LISTS,
      id,
      updates,
    );
  },

  /**
   * Eliminar una lista por ID
   */
  async deleteList(id: number): Promise<boolean> {
    return await StorageService.removeItemById(STORAGE_KEYS.LISTS, id);
  },

  /**
   * Eliminar múltiples listas por IDs
   */
  async deleteLists(ids: number[]): Promise<number> {
    let deletedCount = 0;
    for (const id of ids) {
      const deleted = await this.deleteList(id);
      if (deleted) deletedCount++;
    }
    return deletedCount;
  },

  /**
   * Obtener múltiples listas por IDs
   */
  async getListsByIds(ids: number[]): Promise<IListSupabase[]> {
    return await StorageService.getItemsByIds<IListSupabase>(
      STORAGE_KEYS.LISTS,
      ids,
    );
  },

  /**
   * Limpiar todas las listas almacenadas
   */
  async clearAllLists(): Promise<void> {
    await StorageService.clearCollection(STORAGE_KEYS.LISTS);
  },

  /**
   * Sincronizar múltiples listas (útil para cargar desde el servidor)
   */
  async syncLists(lists: IListSupabase[]): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.LISTS, lists);
  },
};

// ========== HELPERS PARA PRODUCTOS ==========

export const ProductsStorage = {
  /**
   * Obtener todos los productos almacenados localmente
   */
  async getAllProducts(): Promise<IProductSupabase[]> {
    return await StorageService.getAllItems<IProductSupabase>(
      STORAGE_KEYS.PRODUCTS,
    );
  },

  /**
   * Obtener un producto específico por ID
   */
  async getProductById(id: number): Promise<IProductSupabase | null> {
    return await StorageService.getItemById<IProductSupabase>(
      STORAGE_KEYS.PRODUCTS,
      id,
    );
  },

  /**
   * Guardar o actualizar un producto
   * Si el producto ya existe (mismo ID), lo actualiza
   * Si no existe, lo crea
   */
  async saveProduct(product: IProductSupabase): Promise<IProductSupabase> {
    return await StorageService.addItem<IProductSupabase>(
      STORAGE_KEYS.PRODUCTS,
      product,
    );
  },

  /**
   * Actualizar un producto existente
   */
  async updateProduct(
    id: number,
    updates: Partial<IProductSupabase>,
  ): Promise<IProductSupabase | null> {
    return await StorageService.updateItem<IProductSupabase>(
      STORAGE_KEYS.PRODUCTS,
      id,
      updates,
    );
  },

  /**
   * Eliminar un producto por ID
   */
  async deleteProduct(id: number): Promise<boolean> {
    return await StorageService.removeItemById(STORAGE_KEYS.PRODUCTS, id);
  },

  /**
   * Eliminar múltiples productos por IDs
   */
  async deleteProducts(ids: number[]): Promise<number> {
    let deletedCount = 0;
    for (const id of ids) {
      const deleted = await this.deleteProduct(id);
      if (deleted) deletedCount++;
    }
    return deletedCount;
  },

  /**
   * Obtener múltiples productos por IDs
   */
  async getProductsByIds(ids: number[]): Promise<IProductSupabase[]> {
    return await StorageService.getItemsByIds<IProductSupabase>(
      STORAGE_KEYS.PRODUCTS,
      ids,
    );
  },

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(categoryId: number): Promise<IProductSupabase[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(product => product.id_category === categoryId);
  },

  /**
   * Buscar productos por nombre
   */
  async searchProducts(searchTerm: string): Promise<IProductSupabase[]> {
    const allProducts = await this.getAllProducts();
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerSearchTerm),
    );
  },

  /**
   * Limpiar todos los productos almacenados
   */
  async clearAllProducts(): Promise<void> {
    await StorageService.clearCollection(STORAGE_KEYS.PRODUCTS);
  },

  /**
   * Sincronizar múltiples productos (útil para cargar desde el servidor)
   */
  async syncProducts(products: IProductSupabase[]): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.PRODUCTS, products);
  },
};

// ========== HELPERS PARA OPERACIONES COMBINADAS ==========

export const CombinedStorage = {
  /**
   * Obtener los productos de una lista específica
   */
  async getProductsFromList(listId: number): Promise<IProductSupabase[]> {
    const list = await ListsStorage.getListById(listId);
    if (!list || !list.id_products.length) {
      return [];
    }
    return await ProductsStorage.getProductsByIds(list.id_products);
  },

  /**
   * Agregar productos a una lista
   */
  async addProductsToList(
    listId: number,
    productIds: number[],
  ): Promise<IListSupabase | null> {
    const list = await ListsStorage.getListById(listId);
    if (!list) {
      return null;
    }

    // Combinar los IDs existentes con los nuevos (sin duplicados)
    const existingIds = list.id_products || [];
    const newIds = [...new Set([...existingIds, ...productIds])];

    return await ListsStorage.updateList(listId, {
      id_products: newIds,
    });
  },

  /**
   * Remover productos de una lista
   */
  async removeProductsFromList(
    listId: number,
    productIds: number[],
  ): Promise<IListSupabase | null> {
    const list = await ListsStorage.getListById(listId);
    if (!list) {
      return null;
    }

    const filteredIds = list.id_products.filter(id => !productIds.includes(id));

    return await ListsStorage.updateList(listId, {
      id_products: filteredIds,
    });
  },

  /**
   * Limpiar todo el almacenamiento (listas, productos y categorías)
   */
  async clearAll(): Promise<void> {
    await Promise.all([
      ListsStorage.clearAllLists(),
      ProductsStorage.clearAllProducts(),
      CategoriesStorage.clearAllCategories(),
    ]);
  },
};

// ========== HELPERS PARA CATEGORÍAS ==========

export const CategoriesStorage = {
  /**
   * Inicializar categorías por defecto si no existen
   */
  async initializeDefaultCategories(): Promise<void> {
    const existingCategories = await this.getAllCategories();
    if (existingCategories.length === 0) {
      await StorageService.setItem(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    }
  },

  /**
   * Obtener todas las categorías almacenadas localmente
   */
  async getAllCategories(): Promise<ICategory[]> {
    const categories = await StorageService.getAllItems<ICategory>(
      STORAGE_KEYS.CATEGORIES,
    );
    // Si no hay categorías, inicializar las por defecto
    if (categories.length === 0) {
      await this.initializeDefaultCategories();
      return DEFAULT_CATEGORIES;
    }
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Obtener una categoría específica por ID
   */
  async getCategoryById(id: number): Promise<ICategory | null> {
    return await StorageService.getItemById<ICategory>(
      STORAGE_KEYS.CATEGORIES,
      id,
    );
  },

  /**
   * Guardar o actualizar una categoría
   * Si la categoría ya existe (mismo ID), la actualiza
   * Si no existe, la crea
   */
  async saveCategory(category: ICategory): Promise<ICategory> {
    return await StorageService.addItem<ICategory>(
      STORAGE_KEYS.CATEGORIES,
      category,
    );
  },

  /**
   * Actualizar una categoría existente
   */
  async updateCategory(
    id: number,
    updates: Partial<ICategory>,
  ): Promise<ICategory | null> {
    return await StorageService.updateItem<ICategory>(
      STORAGE_KEYS.CATEGORIES,
      id,
      updates,
    );
  },

  /**
   * Eliminar una categoría por ID
   */
  async deleteCategory(id: number): Promise<boolean> {
    return await StorageService.removeItemById(STORAGE_KEYS.CATEGORIES, id);
  },

  /**
   * Obtener múltiples categorías por IDs
   */
  async getCategoriesByIds(ids: number[]): Promise<ICategory[]> {
    return await StorageService.getItemsByIds<ICategory>(
      STORAGE_KEYS.CATEGORIES,
      ids,
    );
  },

  /**
   * Limpiar todas las categorías almacenadas
   */
  async clearAllCategories(): Promise<void> {
    await StorageService.clearCollection(STORAGE_KEYS.CATEGORIES);
  },

  /**
   * Sincronizar múltiples categorías (útil para cargar desde el servidor)
   */
  async syncCategories(categories: ICategory[]): Promise<void> {
    await StorageService.setItem(STORAGE_KEYS.CATEGORIES, categories);
  },

  /**
   * Obtener el nombre de una categoría por su ID
   */
  async getCategoryNameById(id: number): Promise<string> {
    const category = await this.getCategoryById(id);
    return category?.name || 'Sin categoría';
  },

  /**
   * Obtener nombres de múltiples categorías por sus IDs
   */
  async getCategoryNamesByIds(ids: number[]): Promise<Map<number, string>> {
    const categories = await this.getCategoriesByIds(ids);
    const categoryMap = new Map<number, string>();
    categories.forEach(cat => {
      categoryMap.set(cat.id, cat.name);
    });
    return categoryMap;
  },
};
