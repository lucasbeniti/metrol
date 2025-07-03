export interface ILog {
  user_id: number;
  action_id: number;
  description: string;
  table_id: number;
  created_at: string;
  user: {
    name: string;
    identification: string;
  };
  action: {
    id: number;
  };
  table: {
    id: number;
  };
  details: Record<string, unknown>;
}

export interface IFilterLog {
  user_id: string;
  action_id: string;
  table_id: string;
  [key: string]: string;
}
