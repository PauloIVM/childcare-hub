import { BabyRecord, BabyAction, ValidationError } from "@/domain";
import { IUsersGateway } from "@/application/gateways";
import { IBabyRecordRepository } from "@/application/repositories";
import { IUserDTO } from "../dtos";

export class GetBabyRecordsUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    private usersGateway: IUsersGateway;

    constructor(
        babyRecordRepository: IBabyRecordRepository,
        usersGateway: IUsersGateway
    ) {
        this.babyRecordRepository = babyRecordRepository;
        this.usersGateway = usersGateway;
    }

    async exec(
        babyId: string,
        skip: number,
        limit: number,
        userDTO: IUserDTO,
    ): Promise<{ records: BabyRecord[]; count: number; validActions: BabyAction[] }> {
        const isValidUser = await this.usersGateway.auth(userDTO.userId, userDTO.token);
        if (!isValidUser) {
            throw new ValidationError({
                message: "Unauthorized user.",
                clientMessage: "Falha na autenticação do usuário.",
                status: 401
            });
        }
        const records = await this.babyRecordRepository.findByBabyId(babyId, skip, limit);
        if (!records.every((r) => r.baby.parentIds.includes(userDTO.userId))) {
            throw new ValidationError({
                message: "You have not permission to get those records",
                clientMessage: "Você não têm permissão para obter estes registro",
                status: 403
            });
        }
        const count = await this.babyRecordRepository.getCount(babyId);
        const validActions = BabyAction.validActions.map((a: string) => new BabyAction(a));
        return { records, count, validActions };
    }
}
