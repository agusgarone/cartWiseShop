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
  default: boolean;
  /** Producto aún no guardado en el catálogo (voz → crear lista); se persiste al guardar la lista. */
  isNewToCatalog?: boolean;
}

export interface IProductForm extends IProductDTO {
  isChecked: boolean;
}
