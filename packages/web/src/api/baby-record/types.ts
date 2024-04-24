export interface IFetchRecordInput {
    skip: number;
    limit: number;
}

export interface IFetchRecordResponse {
    ok: boolean;
    message: string;
    count: number;
    validActions: { name: string; label: string; }[];
    records: {
        id: string;
        actionName: string;
        actionLabel: string;
        observations: string;
        init: Date;
        end?: Date;
        temperature?: number;
        height?: number;
        weight?: number;
        sleepQuality?: string;
        breastfeedingType?: string;
        breastfeedingAmount?: number;
    }[];
}

export interface IInsertRecordInput {
    actionName: string;
    observations: string;
    init: Date;
    end?: Date;
}

export interface IInsertRecordResponse {
    ok: boolean;
    message: string;
}

export interface IUpdateRecordInput {
    recordId: string;
    fields: {
        observations?: string;
        init?: Date;
        end?: Date;
        temperature?: number;
        height?: number;
        weight?: number;
        sleepQuality?: string;
        breastfeedingType?: string;
        breastfeedingAmount?: number;
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