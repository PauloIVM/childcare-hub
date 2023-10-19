import * as http from "http";
import app from "./app";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    process.exit(1);
}

async function run() {
    // TODO: Inicializar o banco:
    // const dbConfig = new DBConfig();
    // await dbConfig.connect();

    const server = http.createServer(app);

    server.listen(3001, "::", () => {
        if (process.env.NODE_ENV !== "production") {
            console.log(`API http server running on port ${3001}`);
        }
    });

    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 62 * 1000;
}

run().catch(logFatal);
