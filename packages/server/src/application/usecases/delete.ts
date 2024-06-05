import { IBabyRecordRepository } from "@/application/repositories";
import { IUsersGateway } from "@/application/gateways";
import { ValidationError } from "@/domain";

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

    async exec(recordId: string, token: string) {
        // TODO: Create HttpRouter and HttpReqValidators
        if (!token) {
            throw new ValidationError({
                message: "Token required.",
                clientMessage: "Token de autenticação não fornecido.",
                status: 401
            });
        }
        if (!recordId) {
            throw new ValidationError({
                message: "'id' required.",
                clientMessage: "Passe um 'id' válido.",
            });
        }
        // ---------------------------------------------
        const [userId, record] = await Promise.all([
            this.usersGateway.getUserId(token),
            this.babyRecordRepository.findById(recordId)
        ]);
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
