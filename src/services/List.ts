import {
  deleteList,
  getListById,
  getLists,
  insertList,
  updateList,
} from '../api/lists-facade';
import {IListSupabase} from '../models/types/list';

export const createList = async (listData: IListSupabase, userUid: string) => {
  const responseInsertList = await insertList(listData, userUid);
  return responseInsertList;
};

export const removeList = async (listId: number, userUid: string) => {
  const responseDeleteList = await deleteList(listId, userUid);
  return responseDeleteList;
};

export const fetchListById = async (listId: number, userUid: string) => {
  const responsefetchListById = await getListById(listId, userUid);
  return responsefetchListById;
};

export const fetchLists = async (userUid: string) => {
  const responseFetchLists = await getLists(userUid);
  return responseFetchLists;
};

export const editList = async (
  listId: number,
  values: {newName: string; newProducts: number[]},
) => {
  const responseFetchLists = await updateList(listId, values);
  return responseFetchLists;
};
