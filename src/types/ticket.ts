export interface ParsedProduct {
  name: string;
  id_category: number;
  category: string;
}

export interface ParsedProducts {
  products: ParsedProduct[];
}
