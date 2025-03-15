export interface IListSupabase {
  id: number;
  created_at: string;
  name: string;
  id_products: number[];
}

export interface IListDTO<T> {
  id: number;
  created_at: string;
  name: string;
  products: T[];
}

export interface IListForm<T> {
  id: number;
  created_at: string;
  name: string;
  products: Record<number, T>;
}
