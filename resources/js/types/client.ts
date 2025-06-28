export interface IClient {
  id: number;
  name: string;
  created_at: Date;
}

export interface IUpsertClient {
  name: string;
  code: string;
  [key: string]: number | string | Date;
}
