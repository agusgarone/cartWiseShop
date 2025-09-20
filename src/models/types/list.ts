import {IProductForm} from './product';

export interface IListSupabase {
  id: number;
  created_at: string;
  name: string;
  id_products: number[];
  color: string;
}

export interface IListDTO<T> {
  id: number;
  created_at: string;
  name: string;
  products: T[];
  color: string;
}

export interface IListForm<T> {
  id: number;
  created_at: string;
  name: string;
  data: T[];
}

export interface ITab {
  categoria: string;
  products: IProductForm[];
}
