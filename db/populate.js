const pool = require("./pool");

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        user_name TEXT NOT NULL,
        added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table created successfully.");
    pool.end();
  } catch (err) {
    console.error("Error creating table:", err);
    pool.end();
  }
};

createTable();
