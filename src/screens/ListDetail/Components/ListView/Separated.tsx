import React, {useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
  TabDescriptor,
} from 'react-native-tab-view';
import theme from '../../../../common/theme';
import {IProductDTO} from '../../../../models/types/product';
import {IListDTO} from '../../../../models/types/list';
import List from '../../../../components/List';

const FirstRoute = ({data, render}: {data: IProductDTO[]; render: any}) => (
  <List data={data} render={render} />
);

const SecondRoute = ({data, render}: {data: IProductDTO[]; render: any}) => (
  <List data={data} render={render} />
);

const renderScene = ({
  route,
  data,
  render,
}: {
  route: {key: string};
  data: IProductDTO[] | IListDTO<IProductDTO>[];
  render: ({item, index}: {item: any; index: number}) => React.JSX.Element;
}) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute data={data as any} render={render} />;
    case 'second':
      return <SecondRoute data={data as any} render={render} />;
    default:
      return null;
  }
};

const routes = [
  {key: 'first', title: 'Restantes'},
  {key: 'second', title: 'Agregadas'},
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
  data: IProductDTO[] | IListDTO<IProductDTO>[];
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
