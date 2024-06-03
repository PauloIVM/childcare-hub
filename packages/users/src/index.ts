import { MongoDbClient } from "@/infra/databases";
import { ExpressAdapter } from "@/infra/adapters/http-server/express-adapter";
import { UsersDataMapper } from "@/infra/adapters/data-mappers";
import { HttpController } from "@/interface-adapters/controllers";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
}

async function run() {
    const mongoDbClient = new MongoDbClient();
    await mongoDbClient.connect();
    const httpServer = new ExpressAdapter();
    const usersDataMapper = new UsersDataMapper();
    new HttpController(httpServer, usersDataMapper);
    httpServer.listen(3003);
}

run().catch(logFatal);
