/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository, getConnection } from "typeorm";
import { Baby } from "@/domain";
import { IBabiesRepository } from "@/application/repositories";
import { IBabyDTO } from "@/application/dtos";
import { BabiesModel, ParenthoodModel } from "@/infra/models";

@EntityRepository(BabiesModel)
export class BabiesRepository extends Repository<BabiesModel> implements IBabiesRepository {
    private constructor() { super(); }

    static getInstance() {
        return getCustomRepository(BabiesRepository);
    }

    public async findById(id: string): Promise<Baby> {
        const modelEl = await this.findOne({ where: { id } });
        if (!modelEl) return;
        return new Baby(
            modelEl.id,
            modelEl.name,
            modelEl.gender === "M" ? "male" : "female",
            new Date(modelEl.birthday),
            modelEl.parenthoods.map((p) => p.parentId)
        );
    }

    public async saveBaby({ name, gender, birthday, parentIds }: IBabyDTO): Promise<Baby> {
        const queryRunner = getConnection().createQueryRunner();
        queryRunner.startTransaction();
        try {
            const result = await queryRunner.manager.createQueryBuilder()
                .insert()
                .into(BabiesModel)
                .values({
                    name,
                    gender: gender === "male" ? "M" : "F",
                    birthday
                })
                .execute();
            const babyId = result.identifiers[0].id as string;
            await queryRunner.manager.createQueryBuilder()
                .insert()
                .into(ParenthoodModel)
                .values(parentIds.map((pid) => ({ id: `${pid}${babyId}`, parentId: pid, babyId })))
                .execute();
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return new Baby(babyId, name, gender, birthday, parentIds);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }

    public async updateBaby(baby: Baby): Promise<boolean> {
        const currentBaby = await this.findById(baby.id);
        const parentIdsToAdd = baby.parentIds.filter((pid) => !currentBaby.parentIds.includes(pid));
        const parentIdsToRemove = currentBaby.parentIds.filter((pid) => !baby.parentIds.includes(pid));
        const queryRunner = getConnection().createQueryRunner();
        queryRunner.startTransaction();
        try {
            for (const parentId of parentIdsToAdd) {
                await queryRunner.manager.createQueryBuilder()
                    .insert()
                    .into(ParenthoodModel)
                    .values({ id: `${parentId}${baby.id}`, parentId, babyId: baby.id })
                    .execute();
            }
            for (const parentId of parentIdsToRemove) {
                await queryRunner.manager.createQueryBuilder()
                    .delete()
                    .from(ParenthoodModel)
                    .where({ id: `${parentId}${baby.id}`, parentId, babyId: baby.id })
                    .execute();
            }
            const result = await queryRunner.manager.createQueryBuilder()
                .update(BabiesModel)
                .set({
                    name: baby.name,
                    gender: baby.gender,
                    birthday: baby.birthday,
                })
                .where({ id: baby.id })
                .execute();
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return !!result.affected;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }
}
