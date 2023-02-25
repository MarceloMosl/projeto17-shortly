import { db } from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (emailCheck.rows.length !== 0) return res.sendStatus(409);
  if (password !== confirmPassword)
    return res.status(400).send("Passwords dont match");

  try {
    const passwordEncript = bcrypt.hashSync(password, 10);
    await db.query(
      `insert into users (name,email,password) values ($1,$2,$3)`,
      [name, email, passwordEncript]
    );
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
}
