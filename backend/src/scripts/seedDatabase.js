require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'portfolio_data.json');

async function seed() {
  console.log("Connecting to MySQL with user:", process.env.DB_USER, "host:", process.env.DB_HOST);
  try {
    const rootConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    const dbName = process.env.DB_NAME || 'portfolio_db';
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database \`${dbName}\` created / verified.`);
    await rootConn.end();

    // Connect to database
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName
    });

    // 1. Create portfolio_state table
    await db.query(`
      CREATE TABLE IF NOT EXISTS portfolio_state (
        id INT PRIMARY KEY DEFAULT 1,
        state_data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // 2. Create projects table
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id BIGINT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        tags JSON,
        image VARCHAR(500),
        github VARCHAR(500),
        demo VARCHAR(500),
        highlights JSON,
        status VARCHAR(50) DEFAULT 'Published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create educations table
    await db.query(`
      CREATE TABLE IF NOT EXISTS educations (
        id BIGINT PRIMARY KEY,
        degree VARCHAR(255) NOT NULL,
        institution VARCHAR(255) NOT NULL,
        duration VARCHAR(100),
        cgpa VARCHAR(50),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create contact_inquiries table
    await db.query(`
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

    // Read portfolio_data.json
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf8');
      const data = JSON.parse(raw);

      // Save full state
      await db.query(
        `INSERT INTO portfolio_state (id, state_data) VALUES (1, ?)
         ON DUPLICATE KEY UPDATE state_data = VALUES(state_data);`,
        [raw]
      );
      console.log("✅ Seeded full portfolio_state into MySQL.");

      // Seed Projects
      if (Array.isArray(data.projects)) {
        for (const p of data.projects) {
          await db.query(
            `INSERT INTO projects (id, title, category, description, tags, image, github, demo, highlights, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE title=VALUES(title), category=VALUES(category), description=VALUES(description), tags=VALUES(tags), image=VALUES(image), github=VALUES(github), demo=VALUES(demo), highlights=VALUES(highlights), status=VALUES(status);`,
            [
              p.id,
              p.title,
              p.category,
              p.description,
              JSON.stringify(p.tags || []),
              p.image,
              p.github || '',
              p.demo || '',
              JSON.stringify(p.highlights || []),
              p.status || 'Published'
            ]
          );
        }
        console.log(`✅ Seeded ${data.projects.length} projects into MySQL table \`projects\`.`);
      }

      // Seed Educations
      if (Array.isArray(data.educations)) {
        for (const e of data.educations) {
          await db.query(
            `INSERT INTO educations (id, degree, institution, duration, cgpa, description)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE degree=VALUES(degree), institution=VALUES(institution), duration=VALUES(duration), cgpa=VALUES(cgpa), description=VALUES(description);`,
            [e.id, e.degree, e.institution, e.duration || '', e.cgpa || '', e.description || '']
          );
        }
        console.log(`✅ Seeded ${data.educations.length} educations into MySQL table \`educations\`.`);
      }

      // Seed Messages
      if (Array.isArray(data.messages)) {
        for (const m of data.messages) {
          await db.query(
            `INSERT INTO contact_inquiries (id, first_name, last_name, mobile_number, email, subject, description, unread)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), email=VALUES(email), description=VALUES(description);`,
            [
              m.id,
              m.firstName,
              m.lastName || '',
              m.mobileNumber || '',
              m.email,
              m.subject || '',
              m.description,
              m.unread ? 1 : 0
            ]
          );
        }
        console.log(`✅ Seeded ${data.messages.length} messages into MySQL table \`contact_inquiries\`.`);
      }
    }

    await db.end();
    console.log("🎉 ALL portfolio_data.json data successfully imported and synced to MySQL Database!");
  } catch (err) {
    console.error("❌ MySQL Error:", err);
  }
}

seed();
