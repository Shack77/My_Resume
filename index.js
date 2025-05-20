const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const entry = `\nName: ${name}\nEmail: ${email}\nMessage: ${message}\nDate: ${new Date().toISOString()}\n---`;
  fs.appendFile('contacts.txt', entry, (err) => {
    if (err) return res.status(500).json({ error: 'Could not save message' });
    res.status(200).json({ message: 'Message received!' });
  });
});

app.listen(port, () => {
  console.log(`Contact form backend running at http://localhost:${port}`);
});
