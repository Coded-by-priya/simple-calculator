const fs = require('fs');
const path = require('path');
const db = require('../model/db');

exports.saveLog = (req, res) => {
  const { expression, result } = req.body;

  const sql = 'INSERT INTO logs (expression, result) VALUES (?, ?)';
  db.query(sql, [expression, result], (err, resultDb) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ message: 'DB insert failed' });
    }

    // Write to logs.txt
    const logLine = `${expression} = ${result}\n`;
    const logPath = path.join(__dirname, '../logs.txt');

    fs.appendFile(logPath, logLine, (err) => {
      if (err) {
        console.error("File write error:", err);
      } else {
        console.log("Log written to logs.txt");
      }

      res.status(200).json({ message: 'Log saved to DB and file' });
    });
  });
};
