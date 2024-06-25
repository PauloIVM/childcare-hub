import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";
import { InsertBabyRecordUsecase } from "@/application/usecases";
import {
    IHttpBody,
    IHttpHeaders,
    HttpQuery,
} from "@/interface-adapters/http/dtos";
import { Strategy } from "../strategy";

export class PostBabyRecord implements Strategy {
    private babyRecordRepository: IBabyRecordRepository;
    private babiesRepository: IBabiesRepository;
    private usersGateway: IUsersGateway;

    async exec(_: HttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        const {
            babyId,
            actionName,
            observations,
            init,
            end
        } = body;
        const token = headers.authorization?.split(' ')?.[1];
        const usecase = new InsertBabyRecordUsecase(
            this.usersGateway,
            this.babiesRepository,
            this.babyRecordRepository,
        );
        await usecase.exec(token, {
            babyId,
            actionName,
            observations,
            init: new Date(init),
            end: end && new Date(end)
        });
        return { message: "ok" };
    }

    setup(usersGateway: IUsersGateway, babiesRepository: IBabiesRepository, babyRecordRepository: IBabyRecordRepository): void {
        this.babyRecordRepository = babyRecordRepository;
        this.babiesRepository = babiesRepository;
        this.usersGateway = usersGateway;
    }
}
