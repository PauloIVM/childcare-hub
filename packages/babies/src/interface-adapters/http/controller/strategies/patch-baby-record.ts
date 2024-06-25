import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";
import { UpdateBabyRecordUsecase } from "@/application/usecases";
import {
    IHttpBody,
    IHttpHeaders,
    HttpQuery,
} from "@/interface-adapters/http/dtos";
import { Strategy } from "../strategy";

export class PatchBabyRecord implements Strategy {
    private babyRecordRepository: IBabyRecordRepository;
    private usersGateway: IUsersGateway;

    async exec(_: HttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        const token = headers.authorization?.split(' ')?.[1];
        const usecase = new UpdateBabyRecordUsecase(
            this.babyRecordRepository,
            this.usersGateway
        );
        await usecase.exec(token, body);
        return { message: "ok" };
    }

    setup(usersGateway: IUsersGateway, _: IBabiesRepository, babyRecordRepository: IBabyRecordRepository): void {
        this.babyRecordRepository = babyRecordRepository;
        this.usersGateway = usersGateway;
    }
}
