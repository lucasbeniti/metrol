export interface IClient {
  id: string;
  name: string;
  created_at: Date;
}

export interface IUpsertClient {
  name: string;
  code: string;
  [key: string]: string;
}
