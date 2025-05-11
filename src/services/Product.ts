import {
  deleteProduct,
  getProducts,
  insertProduct,
} from '../api/products-facade';
import {IProductSupabase} from '../models/types/product';

export const createProduct = async (productData: IProductSupabase) => {
  const responseInsertProduct = await insertProduct(productData);
  return responseInsertProduct;
};

export const removeProduct = async (productId: number, userUid: string) => {
  const responseDeleteProduct = await deleteProduct(productId, userUid);
  return responseDeleteProduct;
};

export const fetchProducts = async (filters: any, uidUser: string) => {
  const responseGetProducts = await getProducts(filters, uidUser);
  return responseGetProducts;
};
