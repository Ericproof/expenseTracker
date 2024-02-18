import express from "express";
import dotenv from "dotenv";
import { expensesRouter } from "./router/expensesRoute";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/v1/expenses", expensesRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
