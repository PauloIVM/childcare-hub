import { IBabiesRepository } from "@/application/repositories";
import { IUsersGateway } from "@/application/gateways";

export class GetBabiesUsecase {
    private babiesRepository: IBabiesRepository;
    private usersGateway: IUsersGateway;

    constructor(
        usersGateway: IUsersGateway,
        babiesRepository: IBabiesRepository,
    ) {
        this.babiesRepository = babiesRepository;
        this.usersGateway = usersGateway;
    }

    async exec(token: string) {
        const userId = await this.usersGateway.getUserId(token);
        const result = await this.babiesRepository.findByUserId(userId);
        return result;
    }
}
