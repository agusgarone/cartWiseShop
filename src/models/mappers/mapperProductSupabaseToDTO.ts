import {IProductDTO} from '../types/product';

// * Hay que revisar el tema de category en el objeto

export const mapperProductSupabaseToDTO = (
  entry: {id: number; name: string; id_category: number; uid_user: string}[],
): IProductDTO[] => {
  return entry.map(value => {
    const prodDTO: IProductDTO = {
      id: value.id,
      name: value.name,
      category: {
        id: value.id_category,
        name: 'prueba',
      },
    };
    return prodDTO;
  });
};
