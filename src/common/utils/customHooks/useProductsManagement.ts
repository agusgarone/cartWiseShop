import {useCallback, useState} from 'react';
import {IProductDTO} from '../../../models/types/product';
import {globalSessionState} from '../../../services/globalStates';

export const useProductsManagement = () => {
  const productsFromZustand = globalSessionState(
    state => state.productsSelected,
  );
  const [products, setProducts] = useState<IProductDTO[]>([]);
  const setProductsSelected = globalSessionState(
    state => state.setProductsSelected,
  );

  const syncWithZustand = useCallback(() => {
    setProducts(productsFromZustand);
    setProductsSelected(productsFromZustand);
  }, []);

  const removeProductSelected = (id: number) => {
    const productsFilter = products.filter(product => product.id !== id);
    setProducts(productsFilter);
    setProductsSelected(productsFilter);
  };

  const resetProducts = () => {
    setProducts([]);
    setProductsSelected([]);
  };

  const setProductsAndProductsSelected = (products: IProductDTO[]) => {
    setProducts(products);
    setProductsSelected(products);
  };

  return {
    products,
    setProducts,
    productsFromZustand,
    syncWithZustand,
    removeProductSelected,
    resetProducts,
    setProductsAndProductsSelected,
  };
};
