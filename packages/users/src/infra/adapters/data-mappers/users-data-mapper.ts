import { IUsersDataMapper } from "@/interface-adapters/ports/data-mappers";
import { IUsersModel } from "@/interface-adapters/ports/models";
import * as Mongoose from "mongoose";

const Schema = new Mongoose.Schema<IUsersModel>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password_hash: { type: String, required: true },
    updated_at: { type: Date, required: true },
    created_at: { type: Date, required: true },
}, { collection: "users", _id: false });

const UsersModel = Mongoose.model<IUsersModel>("users", Schema);

export class UsersDataMapper implements IUsersDataMapper {
    async findOne(model: IUsersModel): Promise<IUsersModel> {
        const result = await UsersModel.findOne(model);
        if (!result) return;
        return {
            id: result.id as string,
            name: result.name as string,
            email: result.email as string,
            password_hash: result.password_hash as string,
            updated_at: new Date(result.updated_at) as Date,
            created_at: new Date(result.created_at) as Date,
        };
    }

    async save(model: IUsersModel): Promise<IUsersModel> {
        await UsersModel.insertMany([model]);
        return model;
    }

    async update(model: IUsersModel, query: IUsersModel): Promise<boolean> {
        await UsersModel.updateOne(query, model);
        return true;
    }
}

