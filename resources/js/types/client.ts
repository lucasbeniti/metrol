/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IClient {
    id: string;
    name: string;
    updated_at: Date;
    created_at: Date;
}

export interface IUpsertClient {
    name: string;
    [key: string]: any;
}
