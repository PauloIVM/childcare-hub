import { QueueController } from "./interface-adapters/queue/controller";
import { HttpRouter } from "./interface-adapters/routers/http";
import { RabbitMQAdapter } from "./infra/adapters/queue";
import { BabiesRepository, BabyRecordRepository } from "./infra/adapters/repositories";
import { UsersGateway } from "./infra/adapters/gateways";
import { ExpressAdapter } from "./infra/adapters/http-server/express-adapter";
import { createConnection, ConnectionOptions } from "typeorm";
import connectionOptions from "./ormconfig.json";
import { sleep } from "./utils";

// TODO: Implementar essa lógica de retries separado por cada docker-service tbm no
//       'users'. Criar uma forma de verificar se as imagens docker já foram baixadas;
//       se sim, devo ter poucos retries... senão, devo ter muitos retries. Ou, deixar muitos
//       e simplesmente logar no prompt cada retry... se o dev já tiver as imagens baixadas
//       ele pode desconfiar que esse é o problema... talvez um log como:
//              "Retry-count = 12. Awaiting service X initiate..."
async function run(retries = 30, delay = 1000) {
    const queue = new RabbitMQAdapter();
    await queue.connect(retries, delay);
    await typeormConnect(connectionOptions as ConnectionOptions, retries, delay);
    new QueueController(queue, BabiesRepository.build());
    const httpServer = new ExpressAdapter(
        new UsersGateway(),
        BabiesRepository.build(),
        BabyRecordRepository.build(),
    );
    new HttpRouter(httpServer);
    httpServer.listen(3001);
}

async function typeormConnect(
    connectionOptions: ConnectionOptions,
    retries: number,
    delay: number
): Promise<void> {
    await sleep(delay);
    try {
        await createConnection(connectionOptions as ConnectionOptions);
    } catch (error) {
        if (retries === 0) throw error;
        return typeormConnect(connectionOptions, retries - 1, delay);
    }
}

run().catch((err: Error) => {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
});
