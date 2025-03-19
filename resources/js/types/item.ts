/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IItem {
    id: string;
    name: string;
    code: string;
    cost_center_id: string;
    created_at: Date;
}

export interface IUpsertItem {
    name: string;
    code: string;
    cost_center_id: string;
    [key: string]: any;
}