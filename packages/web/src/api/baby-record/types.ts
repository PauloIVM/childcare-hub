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
    }[];
}

export interface IInsertRecordInput {
    // TODO: Acho bom padronizar esses names pra "actionName"
    action: string;
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
        // TODO: N sei se é uma boa permitir modificar a "action" em si... talvez bloquear isso
        //       na api.
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