import * as http from "http";
import app from "./app";

function logFatal(err: Error) {
    // TODO: Implementar loggers...
    console.error(err);
    process.exit(1);
}

async function run() {
    const server = http.createServer(app);
    server.listen(3003, "::", () => {
        if (process.env.NODE_ENV !== "production") {
            console.log(`API http server running on port ${3003}`);
        }
    });
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 62 * 1000;
}

run().catch(logFatal);
