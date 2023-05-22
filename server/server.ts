import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { appRouter } from "./routes/appRouter";

dotenv.config();

const { PORT = 5001, MONGODB_KEY = "" } = process.env;

if (!MONGODB_KEY) {
  console.error("MONGODB_KEY is missing in the environment variables");
  process.exit(1);
}

mongoose.set("strictQuery", true);

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

app.use("/api", appRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
