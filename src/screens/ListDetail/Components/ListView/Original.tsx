import List from '../../../../components/List';
import {IListDTO} from '../../../../models/types/list';
import {IProductDTO} from '../../../../models/types/product';

export const Original = ({
  data,
  render,
}: {
  data: IProductDTO[] | IListDTO<IProductDTO>[];
  render: ({item, index}: {item: any; index: number}) => React.JSX.Element;
}) => {
  return <List data={data as any} render={render} />;
};
