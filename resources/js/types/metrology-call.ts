export interface IMetrologyCall {
  id: number;
  item_name: string;
  machine_id: number;
  operation_id: number;
  metrology_call_type_id: number;
  metrology_call_status_id: number;
  closed_at?: string;
  created_at: string;
  operation?: {
    item_id: string;
  };
}

export interface IUpsertMetrologyCall {
  machine_id: string;
  operation_id: string;
  metrology_call_type_id: string;
  item_id: string;
  [key: string]: string;
}
