import {IProductDTO, IProductSupabase} from '../types/product';

export const mapperProductDTOToSupabase = (
  entry: IProductDTO,
): IProductSupabase => {
  return {
    id: entry.id,
    name: entry.name.toLowerCase(),
    id_category: entry.category.id,
  };
};

