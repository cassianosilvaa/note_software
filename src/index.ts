import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { userRoutes } from "./routes/user.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes());

app.listen(3333, () => {
    console.log("API está rodando!");
});
