import express, { json } from "express";
import cors from "cors";
import { db } from "./config/database.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(json());

app.get("/", async (req, res) => {
  const promise = await db.query("SELECT * FROM teste");

  res.send(promise.rows);
});

app.use([authRoute]);

app.listen(PORT, () => console.log("Server On"));
