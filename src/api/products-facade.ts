import {IFilterProducts} from '../models/types/filter';
import {IProductSupabase} from '../models/types/product';
import {supabase} from '../services/supabase';

export const insertProduct = async (product: IProductSupabase) => {
  const response = await supabase.from('products').upsert([
    {
      id: product.id,
      name: product.name,
      id_category: product.id_category,
      uid_user: await getUserUid(),
    },
  ]);

  return response;
};

export const deleteProduct = async (productId: number) => {
  const response = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('uid_user', await getUserUid());

  return response;
};

export const getProducts = async (filters: IFilterProducts) => {
  let response = await supabase.rpc('get_products', {
    p_uid_user: await getUserUid(),
    p_name: filters?.nameFilter || null,
    p_id_category: filters?.category || null,
    p_order_asc: filters?.orderAsc,
  });

  return response;
};

const getUserUid = async () => {
  const {data: session} = await supabase.auth.getSession();

  const userUid = session?.session?.user?.id;

  if (!userUid) {
    throw new Error('No hay usuario autenticado');
  }
  return userUid;
};
