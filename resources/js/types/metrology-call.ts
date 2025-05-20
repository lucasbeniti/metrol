/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMetrologyCall {
    id: string;
    item_name: string;
    machine_id: number;
    operation_id: number;
    type: MetrologyCallType
    user_id?: number;
    status: MetrologyCallStatus
    closed_at?: Date;
    created_at: Date;
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
    ADJUST
}

export interface IUpsertMetrologyCall {
    item_name: string;
    machine_id: string | number;
    operation_id: string | number;
    type: string | MetrologyCallType;
    [key: string]: any;
}
