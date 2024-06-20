const fs = require("fs");
const path = require("path");

(() => {
    fs.writeFileSync(path.join(__dirname, "../src/ormconfig.json"), JSON.stringify({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: "childcare",
        port: 3307,
        logging: true,
        migrations: ["build/infra/migrations/*.js"],
        migrationsRun: true,
        cli: {
            migrationsDir: "src/infra/migrations"
        },
        entities: ["build/infra/models/**/*.js"]
    }, null, 2));
})();
