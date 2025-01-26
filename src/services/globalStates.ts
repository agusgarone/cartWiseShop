import {create} from 'zustand';
import {IProduct} from '../models/product';

interface IInitialValuesState {
  productsSelected: IProduct[];
  valuesSearched: IProduct[];
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

  setProductsSelected(productsSelected: IProduct[]) {
    globalSessionState.setState((prev: any) => ({
      ...prev,
      productsSelected,
    }));
  },

  setValuesSearched(valuesSearched: IProduct[]) {
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
