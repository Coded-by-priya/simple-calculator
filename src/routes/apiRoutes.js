const express = require('express');
const router = express.Router();
const controller = require('../controller/logController');
const db = require('../model/db'); 

// POST route
router.post('/log', controller.saveLog);

// GET route to fetch logs
router.get('/logs', (req, res) => {
  const query = 'SELECT * FROM logs ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB fetch error' });
    }
    res.json(results);
  });
});

// GET route to read logs from logs.txt file
router.get('/logs/file', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const logPath = path.join(__dirname, '../logs.txt');

  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      console.error("File read error:", err);
      return res.status(500).json({ message: "Failed to read logs.txt" });
    }

    const logs = data.trim().split('\n');
    res.json({ logs });
  });
});

// DELETE all logs
router.delete('/logs/clear', async (req, res) => {
  try {
    const sql = 'DELETE FROM logs'; // assumes your table is named logs
    await db.query(sql);
    res.json({ message: "All logs cleared successfully." });
  } catch (error) {
    console.error("Error clearing logs:", error);
    res.status(500).json({ message: "Failed to clear logs." });
  }
});

module.exports = router;
