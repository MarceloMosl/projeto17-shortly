import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaLogin } from "../schemas/signInSchema.js";
import { schemaUser } from "../schemas/signUpSchema.js";

const authRoute = Router();

authRoute.post("/signup", validateSchema(schemaUser), signUp);
authRoute.post("/signin", validateSchema(schemaLogin), signIn);

export default authRoute;
