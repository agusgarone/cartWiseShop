import {IListSupabase} from '../models/types/list';
import {supabase} from '../services/supabase';

export const insertList = async (list: IListSupabase) => {
  const response = await supabase.from('lists').upsert([
    {
      id: list.id,
      created_at: list.created_at,
      name: list.name,
      color: list.color,
      id_products: list.id_products.map(Number),
      uid_user: await getUserUid(),
    },
  ]);

  return response;
};

export const deleteList = async (listId: number) => {
  const response = await supabase
    .from('lists')
    .delete()
    .eq('id', listId)
    .eq('uid_user', await getUserUid());

  return response;
};

export const getListById = async (data: {
  listId: number;
  categories: number[] | null;
}) => {
  const response = await supabase.rpc('get_list_by_id', {
    p_list_id: data.listId,
    p_uid_user: await getUserUid(),
    p_cat_ids: data.categories,
  });

  return response;
};

export const getLists = async () => {
  const response = await supabase.rpc(
    'get_lists_with_products_and_categories',
    {p_uid_user: await getUserUid()},
  );

  return response;
};

export const updateList = async (
  listId: number,
  values: {newName: string; newProducts: number[]; newColor: string},
) => {
  const response = await supabase
    .from('lists')
    .update({
      name: values.newName || undefined,
      id_products: values.newProducts || undefined,
      color: values.newColor || undefined,
    })
    .eq('id', listId);

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
