import { Router } from "express";
import { getRank } from "../controllers/rankController.js";

const rankRouter = Router();

rankRouter.get("/rank", getRank);

export default rankRouter;
