/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITool {
    id: string;
    name: string;
    code: string;
    created_at: Date;
}

export interface IUpsertTool {
    name: string;
    code: string;
    [key: string]: any;
}