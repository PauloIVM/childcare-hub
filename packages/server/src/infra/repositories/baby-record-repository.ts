/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { InjectorFactory } from "../../utils";
import { BabyRecordModel } from "../models/baby-record-model";
import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../../usecases/repositories/baby-record-repository";
import { IBabyRecordDTO } from "../../usecases/dtos/baby-record-dto";

@EntityRepository(BabyRecordModel)
export class BabyRecordRepository extends Repository<BabyRecordModel> implements IBabyRecordRepository {
    public getCustomRepository() {
        return getCustomRepository(BabyRecordRepository);
    }

    public async findByUserId(userId: string, skip: number = 0, limit: number): Promise<BabyRecord[]> {
        const maxLimit = 100;
        const modelRecords = await this.find({
            where: { userId },
            order: { init: "DESC" },
            skip,
            take: limit <= maxLimit ? limit : maxLimit
        });
        return modelRecords.map(this.parseModelToEntity);
    }

    public async findById(id: string): Promise<BabyRecord> {
        const modelRecord = await this.findOne({ where: { id } });
        return this.parseModelToEntity(modelRecord);
    }

    public async findByUserEmail(email: string): Promise<BabyRecord[]> {
        const modelRecords = await this.find({ where: { user: { email } } });
        return modelRecords.map(this.parseModelToEntity);
    }

    public async getCount(userId: string): Promise<number> {
        return this.count({ where: { userId } });
    }

    public async insertRecord({ actionName, observations, init, end, userId }: IBabyRecordDTO) {
        const recordModel = BabyRecordModel.build({
            action: actionName,
            observations,
            init,
            end,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const recordEntity = this.parseModelToEntity(recordModel);
        await this.save(recordModel);
        return recordEntity;
    }

    public async updateRecord(
        id: string,
        fields: Partial<Pick<IBabyRecordDTO, "init" | "end" | "observations">>
    ) {
        const result = await this.createQueryBuilder()
            .update(BabyRecordModel)
            .set(fields)
            .where({ id })
            .execute();
        return !!result.affected;
    }

    public async deleteRecord(id: string) {
        const result = await this.createQueryBuilder()
            .delete()
            .from(BabyRecordModel)
            .where({ id })
            .execute();
        return !!result.affected;
    }

    private parseModelToEntity(r: BabyRecordModel): BabyRecord {
        return new BabyRecord(
            r.id,
            r.userId,
            r.action,
            r.observations,
            r.init,
            r.end
        )
    }
}

export const userRepositoryFactory = new InjectorFactory(BabyRecordRepository);
