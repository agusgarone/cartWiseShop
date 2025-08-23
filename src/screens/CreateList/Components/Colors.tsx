import {useField} from 'formik';
import {Chip} from '../../../components/ChipColor';
import {View} from 'react-native';

interface IColors {
  values: {
    name: string;
    categories: string[];
  };
  name: string;
}

const ColorsItems = [
  '#D9ECBA',
  '#FBD1DA',
  '#FCD3C1',
  '#FAEFB1',
  '#C4DFEF',
  '#DFD1E4',
];

export const Colors = ({values, name}: IColors) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View style={{display: 'flex', flexDirection: 'row', margin: 'auto'}}>
      {ColorsItems.map(cat => {
        const isSelected = values?.categories?.includes(cat);
        const onPress = () => {
          helpers.setValue([cat]);
        };
        return (
          <Chip cat={cat} isSelected={isSelected} onPress={onPress} key={cat} />
        );
      })}
    </View>
  );
};
