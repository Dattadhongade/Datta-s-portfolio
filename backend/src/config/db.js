require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', '..', 'data');
const dataFilePath = path.join(dataDir, 'portfolio_data.json');

let pool = null;
let isDbConnected = false;

async function initDatabase() {
  try {
    const sslConfig = process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined;

    // 1. Try to connect to MySQL Server
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      ssl: sslConfig
    });

    const dbName = process.env.DB_NAME || 'portfolio_db';
    
    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();

    // 2. Create Connection Pool
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName,
      ssl: sslConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // 3. Create Tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_state (
        id INT PRIMARY KEY DEFAULT 1,
        state_data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id BIGINT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        mobile_number VARCHAR(50),
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(255),
        description TEXT NOT NULL,
        unread BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if portfolio_state has row, else seed from file
    const [rows] = await pool.query(`SELECT id FROM portfolio_state WHERE id = 1;`);
    if (rows.length === 0 && fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      await pool.query(`INSERT INTO portfolio_state (id, state_data) VALUES (1, ?);`, [fileData]);
    }

    isDbConnected = true;
    console.log(`🟢 MySQL Database Connected Successfully: \`${dbName}\``);
    return true;
  } catch (err) {
    console.warn(`🟡 MySQL Connection Info: ${err.message}`);
    console.log(`💾 Using Persistent File Database (backend/data/portfolio_data.json) with seamless sync`);
    isDbConnected = false;
    return false;
  }
}

async function getPortfolioData() {
  if (isDbConnected && pool) {
    try {
      const [rows] = await pool.query(`SELECT state_data FROM portfolio_state WHERE id = 1;`);
      if (rows.length > 0 && rows[0].state_data) {
        return JSON.parse(rows[0].state_data);
      }
    } catch (err) {
      console.error('Error fetching from MySQL, reading from file:', err);
    }
  }

  // File fallback
  try {
    if (fs.existsSync(dataFilePath)) {
      return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading JSON file:', e);
  }
  return {};
}

async function savePortfolioData(data) {
  // 1. Always save to JSON file
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing to JSON file:', e);
  }

  // 2. If MySQL connected, sync to MySQL table
  if (isDbConnected && pool) {
    try {
      const jsonStr = JSON.stringify(data);
      await pool.query(
        `INSERT INTO portfolio_state (id, state_data) VALUES (1, ?) 
         ON DUPLICATE KEY UPDATE state_data = VALUES(state_data);`,
        [jsonStr]
      );
    } catch (err) {
      console.error('Error saving to MySQL:', err);
    }
  }
  return true;
}

async function saveContactMessage(msg) {
  if (isDbConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO contact_inquiries (id, first_name, last_name, mobile_number, email, subject, description, unread)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [msg.id, msg.firstName, msg.lastName || '', msg.mobileNumber || '', msg.email, msg.subject || '', msg.description, msg.unread ? 1 : 0]
      );
    } catch (err) {
      console.error('Error inserting into MySQL contact_inquiries:', err);
    }
  }
}

module.exports = {
  initDatabase,
  getPortfolioData,
  savePortfolioData,
  saveContactMessage,
  isDbConnected: () => isDbConnected
};
