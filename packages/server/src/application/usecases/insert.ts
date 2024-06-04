import { IBabyRecordRepository, IBabiesRepository } from "@/application/repositories";
import { IBabyRecordDTO, IUserDTO } from "@/application/dtos";
import { IUsersGateway } from "@/application/gateways";
import { ValidationError } from "@/domain";

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

    async exec(recordDTO: IBabyRecordDTO, userDTO: IUserDTO) {
        const { userId, token } = userDTO;
        const isValidUser = await this.usersGateway.auth(userId, token);
        const baby = await this.babiesRepository.findById(recordDTO.babyId);
        if (!isValidUser) {
            throw new ValidationError({
                message: "Unauthorized user.",
                clientMessage: "Falha na autenticação do usuário.",
                status: 401
            });
        }
        if (!baby.parentIds.includes(userId)) {
            throw new ValidationError({
                message: "You have not permission to change this record",
                clientMessage: "Você não tem permissão para alterar este registro.",
                status: 403
            });
        }
        const result = await this.babyRecordRepository.insertRecord(recordDTO);
        if (!result) {
            throw new ValidationError({
                message: "Failed to insert record on 'babyRecordRepository.insert'",
                clientMessage: "Falhou em inserir o registro.",
                status: 400
            });   
        }
    }
}
