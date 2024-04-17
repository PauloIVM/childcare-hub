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

    public async findByUserId(userId: string): Promise<BabyRecord[]> {
        return this.find({ where: { userId } });
    }

    public async findById(id: string): Promise<BabyRecord> {
        return this.findOne({ where: { id } });
    }

    public findByUserEmail(email: string) {
        return this.find({ where: { user: { email } } });
    }

    public async insertLog({ action, observations, init, end, userId }: BabyRecord) {
        const log = BabyRecordModel.build({
            action,
            observations,
            init,
            end,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await this.save(log);
        // TODO: Adicionar um try-catch e em caso de um error, lançar um exceção com
        // uma mensagem que deverá ser capturada lá no controller...
        return true;
    }

    public async updateLog(id: string, fields: Partial<BabyRecord>) {
        const result = await this.createQueryBuilder()
            .update(BabyRecordModel)
            .set(fields)
            .where({ id })
            .execute();
        // TODO: O que é retornado se houver um error? Conferir aqui...
        return !!result.affected;
    }

    public async deleteLog(id: string) {
        const result = await this.createQueryBuilder()
            .delete()
            .from(BabyRecordModel)
            .where({ id })
            .execute();
        return !!result.affected;
    }
}

export const userRepositoryFactory = new InjectorFactory(BabyRecordRepository);