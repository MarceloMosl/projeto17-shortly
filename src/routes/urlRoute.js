import { Router } from "express";
import {
  deleteUrl,
  getUrl,
  openUrl,
  postUrl,
} from "../controllers/urlController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlPostSchema } from "../schemas/postUrlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlPostSchema), postUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.delete("/urls/:id", deleteUrl);

export default urlRouter;
