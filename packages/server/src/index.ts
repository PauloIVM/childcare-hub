import * as http from "http";
import { createConnection, ConnectionOptions } from "typeorm";
import connectionOptions from "./ormconfig.json";
import app from "./app";
import { sleep } from "./utils";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
}

async function run(retries = 5, delay = 2000) {
    // TODO: O "extendConnectionOptions" q o pessoal usa por cima desse cara la no MC
    // eh justamente pra sobrescrever as variaveis de producao do banco... como a senha
    // e url q esta ali no ormconfig. Depois vou ter que fazer a mesma coisa aqui; vai
    // ser bom eu usar isso tbm pra senha local do DB, nao correr risco da pessoa commitar.
    return createConnection(connectionOptions as ConnectionOptions)
        .then(async (connection) => {
            const server = http.createServer(app);
            server.listen(3001, "::", () => {
                if (process.env.NODE_ENV !== "production") {
                    console.log(`API http server running on port ${3001}`);
                }
            });
            server.keepAliveTimeout = 61 * 1000;
            server.headersTimeout = 62 * 1000;
            // TODO: Replicar o gracefullShutdown...
        })
        .catch(async () => {
            if (retries === 0) throw new Error("Failed to connect to mysql");
            await sleep(delay);
            run(retries - 1, delay);
        });
}

run().catch(logFatal);
