export interface ILog {
  user_id: number;
  action_id: number;
  description: string;
  table_id: number;
  created_at: string;
  action: {
    name: string;
  };
  table: {
    name: string;
  };
}
