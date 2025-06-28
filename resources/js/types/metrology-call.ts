export interface IMetrologyCall {
  id: number;
  item_name: string;
  machine_id: number;
  operation_id: number;
  type: MetrologyCallType;
  user_id?: number;
  status: MetrologyCallStatus;
  closed_at?: string;
  created_at: string;
}

export enum MetrologyCallStatus {
  OK = 'ok',
  NOK = 'nok',
  WAITING_RECEIVE = 'waiting_receive',
  WAITING_MEASUREMENT = 'waiting_measurement',
}

export enum MetrologyCallType {
  SETUP,
  PRODUCTION,
  ADJUST,
}

export interface IUpsertMetrologyCall {
  item_name: string;
  machine_id: number;
  operation_id: number;
  type: string | MetrologyCallType;
  [key: string]: string | number | MetrologyCallType;
}
