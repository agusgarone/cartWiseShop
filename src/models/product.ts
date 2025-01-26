import {ICategoria} from './categoria';

export interface IProduct {
  id: number;
  name: string;
  categoria: ICategoria;
}
