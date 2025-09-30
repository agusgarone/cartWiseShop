import {Dispatch, SetStateAction} from 'react';
import {IListDTO, IListForm, ITab} from '../../../models/types/list';
import {IProductForm, IProductDTO} from '../../../models/types/product';
import {IFilterListDetail} from '../../../models/types/filter';
import {ICategoryFilter} from '../../../models/types/category';

interface IParseData {
  listSelected: IListDTO<IProductForm> | undefined;
  categories: ICategoryFilter[] | null;
  filters: IFilterListDetail;
  setListSelectedFormatted: Dispatch<
    SetStateAction<IListForm<ITab> | undefined>
  >;
}

export const parseData = ({
  listSelected,
  categories,
  filters,
  setListSelectedFormatted,
}: IParseData) => {
  if (listSelected && categories) {
    const newFormatArrayList: IListForm<ITab> = {
      id: listSelected?.id,
      created_at: listSelected?.created_at,
      name: listSelected?.name,
      data: [],
    };

    // Filtrar categorías si hay filtros aplicados
    const categoriesToShow =
      filters.categories && filters.categories.length > 0
        ? categories.filter(cat => filters.categories?.includes(cat.id))
        : categories;

    if (!filters.splitByCategories) {
      // Filtrar productos por categorías si hay filtros aplicados
      const filteredProducts =
        filters.categories && filters.categories.length > 0
          ? listSelected.products.filter(prod =>
              filters.categories?.includes(prod.category.id),
            )
          : listSelected.products;

      const tab: ITab = {
        categoria: 'default',
        products: filteredProducts,
      };
      newFormatArrayList.data = [tab];
    } else {
      const tabs: ITab[] = categoriesToShow.map(i => {
        const tab: ITab = {
          categoria: i.name,
          products: [],
        };
        return tab;
      });

      tabs.forEach(tab => {
        listSelected.products?.forEach(prod => {
          if (prod.category.name === tab.categoria) {
            tab.products.push(prod);
          }
        });
      });
      newFormatArrayList.data = tabs;
      sortCategories({list: newFormatArrayList, filters});
    }
    newFormatArrayList.data.forEach(tab => {
      sortProducts({products: tab.products, filters});
    });
    setListSelectedFormatted(newFormatArrayList);
  }
};

const sortProducts = ({
  products,
  filters,
}: {
  products: IProductForm[];
  filters: IFilterListDetail;
}) => {
  const productsValue = products;
  const isAsc = filters?.orderAsc ?? true;
  productsValue?.sort((a, b) =>
    isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );
  return productsValue;
};

const sortCategories = ({
  list,
  filters,
}: {
  list: IListForm<ITab>;
  filters: IFilterListDetail;
}) => {
  const listValue = list;
  const isAsc = filters?.orderAsc ?? true;
  listValue?.data.sort((a, b) =>
    isAsc
      ? a.categoria.localeCompare(b.categoria)
      : b.categoria.localeCompare(a.categoria),
  );
  return listValue;
};

// Nueva interfaz para parseDataForEdit
interface IParseDataForEdit {
  listSelected: IListDTO<IProductDTO> | undefined;
  categories: ICategoryFilter[] | null;
  filters: IFilterListDetail;
  setListSelectedFormatted: Dispatch<
    SetStateAction<IListForm<ITab> | undefined>
  >;
}

// Nueva función adaptada para editList que trabaja con IProductDTO
export const parseDataForEdit = ({
  listSelected,
  categories,
  filters,
  setListSelectedFormatted,
}: IParseDataForEdit) => {
  if (listSelected && categories) {
    const newFormatArrayList: IListForm<ITab> = {
      id: listSelected?.id,
      created_at: listSelected?.created_at,
      name: listSelected?.name,
      data: [],
    };

    // Filtrar categorías si hay filtros aplicados
    const categoriesToShow =
      filters.categories && filters.categories.length > 0
        ? categories.filter(cat => filters.categories?.includes(cat.id))
        : categories;

    if (!filters.splitByCategories) {
      // Filtrar productos por categorías si hay filtros aplicados
      const filteredProducts =
        filters.categories && filters.categories.length > 0
          ? listSelected.products.filter(prod =>
              filters.categories?.includes(prod.category.id),
            )
          : listSelected.products;

      // Convertir IProductDTO a IProductForm agregando isChecked: false
      const productsWithCheck: IProductForm[] = filteredProducts.map(prod => ({
        ...prod,
        isChecked: false,
      }));

      const tab: ITab = {
        categoria: 'default',
        products: productsWithCheck,
      };
      newFormatArrayList.data = [tab];
    } else {
      const tabs: ITab[] = categoriesToShow.map(i => {
        const tab: ITab = {
          categoria: i.name,
          products: [],
        };
        return tab;
      });

      tabs.forEach(tab => {
        listSelected.products?.forEach(prod => {
          if (prod.category.name === tab.categoria) {
            // Convertir IProductDTO a IProductForm agregando isChecked: false
            const productWithCheck: IProductForm = {
              ...prod,
              isChecked: false,
            };
            tab.products.push(productWithCheck);
          }
        });
      });
      newFormatArrayList.data = tabs;
      sortCategories({list: newFormatArrayList, filters});
    }

    newFormatArrayList.data.forEach(tab => {
      sortProducts({products: tab.products, filters});
    });
    setListSelectedFormatted(newFormatArrayList);
  }
};
