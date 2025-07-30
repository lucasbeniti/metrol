export interface IMachine {
  id: number;
  name: string;
  code: string;
  operation_id: number;
  created_at: string;
}

export interface IUpsertMachine {
  name: string;
  code: string;
  operation_id: string;
  [key: string]: string;
}
