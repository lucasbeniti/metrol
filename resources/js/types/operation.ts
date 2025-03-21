/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOperation {
    id: string;
    name: string;
    code: string;
    created_at: Date;
}

export interface IUpsertOperation {
    name: string;
    code: string;
    [key: string]: any;
}
