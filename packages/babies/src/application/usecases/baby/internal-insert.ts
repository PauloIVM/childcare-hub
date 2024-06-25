import { IBabiesRepository } from "@/application/repositories";
import { IBabyDTO } from "@/application/dtos";
import { BaseError } from "@/domain";

export class InternalInsertBabyUsecase {
    private babiesRepository: IBabiesRepository;

    constructor(babiesRepository: IBabiesRepository) {
        this.babiesRepository = babiesRepository;
    }

    // TODO: Ainda n sei bem como deixar evidente nos usecases q o uso é interno... n
    //       sei se estou fazendo da melhor maneira.
    async exec(dto: IBabyDTO) {
        // TODO: Talvez vários desses validadores estejam desatualizados, não estão
        //       conferindo o baby-id por exemplo.
        // TODO: Create QueueRouter and QueueBodyValidators
        const isAllStringFields = [dto.gender, dto.name]
            .filter((e) => !!e)
            .every((e) => typeof e === "string");
        if (!isAllStringFields) {
            throw new BaseError({
                message: "Some invalid field type",
                clientMessage: "Algum campo do registro não é válido (string)",
                status: 422
            });
        }
        const isValidDate = (d: Date): boolean => {
            return d instanceof Date && !isNaN(d.getDate());
        }
        if (!isValidDate(dto.birthday)) {
            throw new BaseError({
                message: "Failed to build birthday fields",
                clientMessage: "O campo 'birthday' inválido.",
                status: 422
            });
        }
        // ----------------------------------------------
        const result = await this.babiesRepository.saveBaby(dto);
        if (!result) {
            throw new BaseError({
                message: "Failed to insert baby on 'babiesRepository.internalInsert'",
                clientMessage: "Failed to insert baby on 'babiesRepository.internalInsert'"
            });   
        }
    }
}
