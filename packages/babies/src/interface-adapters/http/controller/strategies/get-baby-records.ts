import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";
import { GetBabyRecordsUsecase } from "@/application/usecases";
import {
    IHttpBody,
    IHttpHeaders,
    HttpQuery,
} from "@/interface-adapters/http/dtos";
import { Strategy } from "../strategy";

export class GetBabyRecords implements Strategy {
    private babyRecordRepository: IBabyRecordRepository;
    private usersGateway: IUsersGateway;

    async exec(query: HttpQuery, _: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        const { s = "0", l = "20", bid } = query || {};
        const skip = Number(s);
        const limit = Number(l);
        const babyId = bid as string;
        const token = headers.authorization?.split(' ')?.[1];
        const usecase = new GetBabyRecordsUsecase(
            this.babyRecordRepository,
            this.usersGateway
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
    }

    setup(usersGateway: IUsersGateway, _: IBabiesRepository, babyRecordRepository: IBabyRecordRepository): void {
        this.babyRecordRepository = babyRecordRepository;
        this.usersGateway = usersGateway;
    }
}
