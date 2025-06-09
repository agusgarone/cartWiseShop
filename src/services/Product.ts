import {
  deleteProduct,
  getProducts,
  insertProduct,
} from '../api/products-facade';
import {IFilter} from '../models/types/filter';
import {IProductSupabase} from '../models/types/product';

export const createProduct = async (productData: IProductSupabase) => {
  const responseInsertProduct = await insertProduct(productData);
  return responseInsertProduct;
};

export const removeProduct = async (productId: number) => {
  const responseDeleteProduct = await deleteProduct(productId);
  return responseDeleteProduct;
};

export const fetchProducts = async (filters: IFilter) => {
  const responseGetProducts = await getProducts(filters);
  return responseGetProducts;
};
