import pool from "../config/db.js";
import fs from "fs";

const initSQL = fs.readFileSync("src/database/init.sql", "utf-8");

async function setupDatabase() {
    try {
        await pool.query(initSQL);
        console.log("✅ Database initialized successfully!");
} catch (error) {
        console.error("❌ Error initializing database:", error);
} finally {
        pool.end();
    }
}

setupDatabase();
