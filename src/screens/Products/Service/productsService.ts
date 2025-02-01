import {deleteProduct, getProducts, insertProduct} from '../Api/facade';

export const createProduct = async (productData: any, userUid: string) => {
  const responseInsertProduct = await insertProduct(productData, userUid);
  return responseInsertProduct;
};

export const removeProduct = async (productId: number, userUid: string) => {
  const responseDeleteProduct = await deleteProduct(productId, userUid);
  return responseDeleteProduct;
};

export const fetchProducts = async (filters: any) => {
  const responseGetProducts = await getProducts(filters);
  return responseGetProducts;
};
