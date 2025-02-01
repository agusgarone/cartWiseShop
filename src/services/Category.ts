import {getCategories} from '../api/categories-facade';

export const fetchCategories = async () => {
  const responseFetchCategories = await getCategories();
  return responseFetchCategories;
};
