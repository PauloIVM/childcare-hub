import { HttpController } from "@/interface-adapters/controllers";
import { ServicesNotifierQueueAdapter } from "@/interface-adapters/adapters/gateways";
import { MongoDbClient } from "@/infra/databases";
import { ExpressAdapter } from "@/infra/adapters/http-server/express-adapter";
import { UsersDataMapper } from "@/infra/adapters/data-mappers";
import { RabbitMQAdapter } from "@/infra/adapters/queue";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
}

async function run() {
    const mongoDbClient = new MongoDbClient();
    const queue = new RabbitMQAdapter();
    await queue.connect();
    await mongoDbClient.connect();
    const servicesNotifier = new ServicesNotifierQueueAdapter(queue);
    const httpServer = new ExpressAdapter();
    const usersDataMapper = new UsersDataMapper();
    new HttpController(httpServer, usersDataMapper, servicesNotifier);
    httpServer.listen(3003);
}

run().catch(logFatal);
