/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Clients {
    id: string;
    name: string;
    updated_at: Date;
    created_at: Date;
}

export interface IUpsertClients {
    name: string;
    [key: string]: any;
}
