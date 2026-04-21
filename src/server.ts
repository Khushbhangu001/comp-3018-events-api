import venueRouter from "./routes/venue.routes";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/venues", venueRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

