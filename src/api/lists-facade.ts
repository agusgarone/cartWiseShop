import {IListSupabase} from '../models/types/list';
import {supabase} from '../services/supabase';

export const insertList = async (list: IListSupabase, userUid: string) => {
  const response = await supabase.from('lists').upsert([
    {
      id: list.id,
      created_at: list.created_at,
      name: list.name,
      id_products: list.id_products,
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
  let response = await supabase
    .from('lists')
    .select('*')
    .eq('id', listId)
    .eq('uid_user', userUid);

  return response;
};

export const getLists = async (userUid: string) => {
  let response = await supabase
    .from('lists')
    .select('*')
    .eq('uid_user', userUid);

  return response;
};
