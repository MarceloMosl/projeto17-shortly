import { Router } from "express";
import { postUrl } from "../controllers/urlController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlPostSchema } from "../schemas/postUrlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlPostSchema), postUrl);

export default urlRouter;
