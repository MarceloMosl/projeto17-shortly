import { Router } from "express";
import { getUrl, openUrl, postUrl } from "../controllers/urlController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlPostSchema } from "../schemas/postUrlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlPostSchema), postUrl);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", openUrl);

export default urlRouter;
