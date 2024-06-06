/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { BabiesModel, BabyRecordModel } from "@/infra/models";
import { BabyRecord, Baby, BabyAction } from "@/domain";
import { IBabyRecordRepository } from "@/application/repositories";
import { IBabyRecordDTO } from "@/application/dtos";

@EntityRepository(BabyRecordModel)
export class BabyRecordRepository extends Repository<BabyRecordModel> implements IBabyRecordRepository {
    private constructor() { super(); }

    static getInstance() {
        return getCustomRepository(BabyRecordRepository);
    }

    public async findByBabyId(babyId: string, skip: number = 0, limit: number): Promise<BabyRecord[]> {
        const maxLimit = 100;
        const modelRecords = await this.find({
            where: { babyId },
            order: { init: "DESC" },
            skip,
            take: limit <= maxLimit ? limit : maxLimit,
            relations: ["baby"]
        });
        return modelRecords.map(this.parseModelToEntity);
    }

    public async findById(id: string): Promise<BabyRecord> {
        const modelRecord = await this.findOne({ where: { id }, relations: ["baby"] });
        return this.parseModelToEntity(modelRecord);
    }

    public async getCount(babyId: string): Promise<number> {
        return this.count({ where: { baby: { id: babyId } } });
    }

    public async insertRecord(dto: IBabyRecordDTO) {
        const {
            actionName,
            observations,
            init,
            end,
            babyId,
            height,
            weight,
            temperature,
            breastfeedingAmount,
            breastfeedingType,
            sleepQuality,
        } = dto;

        const result = await this.createQueryBuilder()
            .insert()
            .into(BabyRecordModel)
            .values({
                action: actionName,
                observations,
                init,
                end,
                height,
                weight,
                temperature,
                breastfeedingAmount,
                breastfeedingType,
                sleepQuality,
                createdAt: new Date(),
                updatedAt: new Date(),
                baby: { id: babyId } 
            })
            .execute();
        
        const recordId = result.identifiers[0].id as string;
        return this.findById(recordId);
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
        return new BabyRecord(
            r.id,
            new Baby(
                r.baby.id,
                r.baby.name,
                r.baby.gender === "M" ? "male" : "female",
                new Date(r.baby.birthday),
                r.baby.parenthoods.map((p) => p.parentId)
            ),
            new BabyAction(r.action),
            r.init
        )
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
