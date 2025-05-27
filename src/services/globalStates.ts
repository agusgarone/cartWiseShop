import {create} from 'zustand';
import {IProductDTO} from '../models/types/product';

interface IGlobalState {
  productsSelected: IProductDTO[];
  valuesSearched: IProductDTO[];
  setProductsSelected: (products: IProductDTO[]) => void;
  setValuesSearched: (products: IProductDTO[]) => void;
}

export const globalSessionState = create<IGlobalState>(set => ({
  productsSelected: [],
  valuesSearched: [],
  setProductsSelected: products => set({productsSelected: products}),
  setValuesSearched: products => set({valuesSearched: products}),
}));
