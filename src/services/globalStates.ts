import {create} from 'zustand';
import {IProductDTO} from '../models/types/product';
import {IFilter} from '../models/types/filter';

interface IGlobalState {
  productsSelected: IProductDTO[];
  valuesSearched: IProductDTO[];
  filters: IFilter;
  setProductsSelected: (products: IProductDTO[]) => void;
  setValuesSearched: (products: IProductDTO[]) => void;
  setFilters: (filters: IFilter) => void;
}

export const globalSessionState = create<IGlobalState>(set => ({
  productsSelected: [],
  valuesSearched: [],
  filters: {nameFilter: null, category: null},
  setProductsSelected: products => set({productsSelected: products}),
  setValuesSearched: products => set({valuesSearched: products}),
  setFilters: filters => set({filters: filters}),
}));
