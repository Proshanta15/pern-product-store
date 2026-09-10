import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// apply arcjet middleware to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.end(JSON.stringify({ error: "Too Many Requests" }));
      } else if (decision.reason.isBot()) {
        res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.end(JSON.stringify({ error: "Forbidden" }));
      }
      return
    }

    // Check for isSpoofedBot 
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
        res.status(403).json({error: "Spoofed bot detected"});
        return
    }
    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(error)
  }
});

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `; // Test the database connection
    console.log("Database initialized successfully.");
  } catch (error) {
    console.log("Error initializing database:", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
