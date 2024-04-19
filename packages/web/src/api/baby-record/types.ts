export interface IFetchRecordInput {
    skip: number;
    limit: number;
}

export interface IFetchRecordResponse {
    ok: boolean;
    message: string;
    count: number;
    records: {
        id: string;
        action: string;
        observations?: string;
        init: Date;
        end?: Date;
    }[];
}

export interface IInsertRecordInput {
    action: string;
    observations: string;
    init: Date;
    end: Date;
}

export interface IInsertRecordResponse {
    ok: boolean;
    message: string;
}

export interface IUpdateRecordInput {
    recordId: string;
    fields: {
        action?: string;
        observations?: string;
        init?: Date;
        end?: Date;
    }
}

export interface IUpdateRecordResponse {
    ok: boolean;
    message: string;
}

export interface IDeleteRecordInput {
    recordId: string;
}

export interface IDeleteRecordResponse {
    ok: boolean;
    message: string;
}