import {IProductDTO} from '../types/product';

export const mapperProductSupabaseToDTO = (
  entry: {
    id: string;
    name: string;
    id_category: string;
    category_name: string;
    uid_user: string | null;
  }[],
): IProductDTO[] => {
  return entry.map(value => {
    const prodDTO: IProductDTO = {
      id: parseInt(value.id, 10),
      name: value.name,
      category: {
        id: parseInt(value.id_category, 10),
        name: value.category_name,
      },
      default: !value.uid_user,
    };
    return prodDTO;
  });
};
