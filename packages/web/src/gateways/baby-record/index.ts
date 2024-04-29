import { babyRecordApi } from "../instances";
import Cookie from "js-cookie";
import * as Types from "./types";

export async function fetchRecords(input: Types.IFetchRecordInput): Promise<Types.IFetchRecordResponse> {
    const token = Cookie.get("np_user") || "";
    const result = await babyRecordApi.get("/", {
        params: { s: input.skip, l: input.limit },
        headers: { Authorization: `Bearer ${token}` }
    });
    return {
        ok: result.status === 200,
        message: result.data.message,
        count: result.data.count,
        validActions: result.data.validActions,
        records: result.data.records?.map((r: any) => ({
            id: r.id,
            actionName: r.actionName,
            actionLabel: r.actionLabel,
            observations: r.observations,
            init: new Date(r.init),
            end: r.end && new Date(r.end),
            temperature: r.temperature,
            height: r.height,
            weight: r.weight,
            sleepQuality: r.sleepQuality,
            breastfeedingType: r.breastfeedingType,
            breastfeedingAmount: r.breastfeedingAmount,
        }))
    };
}

export async function insertRecord(input: Types.IInsertRecordInput): Promise<Types.IInsertRecordResponse> {
    const token = Cookie.get("np_user") || "";
    const result = await babyRecordApi.put("/", {
        actionName: input.actionName,
        observations: input.observations,
        init: input.init.toISOString(),
        end: input.end?.toISOString(),
    }, { headers: { Authorization: `Bearer ${token}` } });
    return {
        ok: result.status === 200,
        message: result.data.message,
    };
}

export async function updateRecord(input: Types.IUpdateRecordInput): Promise<Types.IUpdateRecordResponse> {
    // TODO: Usar um try-catch similar em todas as outras requests, especialmente as de login,
    //       para facilitar a obtenção do error na chamada desse método aqui.
    try {
        const token = Cookie.get("np_user") || "";
        const result = await babyRecordApi.patch("/", {
            id: input.recordId,
            fields: {
                observations: input.fields.observations,
                init: input.fields.init?.toISOString(),
                end: input.fields.end?.toISOString(),
                temperature: input.fields.temperature,
                height: input.fields.height,
                weight: input.fields.weight,
                sleepQuality: input.fields.sleepQuality,
                breastfeedingType: input.fields.breastfeedingType,
                breastfeedingAmount: input.fields.breastfeedingAmount,
            }
        }, { headers: { Authorization: `Bearer ${token}` } });
        return {
            ok: result.status === 200,
            message: result.data.message,
        };
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function deleteRecord(input: Types.IDeleteRecordInput): Promise<Types.IDeleteRecordResponse> {
    const token = Cookie.get("np_user") || "";
    const result = await babyRecordApi.delete("/", {
        params: { id: input.recordId },
        headers: { Authorization: `Bearer ${token}` }
    });
    return {
        ok: result.status === 200,
        message: result.data.message,
    };
}
