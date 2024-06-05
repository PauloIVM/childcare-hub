import { IBabiesRepository } from "@/application/repositories";
import { IBabyDTO } from "@/application/dtos";
import { IUsersGateway } from "@/application/gateways";
import { ValidationError } from "@/domain";

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
        // TODO: Create HttpRouter and HttpReqValidators
        const isAllStringFields = [dto.gender, dto.name]
            .filter((e) => !!e)
            .every((e) => typeof e === "string");
        if (!isAllStringFields) {
            throw new ValidationError({
                message: "Some invalid field type",
                clientMessage: "Algum campo do registro não é válido (string)",
                status: 422
            });
        }
        const isValidDate = (d: Date): boolean => {
            return d instanceof Date && !isNaN(d.getDate());
        }
        if (!isValidDate(dto.birthday)) {
            throw new ValidationError({
                message: "Failed to build birthday fields",
                clientMessage: "O campo 'birthday' inválido.",
                status: 422
            });
        }
        // ----------------------------------------------
        const userId = await this.usersGateway.getUserId(token);
        const result = await this.babiesRepository.saveBaby({ ...dto, parentIds: [userId] });
        if (!result) {
            throw new ValidationError({
                message: "Failed to insert baby on 'babiesRepository.insert'",
                clientMessage: "Falhou em inserir um bebê."
            });   
        }
    }
}
