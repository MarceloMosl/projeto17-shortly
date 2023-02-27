import { db } from "../config/database.js";

export async function getUsers(req, res) {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const tokenActive = await db.query(
    "SELECT * FROM sessions WHERE token = $1",
    [token]
  );

  if (tokenActive.rows.length === 0) return res.sendStatus(401);

  const userId = tokenActive.rows[0].userId;

  const userUrls = await db.query('SELECT * FROM urls WHERE "userId" = $1', [
    userId,
  ]);

  const visitSum = userUrls.rows.map((a) => a.visitCount);

  const promise = await db.query(
    `SELECT json_build_object(
        'id', users.id,
        'name', users.name,
        'visitCount',  ${visitSum.reduce((a, b) => a + b, 0)},
        'shortenedUrls', json_agg(
          json_build_object(
            'id', urls.id,
            'shortUrl', urls."shortUrl",
            'url', urls."fullUrl",
            'visitCount', urls."visitCount"
          )
        )
      ) 
      FROM urls 
      JOIN users ON users.id = urls."userId"
      WHERE users.id = ${userId}
      GROUP BY users.id, users.name;
        `
  );

  return res.send(promise.rows[0].json_build_object);
}
