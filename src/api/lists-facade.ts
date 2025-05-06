import {IListSupabase} from '../models/types/list';
import {supabase} from '../services/supabase';

export const insertList = async (list: IListSupabase, userUid: string) => {
  const response = await supabase.from('lists').upsert([
    {
      id: list.id,
      created_at: list.created_at,
      name: list.name,
      id_products: list.id_products.map(Number),
      uid_user: userUid,
    },
  ]);

  return response;
};

export const deleteList = async (listId: number, userUid: string) => {
  const response = await supabase
    .from('lists')
    .delete()
    .eq('id', listId)
    .eq('uid_user', userUid);

  return response;
};

export const getListById = async (listId: number, userUid: string) => {
  const response = await supabase.rpc('get_list_by_id', {
    p_list_id: listId,
    p_uid_user: userUid,
  });

  return response;
};

export const getLists = async (userUid: string) => {
  const response = await supabase.rpc(
    'get_lists_with_products_and_categories',
    {p_uid_user: userUid},
  );

  // const response = await supabase.from('lists').select('*');

  return response;
};

export const updateList = async (
  listId: number,
  values: {newName: string; newProducts: number[]},
) => {
  const response = await supabase
    .from('lists')
    .update({
      name: values.newName || undefined, // Solo actualiza si se proporciona
      id_products: values.newProducts || undefined, // Solo actualiza si se proporciona
    })
    .eq('id', listId);

  return response;
};
