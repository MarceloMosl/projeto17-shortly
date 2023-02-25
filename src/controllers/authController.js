import { db } from "../config/database.js";
import { v4 as uuid } from "uuid";
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

export async function signIn(req, res) {
  const { email, password } = req.body;

  const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userCheck.rows.length === 0) return res.sendStatus(409);
  if (!bcrypt.compareSync(password, userCheck.rows[0].password))
    return res.sendStatus(409);

  try {
    const token = uuid();

    const regularUser = await db.query(
      `SELECT * FROM sessions WHERE "userId" = $1`,
      [userCheck.rows[0].id]
    );

    if (regularUser.rows.length === 0) {
      await db.query('insert into sessions ("userId", token) values ($1,$2)', [
        userCheck.rows[0].id,
        token,
      ]);
      return res.status(200).send({ token });
    }

    await db.query('UPDATE sessions SET token = $1 WHERE "userId" = $2', [
      token,
      userCheck.rows[0].id,
    ]);

    return res.status(200).send({ token });
  } catch (error) {
    return res.send(error);
  }
}
