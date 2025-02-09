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

// export const CreateList = async (list: IList<IProduct>) => {
//   const responseGetLists: IList<IProduct>[] = await StorageService.getItem(
//     'lists',
//   );
//   if (responseGetLists) {
//     const listExist = responseGetLists.find(value => value.name === list.name);
//     if (listExist) {
//       console.log('La lista ya existe');
//     } else {
//       const listsArray = [...responseGetLists, list];
//       await StorageService.setItem('lists', listsArray);
//     }
//   } else {
//     await StorageService.setItem('lists', [list]);
//   }
// };

// export const RemoveList = async (list: IList<IProduct>) => {
//   const responseGetLists: IList<IProduct>[] = await StorageService.getItem(
//     'lists',
//   );
//   const listsArray = responseGetLists.filter(value => value.name !== list.name);
//   await StorageService.setItem('lists', listsArray);
// };

// export const EditList = async (list: IList<IProduct>) => {
//   const responseGetLists: IList<IProduct>[] = await StorageService.getItem(
//     'lists',
//   );
//   const listsArray = responseGetLists.map(value => {
//     if (value.id === list.id) {
//       return list;
//     }
//     return value;
//   });
//   await StorageService.setItem('lists', listsArray);
// };

// export const getAllList = async function () {
//   const response: IList<IProduct>[] = await StorageService.getItem('lists');
//   return response;
// };

// export const getListByID = async function (id: number) {
//   const response: IList<IProduct>[] = await StorageService.getItem('lists');
//   const findList = response.find(it => it.id === id);
//   if (findList) {
//     return findList;
//   }
//   return null;
// };
