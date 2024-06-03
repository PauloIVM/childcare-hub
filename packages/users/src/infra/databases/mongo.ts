import * as mongoose from "mongoose";

export class MongoDbClient {
    public url: string;

    constructor() {
        this.url = process.env.MONGO_DB_URL;
    }

    public async connect() {
        if (!this.url) {
            throw new Error(
                "Please define MONGO_DB_URL to setup the database."
            );
        }
        await mongoose.connect(this.url);
    }

    public async disconnect() {
        await mongoose.disconnect();
    }

    async populate() {
        if (process.env.NODE_ENV === "test") {
            // TODO: Criar 'test-fixtures' para testes automatizados com o mongo; talvez
            //       deixar o orquestrador de testes lidar com isso?? Se sim, apagar isso
            //       daqui. 
            // await populate();
        } else {
            throw new Error("Only works in test environments (NODE_ENV=test)");
        }
    }

    async cleanPopulate() {
        if (process.env.NODE_ENV === "test") {
            // await cleanPopulate();
        } else {
            throw new Error("Only works in test environments (NODE_ENV=test)");
        }
    }
}
