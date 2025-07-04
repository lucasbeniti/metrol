export interface IMetrologyCall {
  id: number;
  item_name: string;
  machine_id: number;
  operation_id: number;
  metrology_call_type_id: number;
  metrology_call_status_id: number;
  closed_at?: string;
  created_at: string;
}

export interface IUpsertMetrologyCall {
  machine_id: number;
  operation_id: number;
  metrology_call_type_id: number;
  item_id: number;
  [key: string]: number;
}
