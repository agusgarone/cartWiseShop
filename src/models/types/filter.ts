export interface IFilterProducts {
  nameFilter: string | undefined | null;
  category: number | undefined | null;
  orderAsc: boolean;
}

export interface IFilterListDetail {
  splitByCategories: boolean;
  categories: number[] | undefined | null;
  orderAsc: boolean;
}
