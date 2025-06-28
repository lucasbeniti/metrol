export interface IOperation {
  id: number;
  name: string;
  code: string;
  created_at: Date;
}

export interface IUpsertOperation {
  name: string;
  code: string;
  item_id: number;
  [key: string]: string | number;
}
