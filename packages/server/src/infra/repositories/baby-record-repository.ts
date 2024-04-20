/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { InjectorFactory } from "../../utils";
import { BabyRecordModel } from "../models/baby-record-model";
import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../../usecases/repositories/baby-record-repository";

@EntityRepository(BabyRecordModel)
export class BabyRecordRepository extends Repository<BabyRecordModel> implements IBabyRecordRepository {
    public getCustomRepository() {
        return getCustomRepository(BabyRecordRepository);
    }

    // TODO: Instanciar a entidade BabyRecord
    public async findByUserId(userId: string, skip: number = 0, limit: number): Promise<BabyRecord[]> {
        const maxLimit = 100;
        return this.find({
            where: { userId },
            order: { init: "DESC" },
            skip,
            take: limit <= maxLimit ? limit : maxLimit
        });
    }

    // TODO: Instanciar a entidade BabyRecord
    public async findById(id: string): Promise<BabyRecord> {
        return this.findOne({ where: { id } });
    }

    // TODO: Instanciar a entidade BabyRecord
    public findByUserEmail(email: string) {
        return this.find({ where: { user: { email } } });
    }

    public async getCount(userId: string): Promise<number> {
        return this.count({ where: { userId } });
    }

    public async insertRecord({ action, observations, init, end, userId }: BabyRecord) {
        const record = BabyRecordModel.build({
            action,
            observations,
            init,
            end,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await this.save(record);
        return true;
    }

    public async updateRecord(id: string, fields: Partial<BabyRecord>) {
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
}

export const userRepositoryFactory = new InjectorFactory(BabyRecordRepository);
