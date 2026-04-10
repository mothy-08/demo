const express = require("express");
const { searchProducts } = require("../utils/db");

const express = require("express");
const db = require("../utils/db");

const router = express.Router();

router.get("/", (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing search query parameter: q" });
  }

  const sql = `SELECT * FROM products WHERE name LIKE '%${q}%'`;

  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    res.json({ results: rows });
  });
});

module.exports = router;
