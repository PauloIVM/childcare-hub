import { HttpController } from "@/interface-adapters/controllers";
import { ServicesNotifierQueueAdapter } from "@/interface-adapters/adapters/gateways";
import { MongoDbClient } from "@/infra/databases";
import { ExpressAdapter } from "@/infra/adapters/http-server/express-adapter";
import { UsersDataMapper } from "@/infra/adapters/data-mappers";
import { RabbitMQAdapter } from "@/infra/adapters/queue";
import { sleep } from "@/utils";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
}

async function run(retries = 5, delay = 10000) {
    await sleep(delay);
    try {
        const mongoDbClient = new MongoDbClient();
        const queue = new RabbitMQAdapter();
        await queue.connect();
        await mongoDbClient.connect();
        const servicesNotifier = new ServicesNotifierQueueAdapter(queue);
        const httpServer = new ExpressAdapter();
        const usersDataMapper = new UsersDataMapper();
        new HttpController(httpServer, usersDataMapper, servicesNotifier);
        httpServer.listen(3003);   
    } catch (error) {
        if (retries === 0) throw new Error("Failed to connect to mysql");
        run(retries - 1, delay);
    }
}

run().catch(logFatal);
