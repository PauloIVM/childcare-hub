import * as Usecases from "@/application/usecases";
import * as Repositories from "@/application/repositories";
import * as Gateways from "@/application/gateways";
import { IHttpServer } from "@/interface-adapters/ports/http-server";

export class HttpController {
	constructor (
        httpServer: IHttpServer,
        babyRecordRepository: Repositories.IBabyRecordRepository,
        babiesRepository: Repositories.IBabiesRepository,
        usersGateway: Gateways.IUsersGateway
    ) {
        // TODO: O correto do GET seria /baby-records e não /baby-record
        httpServer.on("get", "/baby-record", async function (params, body, headers) {
            const { s = "0", l = "20", bid } = params || {};
            const skip = Number(s);
            const limit = Number(l);
            const babyId = bid as string;
            const token = headers.authorization?.split(' ')?.[1];
            const usecase = new Usecases.GetBabyRecordsUsecase(
                babyRecordRepository,
                usersGateway
            );
            const { records, count, validActions } = await usecase.exec(babyId, token, skip, limit);
            return {
                message: "ok",
                validActions: validActions.map(({ name, label }) => ({ name, label })),
                count,
                records: records.map((r) => ({
                    id: r.id,
                    observations: r.observations,
                    init: r.init,
                    end: r.end,
                    actionName: r.action.name,
                    actionLabel: r.action.label,
                    height: r.height,
                    weight: r.weight,
                    temperature: r.temperature,
                    sleepQuality: r.sleepQuality,
                    breastfeedingAmount: r.breastfeedingAmount,
                    breastfeedingType: r.breastfeedingType,
                }))
            };
        });

        httpServer.on("post", "/baby-record", async function (params, body, headers) {
            const {
                babyId,
                actionName,
                observations,
                init,
                end
            } = body || {};
            const token = headers.authorization?.split(' ')?.[1];
            const usecase = new Usecases.InsertBabyRecordUsecase(
                usersGateway,
                babiesRepository,
                babyRecordRepository,
            );
            await usecase.exec(token, {
                babyId,
                actionName,
                observations,
                init: new Date(init),
                end: end && new Date(end)
            });
            return { message: "ok" };
        });

        httpServer.on("patch", "/baby-record", async function (params, body, headers) {
            const { fields, id } = body || {};
            const token = headers.authorization?.split(' ')?.[1];
            const usecase = new Usecases.UpdateBabyRecordUsecase(
                babyRecordRepository,
                usersGateway
            );
            await usecase.exec(token, { ...fields, recordId: id });
            return { message: "ok" };
        });

        httpServer.on("delete", "/baby-record", async function (params, body, headers) {
            const id = params?.id as string;
            const token = headers.authorization?.split(' ')?.[1];    
            const usecase = new Usecases.DeleteBabyRecordUsecase(
                babyRecordRepository,
                usersGateway
            );
            await usecase.exec(id, token);
            return { message: "ok" };
        });

        httpServer.on("post", "/baby", async function (params, body, headers) {
            const {
                name,
                gender,
                birthday,
            } = body as Record<string, string> || {};
            const token = headers.authorization?.split(' ')?.[1];
            const usecase = new Usecases.InsertBabyUsecase(
                usersGateway,
                babiesRepository
            );
            await usecase.exec(token, {
                name,
                gender,
                birthday: new Date(birthday),
                parentIds: []
            });
            return { message: "ok" };
        });

        httpServer.on("get", "/baby", async function (params, body, headers) {
            const token = headers.authorization?.split(' ')?.[1];
            const usecase = new Usecases.GetBabiesUsecase(
                usersGateway,
                babiesRepository
            );
            const result = await usecase.exec(token);
            return { babies: result.map((r) => ({
                id: r.id,
                name: r.name,
                gender: r.gender,
                birthday: r.birthday
            }))};
        });
	}
}
