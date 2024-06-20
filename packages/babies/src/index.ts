import { HttpController, QueueController } from "./interface-adapters/controllers";
import { RabbitMQAdapter } from "./infra/adapters/queue";
import { BabiesRepository, BabyRecordRepository } from "./infra/adapters/repositories";
import { UsersGateway } from "./infra/adapters/gateways";
import { ExpressAdapter } from "./infra/adapters/http-server/express-adapter";
import { createConnection, ConnectionOptions } from "typeorm";
import connectionOptions from "./ormconfig.json";
import { sleep } from "./utils";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
}

async function run(retries = 5, delay = 10000) {
    await sleep(delay);
    return createConnection(connectionOptions as ConnectionOptions)
        .then(async (connection) => {
            const queue = new RabbitMQAdapter();
            await queue.connect();
            new QueueController(queue, BabiesRepository.build());
            const httpServer = new ExpressAdapter();
            new HttpController(
                httpServer,
                BabyRecordRepository.build(),
                BabiesRepository.build(),
                new UsersGateway()
            );
            httpServer.listen(3001);
        })
        .catch(async () => {
            if (retries === 0) throw new Error("Failed to connect to mysql");
            run(retries - 1, delay);
        });
}

run().catch(logFatal);
