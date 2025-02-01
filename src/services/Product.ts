import {
  deleteProduct,
  getProducts,
  insertProduct,
} from '../api/products-facade';
import {IProductDTO} from '../models/types/product';
// import {StorageService} from '../storage/asyncStorage';

export const createProduct = async (
  productData: IProductDTO,
  userUid: string,
) => {
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

// export const CreateProduct = async (product: IProduct) => {
//   const responseGetProducts: IProduct[] = await StorageService.getItem(
//     'products',
//   );
//   if (responseGetProducts) {
//     const productExist = responseGetProducts?.find(
//       value => value.name === product.name,
//     );
//     if (productExist) {
//       console.log('El producto ya existe');
//     } else {
//       const productsArray = [...responseGetProducts, product];
//       await StorageService.setItem('products', productsArray);
//     }
//   } else {
//     await StorageService.setItem('products', [product]);
//   }
// };

// export const RemoveProduct = async (product: IProduct) => {
//   const responseGetProducts: IProduct[] = await StorageService.getItem(
//     'products',
//   );
//   const productArray = responseGetProducts.filter(
//     value => value.name !== product.name,
//   );
//   await StorageService.setItem('products', productArray);
//   return productArray;
// };

// export const EditProduct = async (product: IProduct) => {
//   const responseGetProducts: IProduct[] = await StorageService.getItem(
//     'products',
//   );
//   const productArray = responseGetProducts.map(value => {
//     if (value.id === product.id) {
//       return product;
//     }
//     return value;
//   });
//   await StorageService.setItem('products', productArray);
// };

// export const getAllProducts = async function () {
//   const response: IProduct[] = await StorageService.getItem('products');
//   return response;
// };

// export const getProductByID = async function (id: number) {
//   const response: IProduct[] = await StorageService.getItem('products');
//   const findProduct = response.find(it => it.id === id);
//   if (findProduct) {
//     return findProduct;
//   }
//   return null;
// };
