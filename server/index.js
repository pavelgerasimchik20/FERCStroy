const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

function validatePayload({ name, phone, message }) {
  const errors = {};
  if (!name || String(name).trim().length < 2) errors.name = 'Имя минимум 2 символа';
  if (!message || String(message).trim().length < 2) errors.message = 'Сообщение минимум 2 символа';
  const phoneStr = String(phone || '').replace(/\s+/g, '');
  if (!/^(\+375|80)\d{9}$/.test(phoneStr)) {
    errors.phone = 'Телефон в формате +375XXXXXXXXX или 80XXXXXXXXX';
  }
  return errors;
}

app.post('/api/messages', (req, res) => {
  const { name, phone, message } = req.body;
  const errors = validatePayload({ name, phone, message });
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const stmt = db.prepare('INSERT INTO messages (name, phone, message) VALUES (?, ?, ?)');
  stmt.run(name.trim(), phone.trim(), message.trim(), function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
