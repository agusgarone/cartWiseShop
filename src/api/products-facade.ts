import {IProductSupabase} from '../models/types/product';
import {supabase} from '../services/supabase';

export const insertProduct = async (
  product: IProductSupabase,
  userUid: string,
) => {
  const response = await supabase.from('products').upsert([
    {
      id: product.id,
      name: product.name,
      id_category: product.id_category,
      uid_user: userUid,
    },
  ]);

  return response;
};

export const deleteProduct = async (productId: number, userUid: string) => {
  const response = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('uid_user', userUid);

  return response;
};

export const getProducts = async (
  filters: {
    idCategory: number;
    name: string;
  },
  uidUser: string,
) => {
  let response = await supabase.rpc('get_products', {
    p_uid_user: uidUser,
    p_name: filters?.name,
    p_id_category: filters?.idCategory,
  });

  return response;
};
