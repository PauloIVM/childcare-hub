import { BabyRecord, BabyAction, BaseError } from "@/domain";
import { IUsersGateway } from "@/application/gateways";
import { IBabyRecordRepository } from "@/application/repositories";

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
        token: string,
        skip: number,
        limit: number
    ): Promise<{ records: BabyRecord[]; count: number; validActions: BabyAction[] }> {
        const [userId, records] = await Promise.all([
            this.usersGateway.getUserId(token),
            this.babyRecordRepository.findByBabyId(babyId, skip, limit)
        ]);
        if (!records.every((r) => r.baby.parentIds.includes(userId))) {
            throw new BaseError({
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
