/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOperation {
    id: string;
    name: string;
    code: string;
    item_id: string;
    cost_center_id: string;
    created_at: Date;
}

export interface IUpsertOperation {
    name: string;
    code: string;
    item_id: string;
    cost_center_id: string;
    [key: string]: any;
}
