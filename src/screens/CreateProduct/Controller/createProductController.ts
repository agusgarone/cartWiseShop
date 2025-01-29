import {useContext, useEffect, useState} from 'react';
import {IProduct} from '../../../models/product';
import {NavigationContext} from '@react-navigation/native';
import {FormikState} from 'formik';
import {FORM_STATUS} from '../../../common/utils/formStatus';
import {
  CreateProduct,
  EditProduct,
  getProductByID,
} from '../../../services/Product';
import {Alert, Keyboard} from 'react-native';
import {categories} from '../../../data-mock';

export const createProductController = (idProduct?: number | null) => {
  const navigation = useContext(NavigationContext);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [initialValues, setInitialValues] = useState<{
    name: string;
    category: number | undefined;
  }>({
    name: '',
    category: undefined,
  });

  useEffect(() => {
    navigation?.addListener('focus', () => {
      if (idProduct) {
        getProduct(idProduct);
      }
    });
  }, []);

  useEffect(() => {
    setInitialValues({
      name: product?.name || '',
      category: product?.categoria.id || undefined,
    });
  }, [product]);

  const handleFormikSubmit = async (
    values: {name: string; category: number | undefined},
    actions: {
      setStatus: (arg0: string) => void;
      setSubmitting: (arg0: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<any>>) => void;
    },
  ) => {
    actions.setStatus(FORM_STATUS.idle);
    if (values.name) {
      // * Se hizo la edicion pero despues decidí sacar es funcionalidad para que solo exista la baja y alta de productos
      // if (idProduct && product) {
      //   const editProduct: IProduct = {
      //     id: product?.id,
      //     name: values.name,
      //     categoria: categories.find(
      //       category => category.id === values.category,
      //     ) || {id: 1, name: 'Fruta'},
      //   };
      //   EditProduct(editProduct);
      // } else {
      const newProduct: IProduct = {
        id: Math.floor(Math.random() * 900000) + 100000,
        name: values.name,
        categoria: categories.find(
          category => category.id === values.category,
        ) || {id: 1, name: 'Fruta'},
      };
      await CreateProduct(newProduct);
      // }
      Keyboard.dismiss();
      actions.resetForm();
      navigation?.goBack();
    } else {
      Alert.alert(
        'Hubo un error al crear el producto, intentelo de nuevo por favor!',
      );
    }
  };

  const getProduct = async (id: number) => {
    const response = await getProductByID(id);
    setProduct(response);
  };

  const goBack = () => navigation?.goBack();

  return {
    handleFormikSubmit,
    goBack,
    initialValues,
  };
};
