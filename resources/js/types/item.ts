export interface IItem {
  id: number;
  name: string;
  code: string;
  cost_center_id: number;
  created_at: string;
}

export interface IUpsertItem {
  name: string;
  code: string;
  cost_center_id: number;
  [key: string]: string | number;
}
