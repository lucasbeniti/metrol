/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MetrologyCall {
    id: string;
    item_name: string;
    machine_id: number;
    operation_id: number;
    type: MetrologyCallType
    user_id?: number;
    status: MetrologyCallStatus
    closed_at?: Date
}

export enum MetrologyCallStatus {
    OK,
    NOK,
    WAITING_RECEIVE,
    WAITING_MEASUREMENT
}

export enum MetrologyCallType {
    SETUP,
    PRODUCTION,
    ADJUST
}

export interface CreateMetrologyCall {
    item_name: string;
    machine_id: string;
    operation_id: string;
    type: string;
    [key: string]: any;
}
