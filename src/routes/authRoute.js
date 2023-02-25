import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaUser } from "../schemas/signUpSchema.js";

const authRoute = Router();

authRoute.post("/users", validateSchema(schemaUser), signUp);

export default authRoute;
