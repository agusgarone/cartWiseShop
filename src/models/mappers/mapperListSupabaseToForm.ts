import moment from 'moment';
import {IListDTO} from '../types/list';
import {IProductForm} from '../types/product';
import {capitalizeFirstLetter} from '../../common/utils/functions/capitalizeFirstLetter';

export const mapperListSupabaseToForm = (entry: {
  list_id: number;
  list_name: string;
  created_at: string;
  uid_user: string;
  color: string;
  product_data: Array<{
    id: string;
    name: string;
    id_category: number;
    category: string;
  }> | null;
}): IListDTO<IProductForm> => {
  const listDTO: IListDTO<IProductForm> = {
    id: entry.list_id,
    name: entry.list_name,
    created_at: moment(entry.created_at).format('DD/MM/YYYY'),
    color: entry.color,
    products:
      entry.product_data?.map(item => {
        const product: IProductForm = {
          category: {
            id: item.id_category,
            name: item.category,
          },
          default: !entry.uid_user,
          id: parseInt(item.id, 10),
          name: capitalizeFirstLetter(item.name),
          isChecked: false,
        };
        return product;
      }) || [],
  };
  return listDTO;
};
