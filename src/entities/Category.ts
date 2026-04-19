import {CategoriesStorage} from '../storage/storageHelpers';

export const fetchCategories = async () => {
  // Inicializar categorías por defecto si no existen
  await CategoriesStorage.initializeDefaultCategories();
  
  // Obtener categorías desde storage local
  const categories = await CategoriesStorage.getAllCategories();

  return {
    data: categories,
    error: null,
  };
};
