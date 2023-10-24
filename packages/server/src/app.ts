import express from "express";
import cookieParser from "cookie-parser";
import "express-async-errors";
import { router } from "./routes";

const app = express();
app.disable("x-powered-by");
app.enable("trust proxy");
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// TODO: Criar middlewares pra errors em geral:
// app.use(errorHandler);

export default app;
