export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          uid: string;
          email: string;
          displayName: string;
          photoURL: string;
          providerId: string;
          createdAt: string;
          language: string;
          theme: string;
          listView: string;
        };
        Insert: {
          uid: string;
          email: string;
          displayName?: string;
          photoURL?: string;
          providerId: string;
          createdAt?: string;
          language: string;
          theme: string;
          listView: string;
        };
        Update: {
          uid?: string;
          email?: string;
          displayName?: string;
          photoURL?: string;
          providerId?: string;
          createdAt?: string;
          language?: string;
          theme?: string;
          listView?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: number;
          name: string;
          id_category: number;
          uid_user: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          id_category: number;
          uid_user: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          id_category?: number;
          uid_user: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_id_category_fkey';
            columns: ['id_category'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      lists: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          id_products: number[];
          uid_user: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          name: string;
          id_products: number[];
          uid_user: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          name?: string;
          id_products?: number[];
          uid_user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'lists_uid_user_fkey';
            columns: ['uid_user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['uid'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_products: {
        Args: {
          p_uid_user: string;
          p_name?: string | null;
          p_id_category?: number | null;
        };
        Returns: Array<{
          id: string;
          name: string;
          id_category: string;
          category_name: string;
          uid_user: string | null;
        }>;
      };
      get_lists_with_products_and_categories: {
        Args: {
          p_uid_user: string;
        };
        Returns: Array<{
          list_id: string;
          list_name: string;
          created_at: string;
          uid_user: string;
          product_data: Array<{
            id: string;
            name: string;
            id_category: string;
            category: string;
          }> | null;
        }>;
      };
      get_list_by_id: {
        Args: {
          p_list_id: number;
          p_uid_user: string;
        };
        Returns:
          | {
              list_id: number;
              list_name: string;
              created_at: string;
              uid_user: string;
              product_data: Array<{
                id: string;
                name: string;
                id_category: string;
                category: string;
              }> | null;
            }[]
          | null;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
