import moment from 'moment';
import {IListDTO} from '../types/list';
import {IProductDTO} from '../types/product';

// * Hay que revisar el tema de products en el objeto

export const mapperListsSupabaseToDTO = (
  entry: {
    list_id: string;
    created_at: string;
    list_name: string;
    product_data:
      | {
          id: string;
          name: string;
          id_category: string;
          category: string;
        }[]
      | null;
    uid_user: string;
  }[],
): IListDTO<IProductDTO>[] => {
  return entry.map(value => {
    const listDTO: IListDTO<IProductDTO> = {
      id: parseInt(value.list_id, 10),
      name: value.list_name,
      created_at: moment(value.created_at).format('DD/MM/YYYY'),
      products:
        value.product_data?.map(item => {
          const product: IProductDTO = {
            category: {
              id: parseInt(item.id_category, 10),
              name: item.category,
            },
            id: parseInt(item.id, 10),
            name: item.name,
          };
          return product;
        }) || [],
    };
    return listDTO;
  });
};
