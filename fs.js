import fs from 'fs';
import http from 'http';
import { EventEmitter } from 'events';

import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adrino123',
  database: 'portfolio_db'
});


const filePath = 'portfolio.json';

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.once('onceEvent', () => {
  console.log('This one-time event has been triggered.');
});

myEmitter.on('newListener', (event, listener) => {
  console.log(`A new listener was added for event: ${event}`);
});

myEmitter.on('portfolioCreated', () => {
  console.log('Event: Portfolio created.');
});
myEmitter.on('portfolioRead', (portfolio) => {
  console.log('Event: Portfolio read:', portfolio);
});

function stockAddedListener(stock) {
  console.log('Event: Stock added:', stock);
}
myEmitter.on('stockAdded', stockAddedListener);

function createPortfolio() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    console.log('Portfolio created successfully.');
    myEmitter.emit('portfolioCreated');
  } else {
    console.log('Portfolio already exists.');
  }
}

function openPortfolio() {
  if (fs.existsSync(filePath)) {
    console.log('Portfolio file found.');
  } else {
    console.log('Portfolio file not found. Creating one...');
    createPortfolio();
  }
}

function readPortfolio() {
  if (!fs.existsSync(filePath)) {
    console.log('No portfolio found. Create one first.');
    return;
  }
  const data = fs.readFileSync(filePath, 'utf8');
  const portfolio = JSON.parse(data);
  console.log('Current Portfolio:', portfolio);
  myEmitter.emit('portfolioRead', portfolio);
}

function addStock(symbol, quantity, price) {
  if (!fs.existsSync(filePath)) {
    console.log('No portfolio found. Create one first.');
    return;
  }
  const data = fs.readFileSync(filePath, 'utf8');
  const portfolio = JSON.parse(data);
  
  const stock = { symbol, quantity, price, total: quantity * price };
  portfolio.push(stock);
  fs.writeFileSync(filePath, JSON.stringify(portfolio, null, 2));
  console.log(`Stock ${symbol} added successfully.`);
  myEmitter.emit('stockAdded', stock);

  const insertQuery = 'INSERT INTO stocks (symbol, quantity, price, total) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [symbol, quantity, price, quantity * price], (err, result) => {
    if (err) {
      console.error('Error inserting stock into MySQL:', err);
    } else {
      console.log('Stock inserted into MySQL with ID:', result.insertId);
    }
  });
}

function closePortfolio() {
  console.log('Portfolio operations completed. File closed.');
}


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
  const createTableQuery = `CREATE TABLE IF NOT EXISTS stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10),
    quantity INT,
    price DECIMAL(10, 2),
    total DECIMAL(10, 2)
  )`;
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Stocks table is ready.');
    }
  });
});

function displayStocks() {
  db.query('SELECT * FROM stocks', (err, results) => {
    if (err) {
      console.error('Error fetching stocks:', err);
    } else {
      console.log('Stocks in MySQL:');
      console.table(results);
    }
  });
}

function removeStockAddedListener() {
  myEmitter.removeListener('stockAdded', stockAddedListener);
  console.log('Removed stockAdded event listener.');
}

const server = http.createServer((req, res) => {
  if (req.url === '/create') {
    createPortfolio();
    res.end('Portfolio created.');
  } else if (req.url === '/open') {
    openPortfolio();
    res.end('Portfolio opened.');
  } else if (req.url === '/read') {
    if (!fs.existsSync(filePath)) {
      res.end('No portfolio found.');
    } else {
      const data = fs.readFileSync(filePath, 'utf8');
      res.end(data);
    }
  } else if (req.url.startsWith('/addStock')) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const symbol = urlObj.searchParams.get('symbol') || 'DEFAULT';
    const quantity = parseInt(urlObj.searchParams.get('quantity')) || 0;
    const price = parseFloat(urlObj.searchParams.get('price')) || 0;
    addStock(symbol, quantity, price);
    res.end(`Stock ${symbol} added.`);
  } else if (req.url === '/displayStocks') {
    db.query('SELECT * FROM stocks', (err, results) => {
      if (err) {
        res.end('Error fetching stocks.');
      } else {
        res.end(JSON.stringify(results));
      }
    });
  } else if (req.url === '/removeListener') {
    removeStockAddedListener();
    res.end('stockAdded listener removed.');
  } else {
    res.end('Invalid endpoint. Try /create, /open, /read, /addStock?symbol=XYZ&quantity=10&price=100, /displayStocks, or /removeListener.');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  myEmitter.emit('onceEvent');
  
  console.log('Number of listeners for stockAdded:', myEmitter.listenerCount('stockAdded'));
  console.log('Listeners for portfolioCreated:', myEmitter.listeners('portfolioCreated'));
});

