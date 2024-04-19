import { babyRecordApi } from "../instances";
import * as Types from "./types";

export async function fetchRecords(input: Types.IFetchRecordInput): Promise<Types.IFetchRecordResponse> {
    const result = await babyRecordApi.get("/", {
        params: { s: input.skip, l: input.limit },
        withCredentials: true,
    });
    return {
        ok: result.status === 200,
        message: result.data.message,
        records: result.data.records?.map((r: any) => ({
            id: r.id,
            action: r.action,
            observations: r.observations,
            init: new Date(r.init),
            end: r.end && new Date(r.end)
        }))
    };
}

export async function insertRecord(input: Types.IInsertRecordInput): Promise<Types.IInsertRecordResponse> {
    const result = await babyRecordApi.put("/", {
        action: input.action,
        observations: input.observations,
        init: input.init.toISOString(),
        end: input.end.toISOString(),
    }, { withCredentials: true });
    return {
        ok: result.status === 200,
        message: result.data.message,
    };
}

export async function updateRecord(input: Types.IUpdateRecordInput): Promise<Types.IUpdateRecordResponse> {
    const result = await babyRecordApi.patch("/", {
        id: input.recordId,
        fields: {
            action: input.fields.action,
            observations: input.fields.observations,
            init: input.fields.init?.toISOString(),
            end: input.fields.end?.toISOString(),
        }
    }, { withCredentials: true });
    return {
        ok: result.status === 200,
        message: result.data.message,
    };
}

export async function deleteRecord(input: Types.IDeleteRecordInput): Promise<Types.IDeleteRecordResponse> {
    const result = await babyRecordApi.delete("/", {
        params: { id: input.recordId },
        withCredentials: true
    });
    return {
        ok: result.status === 200,
        message: result.data.message,
    };
}
