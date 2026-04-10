const express = require("express");
const db = require("../utils/db");

const router = express.Router();

router.get("/", (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing search query parameter: q" });
  }

  // Use parameterized queries to prevent SQL injection
  const sql = "SELECT * FROM products WHERE name LIKE ?";
  const queryParam = `%${q}%`;

  db.query(sql, [queryParam], (err, rows) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    res.json({ results: rows });
  });
});

module.exports = router;