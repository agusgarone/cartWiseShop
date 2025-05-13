import {
  deleteList,
  getListById,
  getLists,
  insertList,
  updateList,
} from '../api/lists-facade';
import {IListSupabase} from '../models/types/list';

export const createList = async (listData: IListSupabase) => {
  const responseInsertList = await insertList(listData);
  return responseInsertList;
};

export const removeList = async (listId: number) => {
  const responseDeleteList = await deleteList(listId);
  return responseDeleteList;
};

export const fetchListById = async (listId: number) => {
  const responsefetchListById = await getListById(listId);
  return responsefetchListById;
};

export const fetchLists = async () => {
  const responseFetchLists = await getLists();
  return responseFetchLists;
};

export const editList = async (
  listId: number,
  values: {newName: string; newProducts: number[]},
) => {
  const responseFetchLists = await updateList(listId, values);
  return responseFetchLists;
};
