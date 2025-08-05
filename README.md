# Simple Calculator with Logs

This is a simple web-based calculator that performs basic arithmetic operations (like +, –, ×, ÷, %) and keeps a log of all calculations.  
The logs are stored both in a MySQL database and in a local `logs.txt` file using Node.js and Express.js on the backend.

---

## Tech Stack

**Frontend**  
- HTML  
- CSS  
- JavaScript  

**Backend**  
- Node.js  
- Express.js  

**Database**  
- MySQL  

**Other**  
- File System (`fs` module)

---

## Project Structure

```plaintext
simple-calculator-logs/
├── controller/
│   └── logController.js
├── model/
│   └── db.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── routes/
│   └── logRoutes.js
├── logs.txt
├── server.js
└── README.md
```

---

## Features

- Perform basic math operations  
- Logs saved in MySQL and logs.txt  
- View latest 10 calculations  
- Option to clear logs  
- Smooth animations and mobile-friendly UI  

---

## How to Run This Project

1. **Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/simple-calculator-logs.git
cd simple-calculator-logs
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up MySQL**

```sql
CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  expression VARCHAR(255),
  result VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Start the Server**

```bash
node app.js
```

5. **Open the Frontend**  
Open `public/index.html` in your browser and start calculating!

---

## Author

Made by **Priyanshi Bilodiya**  
📫 bilodiyapriyanshhi26@gmail.com
