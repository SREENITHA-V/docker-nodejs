const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'mydb',
  port: 5432,
});

// Retry logic to connect to the database safely
const connectWithRetry = async () => {
  const maxRetries = 5;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await pool.query('SELECT 1');
      console.log('Successfully connected to PostgreSQL database!');
      break;
    } catch (err) {
      retries++;
      console.log(`Database connection failed (Attempt ${retries}/${maxRetries}). Retrying in 3 seconds...`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
};

app.get('/', async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW()');
    res.send(`Hello from Dockerized Node.js! Database time: ${dbResult.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error!');
  }
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectWithRetry();
});