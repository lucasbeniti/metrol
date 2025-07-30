export interface ICostCenter {
  id: number;
  name: string;
  code: string;
  client_id: number;
  created_at: string;
}

export interface IUpsertCostCenter {
  name: string;
  code: string;
  client_id: string;
  [key: string]: string;
}
