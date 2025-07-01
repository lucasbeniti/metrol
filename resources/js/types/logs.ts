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
    name: string;
  };
  table: {
    name: string;
  };
}
