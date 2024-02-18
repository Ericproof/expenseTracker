import { Request, Response, Router } from "express";
import { formattedDate, getStartDate } from "../helper/formatDate";
import db from "../model/db"; // Import the query function
import type { Expense } from "../type/types";
import { ExpenseController } from "../controller/expenseController";

export const expensesRouter = Router();
const expenseController = new ExpenseController();
//getall
expensesRouter.get("/all", expenseController.getAllExpense);
//Get expenses record by userID
expensesRouter.get("/by-user/:userId");

//weekly expense by type
expensesRouter.get(
  "/weekly/:userId/:expenseType",
  expenseController.getExpenseByType
);
//get weekly-average expesne by type
expensesRouter.get(
  "/weekly-average/:userId/:expense_type",
  expenseController.getAVGbyType
);
//get expense today
expensesRouter.get("/get/:userId/:expense_type", expenseController.getExpense);
//add a expense record
expensesRouter.post("/add", expenseController.createExpense);
//update a expense
expensesRouter.put("/update/:userId", expenseController.updateExpense);
