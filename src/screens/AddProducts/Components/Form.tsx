import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';

import {FormikInputValue} from '../../../components/FormikInput';
import {useTranslation} from 'react-i18next';

const initialValues = {
  textSearched: '',
};

const BottomSheetForm = ({
  handleFormikSubmit,
}: {
  handleFormikSubmit: (values: {textSearched: string}) => Promise<void>;
}) => {
  const {t} = useTranslation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFormikSubmit({textSearched: query});
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormikSubmit}>
      {({handleSubmit}) => {
        return (
          <View style={styles.form}>
            <FormikInputValue
              name="textSearched"
              placeholder={t('addProducts.inputPlaceHolder')}
              onChange={value => handleInputChange(value)}
            />
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingTop: 16,
    width: '100%',
    alignItems: 'center',
  },
});

export default BottomSheetForm;
