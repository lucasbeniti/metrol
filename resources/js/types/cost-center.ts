/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICostCenter {
    id: string;
    name: string;
    code: string;
    client_id: string;
}

export interface IUpsertCostCenter {
    name: string;
    code: string;
    client_id: string;
    [key: string]: any;
}