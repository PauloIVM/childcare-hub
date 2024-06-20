import { IBabyRecordDTO } from "@/application/dtos";
import { IUsersGateway } from "@/application/gateways";
import { IBabyRecordRepository } from "@/application/repositories";
import { BaseError } from "@/domain";

export class UpdateBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    private usersGateway: IUsersGateway;

    constructor(babyRecordRepository: IBabyRecordRepository, usersGateway: IUsersGateway) {
        this.babyRecordRepository = babyRecordRepository;
        this.usersGateway = usersGateway;
    }

    async exec(
        token: string,
        recordDTO: Partial<IBabyRecordDTO>,
    ) {
        // TODO: Validar cada campo do recordDTO semelhante ao insert. Quando eu fizer o
        //       refactor abstraindo o http-server, uma ideia é abstrair os validators e
        //       presenters. Dessa forma eu poderia reutilizar a validação do body para
        //       recordDTO aqui e no insert. Daí nesse refactor, ao invés de http-controller,
        //       os controllers voltariam a ser definidos por usecase, ex.: update-http-controller
        //       e etc... implementaria uma interface definida pelo http-server... da mesma
        //       forma o http-server especificaria as interfaces dos validators e presenters
        //       dele. E aí a implementação do http-server em infra poderia ficar algo como:
        //           const httpServer = new ExpressAdapter();
        //           const usersDataMapper = new UsersDataMapper();
        //           new HttpRouter(httpServer, usersDataMapper)
        //               .use("post", "/foo/bar", new UpdateBabyRecordController())
        //               .use(
        //                   "post",
        //                   "/foo/bar/with-validation",
        //                   new UpdateBabyRecordController(),
        //                   [
        //                       new RecordDTOBodyValidator(),
        //                       new RecordDTOParamsValidator(),
        //                       new BabyDTOBodyValidator()
        //                   ],
        //               );
        //               .use(
        //                   "post",
        //                   "/foo/bar/csv",
        //                   new UpdateBabyRecordController(),
        //                   [],
        //                   new BabyRecordCsvPresenter()
        //               );
        //           httpServer.listen(3003);

        // TODO: Create HttpRouter and HttpReqValidators
        if (!recordDTO?.recordId) {
            throw new BaseError({
                message: "Missing essential fields.",
                clientMessage: "Missing essential fields.",
            });
        }
        if (recordDTO.actionName) {
            throw new BaseError({
                message: "Not allowed change action-name",
                clientMessage: "Not allowed change action-name",
            });
        }
        // ---------------------------------------------
        const [userId, babyRecord] = await Promise.all([
            this.usersGateway.getUserId(token),
            this.babyRecordRepository.findById(recordDTO.recordId)
        ]);
        if (!babyRecord.baby.parentIds.includes(userId)) {
            throw new BaseError({
                message: "You have not permission to change this record",
                clientMessage: "Você não tem permissão para alterar este registro.",
                status: 403
            });
        }
        if (recordDTO.end) { babyRecord.setEnd(new Date(recordDTO.end)); }
        if (recordDTO.init) { babyRecord.setInit(new Date(recordDTO.init)); }
        if (recordDTO.observations) { babyRecord.setObservations(recordDTO.observations); }
        if (recordDTO.temperature) { babyRecord.setTemperature(recordDTO.temperature); }
        if (recordDTO.height) { babyRecord.setHeight(recordDTO.height); }
        if (recordDTO.weight) { babyRecord.setWeight(recordDTO.weight); }
        if (recordDTO.sleepQuality) { babyRecord.setSleepQuality(recordDTO.sleepQuality); }
        if (recordDTO.breastfeedingType) { babyRecord.setBreastfeedingType(recordDTO.breastfeedingType); }
        if (recordDTO.breastfeedingAmount) { babyRecord.setBreastfeedingAmount(recordDTO.breastfeedingAmount); }
        const result = await this.babyRecordRepository.updateRecord(babyRecord);
        if (!result) {
            throw new BaseError({
                message: "Failed to update record on 'babyRecordRepository.update'",
                clientMessage: "Falhou em atualizar o registro.",
                status: 400
            });
        }
    }
}
