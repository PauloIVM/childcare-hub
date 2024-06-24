import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";
import { DeleteBabyRecordUsecase } from "@/application/usecases";
import {
    IHttpBody,
    IHttpHeaders,
    HttpQuery,
} from "@/interface-adapters/http/dtos";
import { Strategy } from "../strategy";

export class DeleteBabyRecord implements Strategy {
    private babyRecordRepository: IBabyRecordRepository;
    private usersGateway: IUsersGateway;

    async exec(query: HttpQuery, _: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        const recordId = query[HttpQuery.recordId] as string;
        const token = headers.authorization?.split(' ')?.[1];    
        const usecase = new DeleteBabyRecordUsecase(
            this.babyRecordRepository,
            this.usersGateway
        );
        await usecase.exec(recordId, token);
        return { message: "ok" };
    }

    setup(usersGateway: IUsersGateway, _: IBabiesRepository, babyRecordRepository: IBabyRecordRepository): void {
        this.babyRecordRepository = babyRecordRepository;
        this.usersGateway = usersGateway;
    }
}
