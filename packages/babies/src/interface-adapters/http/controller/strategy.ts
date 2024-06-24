import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";
import { HttpQuery, IHttpBody, IHttpHeaders } from "@/interface-adapters/http/dtos";

export interface Strategy {
    setup(
        usersGateway: IUsersGateway,
        babiesRepository: IBabiesRepository,
        babyRecordRepository: IBabyRecordRepository,
    ): void;
    exec(query: HttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>>;
}
