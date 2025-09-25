import moment from 'moment';
import {IListDTO} from '../types/list';
import {IProductDTO} from '../types/product';

export const mapperListSupabaseToDTO = (
  entry: {
    list_id: number;
    list_name: string;
    color: string;
    created_at: string;
    uid_user: string;
    product_data: Array<{
      id: string;
      name: string;
      id_category: number;
      category: string;
    }> | null;
  } | null,
): IListDTO<IProductDTO> | null => {
  if (entry) {
    const listDTO: IListDTO<IProductDTO> = {
      id: entry.list_id,
      name: entry.list_name,
      color: entry.color,
      created_at: moment(entry.created_at).format('DD/MM/YYYY'),
      products:
        entry.product_data?.map(item => {
          const product: IProductDTO = {
            category: {
              id: item.id_category,
              name: item.category,
            },
            id: parseInt(item.id, 10),
            name: item.name,
            default: !entry.uid_user,
          };
          return product;
        }) || [],
    };
    return listDTO;
  }
  return null;
};
