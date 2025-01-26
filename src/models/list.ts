export interface IList<T> {
  id: number;
  fechaAlta: string;
  name: string;
  products: T[];
}
