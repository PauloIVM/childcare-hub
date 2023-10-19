import express from "express";
import cookieParser from "cookie-parser";
import "express-async-errors";
const app = express();

// INFO: A rota de login, posso me basear no que foi desenvolvido no MC...

app.disable("x-powered-by");
app.enable("trust proxy");
app.use(express.json());
app.use(cookieParser());
// TODO: Criar rotas básicas:
// app.use("/api", router);
app.use("/api", (req, res) => {
    res.send("Hellow, I'm working...\n");
    return;
});

// TODO: Criar middlewares pra errors em geral:
// app.use(errorHandler);

export default app;
