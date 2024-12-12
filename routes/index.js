const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "Hi there",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

router.get('/message/:id', (req, res) => {
  const id = req.params.id;
  const message = messages[id];
  if (message) {
      res.render('message', { message });
  } else {
      res.status(404).send('Message not found');
  }
});


router.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

module.exports = router;
