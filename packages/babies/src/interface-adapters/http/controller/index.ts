import { Strategy } from "./strategy";
import { IUsersGateway } from "@/application/gateways";
import { HttpQuery, IHttpBody, IHttpHeaders } from "@/interface-adapters/http/dtos";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";

export * as HttpControllerStrategies from "./strategies";
export { Strategy as IHttpControllerStrategy } from "./strategy";

export class HttpController {
    private strategy: Strategy;
    private usersGateway: IUsersGateway;
    private babiesRepository: IBabiesRepository;
    private babyRecordRepository: IBabyRecordRepository;

    constructor(
        usersGateway: IUsersGateway,
        babiesRepository: IBabiesRepository,
        babyRecordRepository: IBabyRecordRepository
    ) {
        this.usersGateway = usersGateway;
        this.babiesRepository = babiesRepository;
        this.babyRecordRepository = babyRecordRepository;
    }

    async exec(query: HttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        this.strategy.setup(
            this.usersGateway,
            this.babiesRepository,
            this.babyRecordRepository
        );
        return this.strategy.exec(query, body, headers);
    }

    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
        return this;
    }
}
