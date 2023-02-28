import { Router } from "express";
import { getRank } from "../controllers/rankController.js";

const rankRouter = Router();

rankRouter.get("/ranking", getRank);

export default rankRouter;
