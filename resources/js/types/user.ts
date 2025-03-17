/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
    id: string;
    name: string;
    identification: string;
    password: string;
    type: USER_TYPE | string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface IUpsertUser {
    name: string;
    password: string;
    identification: string;
    type: USER_TYPE | string;
    [key: string]: any;
}

export enum USER_TYPE {
    ADMIN,
    PRODUCTION,
    METROLOGIST
}