const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

// Fetch all messages
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY added DESC"
    );
    res.render("index", { title: "Mini Messageboard", messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Render the new message form
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// Add a new message
router.post("/new", async (req, res) => {
  const { messageText, messageUser } = req.body;
  try {
    await pool.query("INSERT INTO messages (text, user_name) VALUES ($1, $2)", [
      messageText,
      messageUser,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// View a specific message
router.get("/message/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      res.render("message", { message: result.rows[0] });
    } else {
      res.status(404).send("Message not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
