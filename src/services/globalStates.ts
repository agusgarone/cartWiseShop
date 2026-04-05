import {create} from 'zustand';
import {
  DEFAULT_FILTERS_LIST,
  IFilterListDetail,
} from '../models/types/filter';

interface IGlobalState {
  filtersList: IFilterListDetail;
  setFiltersList: (filters: IFilterListDetail) => void;
}

export const globalSessionState = create<IGlobalState>(set => ({
  filtersList: DEFAULT_FILTERS_LIST,
  setFiltersList: filters => set({filtersList: filters}),
}));
