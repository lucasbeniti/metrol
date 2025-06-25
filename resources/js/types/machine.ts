/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMachine {
  id: string;
  name: string;
  code: string;
  operation_id: string;
  tool_id: string | null;
  created_at: Date;
}

export interface IUpsertMachine {
  name: string;
  code: string;
  operation_id: string;
  [key: string]: any;
}
