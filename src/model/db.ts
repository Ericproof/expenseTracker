// src/db.ts
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise({});

const db = pgp(process.env.DATABASE_URL || "");

// Function to check database connection
async function checkDbConnection() {
  try {
    await db.one("SELECT NOW()"); // Execute a test query
    console.log("Database connection verified.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    // Depending on the severity, you might want to halt the process
    // process.exit(1);
  }
}

// Immediately invoke the connection check function
checkDbConnection();

export default db;
