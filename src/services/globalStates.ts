import {create} from 'zustand';
import {IProductDTO} from '../models/types/product';
import {IFilterListDetail, IFilterProducts} from '../models/types/filter';

interface IGlobalState {
  productsSelected: IProductDTO[];
  valuesSearched: IProductDTO[];
  filtersProducts: IFilterProducts;
  filtersListDetail: IFilterListDetail;
  setProductsSelected: (products: IProductDTO[]) => void;
  setValuesSearched: (products: IProductDTO[]) => void;
  setFiltersProducts: (filters: IFilterProducts) => void;
  setFiltersListDetail: (filters: IFilterListDetail) => void;
}

export const globalSessionState = create<IGlobalState>(set => ({
  productsSelected: [],
  valuesSearched: [],
  filtersProducts: {nameFilter: null, category: null, orderAsc: true},
  filtersListDetail: {splitByCategories: true, category: null, orderAsc: true},
  setProductsSelected: products => set({productsSelected: products}),
  setValuesSearched: products => set({valuesSearched: products}),
  setFiltersProducts: filters => set({filtersProducts: filters}),
  setFiltersListDetail: filters => set({filtersListDetail: filters}),
}));
