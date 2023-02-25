import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaUser } from "../schemas/signUpSchema.js";

const authRoute = Router();

authRoute.post("/users", validateSchema(schemaUser), signUp);
authRoute.post("/singin", signIn);

export default authRoute;