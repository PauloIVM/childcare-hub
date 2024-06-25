import { IBabiesRepository } from "@/application/repositories";
import { IBabyDTO } from "@/application/dtos";
import { IUsersGateway } from "@/application/gateways";
import { BaseError } from "@/domain";

export class InsertBabyUsecase {
    private babiesRepository: IBabiesRepository;
    private usersGateway: IUsersGateway;

    constructor(
        usersGateway: IUsersGateway,
        babiesRepository: IBabiesRepository,
    ) {
        this.babiesRepository = babiesRepository;
        this.usersGateway = usersGateway;
    }

    async exec(token: string, dto: IBabyDTO) {
        const userId = await this.usersGateway.getUserId(token);
        const result = await this.babiesRepository.saveBaby({ ...dto, parentIds: [userId] });
        if (!result) {
            throw new BaseError({
                message: "Failed to insert baby on 'babiesRepository.insert'",
                clientMessage: "Falhou em inserir um bebê."
            });   
        }
    }
}
