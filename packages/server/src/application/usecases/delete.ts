import { IBabyRecordRepository } from "@/application/repositories";
import { IUsersGateway } from "@/application/gateways";
import { ValidationError } from "@/domain";
import { IUserDTO } from "../dtos";

export class DeleteBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    private usersGateway: IUsersGateway

    constructor(
        babyRecordRepository: IBabyRecordRepository,
        usersGateway: IUsersGateway
    ) {
        this.usersGateway = usersGateway;
        this.babyRecordRepository = babyRecordRepository;
    }

    async exec(recordId: string, userDTO: IUserDTO) {
        const { userId, token } = userDTO;
        const isValidUser = await this.usersGateway.auth(userId, token);
        if (!isValidUser) {
            throw new ValidationError({
                message: "Unauthorized user.",
                clientMessage: "Falha na autenticação do usuário.",
                status: 401
            });
        }
        const record = await this.babyRecordRepository.findById(recordId);
        const baby = record.baby;
        if (!baby || !baby.parentIds.includes(userId)) {
            throw new ValidationError({
                message: "You have not permission to delete this record",
                clientMessage: "Você não têm permissão para apagar este registro",
                status: 403
            });
        }
        const result = await this.babyRecordRepository.deleteRecord(recordId);
        if (!result) {
            throw new ValidationError({
                message: "Failed to delete record on 'babyRecordRepository.delete'",
                clientMessage: "Falhou em apagar o registro.",
                status: 409
            });
        }
    }
}
