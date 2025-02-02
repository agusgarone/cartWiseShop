import {IListDTO} from '../types/list';
import {IProductDTO} from '../types/product';

// * Hay que revisar el tema de products en el objeto

export const mapperListSupabaseToDTO = (
  entry: {
    id: number;
    created_at: string;
    name: string;
    id_products: number[];
    uid_user: string;
  }[],
): IListDTO<IProductDTO>[] => {
  return entry.map(value => {
    const listDTO: IListDTO<IProductDTO> = {
      id: value.id,
      name: value.name,
      created_at: value.created_at,
      products: [],
    };
    return listDTO;
  });
};
