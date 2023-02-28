import express, { json } from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import urlRouter from "./routes/urlRoute.js";
import userRouter from "./routes/useRoute.js";
import rankRouter from "./routes/rankRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.use([authRoute, urlRouter, userRouter, rankRouter]);

app.listen(PORT, () => console.log("Server On"));
