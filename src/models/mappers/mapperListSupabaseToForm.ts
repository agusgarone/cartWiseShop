import moment from 'moment';
import {IListDTO} from '../types/list';
import {IProductForm} from '../types/product';

export const mapperListSupabaseToForm = (
  entry: {
    list_id: number;
    list_name: string;
    created_at: string;
    uid_user: string;
    product_data: Array<{
      id: string;
      name: string;
      id_category: string;
      category: string;
    }> | null;
  } | null,
): IListDTO<IProductForm> | null => {
  if (entry) {
    const listDTO: IListDTO<IProductForm> = {
      id: entry.list_id,
      name: entry.list_name,
      created_at: moment(entry.created_at).format('DD/MM/YYYY'),
      products:
        entry.product_data?.map(item => {
          const product: IProductForm = {
            category: {
              id: parseInt(item.id_category, 10),
              name: item.category,
            },
            id: parseInt(item.id, 10),
            name: item.name,
            isChecked: false,
          };
          return product;
        }) || [],
    };
    return listDTO;
  }
  return null;
};
