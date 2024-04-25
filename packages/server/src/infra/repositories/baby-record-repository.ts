/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { BabyRecordModel } from "@/infra/models/baby-record-model";
import { BabyRecord } from "@/domain/baby-record";
import { IBabyRecordRepository } from "@/application/repositories/baby-record-repository";
import { IBabyRecordDTO } from "@/application/dtos/baby-record-dto";

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

    public async insertRecord(dto: IBabyRecordDTO) {
        const {
            actionName,
            observations,
            init,
            end,
            userId,
            height,
            weight,
            temperature,
            breastfeedingAmount,
            breastfeedingType,
            sleepQuality,
        } = dto;
        const recordModel = BabyRecordModel.build({
            action: actionName,
            observations,
            init,
            end,
            userId,
            height,
            weight,
            temperature,
            breastfeedingAmount,
            breastfeedingType,
            sleepQuality,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const recordEntity = this.parseModelToEntity(recordModel);
        await this.save(recordModel);
        return recordEntity;
    }

    public async updateRecord(babyRecord: BabyRecord) {
        const result = await this.createQueryBuilder()
            .update(BabyRecordModel)
            .set({
                observations: babyRecord.observations,
                init: babyRecord.init,
                end: babyRecord.end,
                temperature: babyRecord.temperature,
                height: babyRecord.height,
                weight: babyRecord.weight,
                sleepQuality: babyRecord.sleepQuality,
                breastfeedingType: babyRecord.breastfeedingType,
                breastfeedingAmount: babyRecord.breastfeedingAmount
            })
            .where({ id: babyRecord.id })
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
        return new BabyRecord(r.id, r.userId, r.action, r.init)
            .setObservations(r.observations)
            .setEnd(r.end)
            .setHeight(r.height)
            .setWeight(r.weight)
            .setTemperature(r.temperature)
            .setBreastfeedingAmount(r.breastfeedingAmount)
            .setBreastfeedingType(r.breastfeedingType as BabyRecord["breastfeedingType"])
            .setSleepQuality(r.sleepQuality as BabyRecord["sleepQuality"])
    }
}
