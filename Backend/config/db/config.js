const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.USER,   // username of postgresql database
  host: process.env.HOST,   // localhost
  database: process.env.DATABASE,   // your database name
  password: process.env.PASSWORD,   // your database password
  port: process.env.PORT, // Default PostgreSQL port
});

// Log a message indicating successful connection
pool.connect(() => {
    console.log("PostgreSQL Database Successfully Connected");
});

module.exports = pool;
