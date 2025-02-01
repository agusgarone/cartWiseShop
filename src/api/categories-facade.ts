import {supabase} from '../services/supabase';

export const getCategories = async () => {
  let response = await supabase.from('categories').select('*');

  return response;
};
