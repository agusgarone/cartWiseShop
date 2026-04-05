import React from 'react';
import {ICategoryFilter} from '../../models/types/category';
import {IProductForm} from '../../models/types/product';
import {FilterDrawerPanel} from './Components/FilterDrawer';

export const CustomDrawerContent = ({
  closeDrawer,
  productsCategories,
  products,
  isOpen,
}: {
  closeDrawer: () => void;
  productsCategories: ICategoryFilter[] | null;
  products: IProductForm[];
  isOpen: boolean;
}) => {
  if (!productsCategories?.length) {
    return null;
  }

  return (
    <FilterDrawerPanel
      closeDrawer={closeDrawer}
      products={products}
      productsCategories={productsCategories}
      isOpen={isOpen}
    />
  );
};
