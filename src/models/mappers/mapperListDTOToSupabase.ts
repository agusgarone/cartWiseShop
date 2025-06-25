import {IListDTO, IListSupabase} from '../types/list';
import {IProductDTO} from '../types/product';

export const mapperListDTOToSupabase = (
  entry: IListDTO<IProductDTO>,
): IListSupabase => {
  return {
    ...entry,
    id_products: entry.products.map(value => value.id),
  };
};
