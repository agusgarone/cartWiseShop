import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  TabView,
  TabBar,
  SceneRendererProps,
  NavigationState,
  TabDescriptor,
} from 'react-native-tab-view';
import theme from '../../../../common/theme';
import {IProductForm} from '../../../../models/types/product';
import List from '../../../../components/List';

const RemainingProducts = ({
  data,
  render,
}: {
  data: IProductForm[];
  render: any;
}) => <List data={data} render={render} />;

const AddedProducts = ({data, render}: {data: IProductForm[]; render: any}) => (
  <List data={data} render={render} />
);

const renderScene = ({
  route,
  data,
  render,
}: {
  route: {key: string};
  data: IProductForm[];
  render: ({item, index}: {item: any; index: number}) => React.JSX.Element;
}) => {
  switch (route.key) {
    case 'remaining':
      return (
        <RemainingProducts
          data={data.filter(item => !item.isChecked) as any}
          render={render}
        />
      );
    case 'added':
      return (
        <AddedProducts
          data={data.filter(item => item.isChecked) as any}
          render={render}
        />
      );
    default:
      return null;
  }
};

const routes = [
  {key: 'remaining', title: 'Restantes'},
  {key: 'added', title: 'Agregadas'},
];

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
    options:
      | Record<
          string,
          TabDescriptor<{
            key: string;
            title: string;
          }>
        >
      | undefined;
  },
) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: theme.colors.black}}
    style={{backgroundColor: theme.colors.whiteInput}}
    activeColor={
      props.navigationState.index === 0
        ? theme.colors.red
        : theme.colors.primary
    }
    inactiveColor={theme.colors.black}
  />
);

export default function Separated({
  data,
  render,
}: {
  data: IProductForm[];
  render: ({item, index}: {item: any; index: number}) => React.JSX.Element;
}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={({route}) => renderScene({route, data, render})}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
