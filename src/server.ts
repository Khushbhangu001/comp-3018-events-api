import venueRouter from "./routes/venue.routes";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/venues", venueRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

