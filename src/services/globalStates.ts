import {create} from 'zustand';
import {IProductDTO} from '../models/types/product';

interface IInitialValuesState {
  productsSelected: IProductDTO[];
  valuesSearched: IProductDTO[];
}

const initialValues: IInitialValuesState = {
  productsSelected: [],
  valuesSearched: [],
};

const globalSessionState = create(() => initialValues);

export const GlobalStateService = {
  getProductsSelected() {
    return globalSessionState((state: any) => state.productsSelected);
  },

  getValuesSearched() {
    return globalSessionState((state: any) => state.valuesSearched);
  },

  setProductsSelected(productsSelected: IProductDTO[]) {
    globalSessionState.setState((prev: any) => ({
      ...prev,
      productsSelected,
    }));
  },

  setValuesSearched(valuesSearched: IProductDTO[]) {
    globalSessionState.setState((prev: any) => ({
      ...prev,
      valuesSearched,
    }));
  },

  getStateProductsSelected() {
    return globalSessionState.getState().productsSelected;
  },

  getStateValuesSearched() {
    return globalSessionState.getState().valuesSearched;
  },
};
