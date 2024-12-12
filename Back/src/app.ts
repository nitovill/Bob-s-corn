import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./routes/index";

//headers
const app: Application = express();
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/api", routes);

//control de errores
interface error {
  status: number;
  message: string;
}

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default app;
