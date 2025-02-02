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
          createdAt: string; // Fecha en formato ISO (timestamp)
        };
        Insert: {
          uid: string;
          email: string;
          displayName?: string;
          photoURL?: string;
          providerId: string;
          createdAt?: string;
        };
        Update: {
          uid?: string;
          email?: string;
          displayName?: string;
          photoURL?: string;
          providerId?: string;
          createdAt?: string;
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
          uid_user: string;
        };
        Insert: {
          id?: number;
          name: string;
          id_category: number;
          uid_user: string;
        };
        Update: {
          id?: number;
          name?: string;
          id_category?: number;
          uid_user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'products_id_category_fkey';
            columns: ['id_category'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_uid_user_fkey';
            columns: ['uid_user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['uid'];
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
          p_name?: string | null;
          p_id_category?: number | null;
        };
        Returns: Array<{
          id: number;
          name: string;
          id_category: number;
          uid_user: string;
        }>;
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
