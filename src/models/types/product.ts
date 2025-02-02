import {ICategory} from './category';

export interface IProductSupabase {
  id: number;
  name: string;
  id_category: number;
}

export interface IProductDTO {
  id: number;
  name: string;
  category: ICategory;
}

export interface IProductForm extends IProductDTO {
  isChecked: boolean;
}
