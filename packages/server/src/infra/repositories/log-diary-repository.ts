/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { InjectorFactory } from "../../utils";
import { LogDiaryModel } from "../models/log-diary-model";
import { LogDiary } from "../../domain/log-diary";
import { ILogDiaryRepository } from "../../usecases/repositories/log-diary-repository";

@EntityRepository(LogDiaryModel)
export class LogDiaryRepository extends Repository<LogDiaryModel> implements ILogDiaryRepository {
    public getCustomRepository() {
        return getCustomRepository(LogDiaryRepository);
    }

    public async findByUserId(userId: string): Promise<LogDiary[]> {
        return this.find({ where: { userId } });
    }

    public findByUserEmail(email: string) {
        return this.find({ where: { user: { email } } });
    }

    public async insertLog({ action, observations, init, end, userId }: LogDiary) {
        const log = LogDiaryModel.build({
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

    public async updateLog(id: string, fields: Partial<LogDiary>) {
        const result = await this.createQueryBuilder()
            .update(LogDiaryModel)
            .set(fields)
            .where({ id })
            .execute();
        // TODO: O que é retornado se houver um error? Conferir aqui...
        return !!result.affected;
    }

    public async deleteLog(id: string) {
        const result = await this.createQueryBuilder()
            .delete()
            .from(LogDiaryModel)
            .where({ id })
            .execute();
        return !!result.affected;
    }
}

export const userRepositoryFactory = new InjectorFactory(LogDiaryRepository);
