import { db } from "../config/database.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { authorization } = req.headers;
  const { url } = req.body;

  if (!authorization) return res.sendStatus(401);

  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const tokenActive = await db.query(
    "SELECT * FROM sessions WHERE token = $1",
    [token]
  );

  if (tokenActive.rows.length === 0) return res.sendStatus(401);

  const userId = tokenActive.rows[0].userId;

  try {
    const urlTrim = nanoid(8);

    await db.query(
      'INSERT INTO urls ("userId", "shortUrl", "fullUrl") values ($1,$2,$3)',
      [userId, urlTrim, url]
    );

    const promise = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [
      urlTrim,
    ]);

    return res
      .status(201)
      .send({ id: promise.rows[0].id, shortUrl: promise.rows[0].shortUrl });
  } catch (error) {
    return res.send(error);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const promise = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [
      id,
    ]);

    if (promise.rows.length === 0) return res.status(404);

    return res.send({
      id: promise.rows[0].id,
      shortUrl: promise.rows[0].shortUrl,
      url: promise.rows[0].fullUrl,
    });
  } catch (error) {
    return res.send(error);
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params;

  const validateUrl = await db.query(
    'SELECT * FROM urls WHERE "shortUrl" = $1',
    [shortUrl]
  );
  if (validateUrl.rows.length == 0) return res.sendStatus(404);

  await db.query(
    'UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"  = $1;',
    [shortUrl]
  );

  return res.redirect(validateUrl.rows[0].fullUrl);
}
