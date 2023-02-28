import { db } from "../config/database.js";

export async function getRank(req, res) {
  try {
    const promise = await db.query(
      `SELECT users.id,users.name,
COALESCE(COUNT(urls.id), 0) AS "linksCount",
COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
FROM users LEFT JOIN urls ON users.id = urls."userId" 
GROUP BY users.id
ORDER BY "visitCount" DESC limit = 10; `
    );
    return res.send(promise.rows);
  } catch (error) {
    return res.send(error);
  }
}
