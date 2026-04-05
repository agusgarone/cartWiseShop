export interface IFilterProducts {
  nameFilter: string | undefined | null;
  category: number | undefined | null;
  orderAsc: boolean;
}

export type ShowFilter = 'all' | 'pending' | 'purchased';

export type SortOption = 'az' | 'za' | 'recent';

export interface IFilterListDetail {
  splitByCategories: boolean;
  categories: number[] | null;
  orderAsc: boolean;
  sortOption: SortOption;
  showFilter: ShowFilter;
}

export const DEFAULT_FILTERS_LIST: IFilterListDetail = {
  splitByCategories: true,
  categories: null,
  orderAsc: true,
  sortOption: 'az',
  showFilter: 'all',
};
