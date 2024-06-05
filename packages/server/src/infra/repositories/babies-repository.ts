/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Baby } from "@/domain";
import { IBabiesRepository } from "@/application/repositories";
import { IBabyDTO } from "@/application/dtos";
import { BabiesModel } from "@/infra/models";

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
            // TODO: Puxar os ids dos parents...
            []
        );
    }

    public async saveBaby({ name, gender, birthday }: IBabyDTO): Promise<Baby> {
        const modelEl = BabiesModel.build({ createdAt: new Date(), updatedAt: new Date() });
        const baby = new Baby(
            modelEl.id,
            name,
            gender,
            new Date(birthday),
            // TODO: Gerar dinamicamente os parentIds...
            []
        );
        // const user = User.create(modelEl.id, name, email, password);
        // modelEl.email = email;
        // modelEl.userName = name;
        // modelEl.passwordHash = user.password.hash;
        await this.save(modelEl);
        return baby;
    }

    public async updateBaby(baby: Baby): Promise<boolean> {
        const result = await this.createQueryBuilder()
            .update(BabiesModel)
            .set({
                name: baby.name,
                gender: baby.gender,
                birthday: baby.birthday,
            })
            .where({ id: baby.id })
            .execute();
        return !!result.affected;
    }
}
