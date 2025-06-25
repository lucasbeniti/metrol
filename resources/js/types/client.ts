export interface IClient {
  id: string;
  name: string;
  updated_at: Date;
  created_at: Date;
}

export interface IUpsertClient {
  name: string;
  code: string;
  [key: string]: string | undefined;
}
