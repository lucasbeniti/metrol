export interface IUser {
  id: string;
  name: string;
  identification: string;
  created_at: string;
  user_role: {
    name: string;
  };
}

export interface IUpsertUser {
  id?: string;
  name: string;
  identification: string;
  user_role_id: string;
  [key: string]: string | undefined;
}
