import {
  deleteProduct,
  getProducts,
  insertProduct,
  checkProductExists,
} from '../api/products-facade';
import {IFilterProducts} from '../models/types/filter';
import {IProductSupabase} from '../models/types/product';

export const createProduct = async (productData: IProductSupabase) => {
  const responseInsertProduct = await insertProduct(productData);
  return responseInsertProduct;
};

export const removeProduct = async (productId: number) => {
  const responseDeleteProduct = await deleteProduct(productId);
  return responseDeleteProduct;
};

export const fetchProducts = async (filters: IFilterProducts) => {
  const responseGetProducts = await getProducts(filters);
  return responseGetProducts;
};

export const verifyProductExists = async (productName: string) => {
  const responseCheckProduct = await checkProductExists(productName);
  return responseCheckProduct;
};
