import { IBabyRecordRepository, IBabiesRepository } from "@/application/repositories";
import { IBabyRecordDTO } from "@/application/dtos";
import { IUsersGateway } from "@/application/gateways";
import { BaseError } from "@/domain";

export class InsertBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    private babiesRepository: IBabiesRepository;
    private usersGateway: IUsersGateway;

    constructor(
        usersGateway: IUsersGateway,
        babiesRepository: IBabiesRepository,
        babyRecordRepository: IBabyRecordRepository,
    ) {
        this.babyRecordRepository = babyRecordRepository;
        this.babiesRepository = babiesRepository;
        this.usersGateway = usersGateway;
    }

    async exec(token: string, dto: IBabyRecordDTO) {
        const [userId, baby] = await Promise.all([
            this.usersGateway.getUserId(token),
            this.babiesRepository.findById(dto.babyId)
        ]);
        if (!baby.parentIds.includes(userId)) {
            throw new BaseError({
                message: "You have not permission to change this record",
                clientMessage: "Você não tem permissão para alterar este registro.",
                status: 403
            });
        }
        const result = await this.babyRecordRepository.insertRecord(dto);
        if (!result) {
            throw new BaseError({
                message: "Failed to insert record on 'babyRecordRepository.insert'",
                clientMessage: "Falhou em inserir o registro.",
                status: 400
            });   
        }
    }
}
