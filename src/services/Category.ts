import {getCategories} from '../api/categories-facade';

export const fetchCategories = async () => {
  const responseFetchCategories = await getCategories();

  if (responseFetchCategories.data) {
    responseFetchCategories.data.sort((a, b) => a.name.localeCompare(b.name));
  }

  return responseFetchCategories;
};
