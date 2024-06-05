import { IBabyRecordRepository, IBabiesRepository } from "@/application/repositories";
import { IBabyRecordDTO } from "@/application/dtos";
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

    async exec(token: string, dto: IBabyRecordDTO) {
        // TODO: Create HttpRouter and HttpReqValidators
        const isAllStringFields = [dto.actionName, dto.observations, dto.babyId]
            .filter((e) => !!e)
            .every((e) => typeof e === "string");
        if (!isAllStringFields) {
            throw new ValidationError({
                message: "Invalid some record field type",
                clientMessage: "Algum campo do registro não é válido (string)",
                status: 422
            });
        }
        const isValidDate = (d: Date): boolean => {
            return d instanceof Date && !isNaN(d.getDate());
        }
        if (!isValidDate(dto.init) || (dto.end && !isValidDate(dto.end))) {
            throw new ValidationError({
                message: "Failed to build record init/end fields",
                clientMessage: "As datas nos campos 'início'/'fim' são inválidas.",
                status: 422
            });
        }
        // ----------------------------------------------
        const [userId, baby] = await Promise.all([
            this.usersGateway.getUserId(token),
            this.babiesRepository.findById(dto.babyId)
        ]);
        if (!baby.parentIds.includes(userId)) {
            throw new ValidationError({
                message: "You have not permission to change this record",
                clientMessage: "Você não tem permissão para alterar este registro.",
                status: 403
            });
        }
        const result = await this.babyRecordRepository.insertRecord(dto);
        if (!result) {
            throw new ValidationError({
                message: "Failed to insert record on 'babyRecordRepository.insert'",
                clientMessage: "Falhou em inserir o registro.",
                status: 400
            });   
        }
    }
}
