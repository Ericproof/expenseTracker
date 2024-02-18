import { formattedDate, getStartDate } from "../helper/formatDate";
import db from "../model/db"; // Import the query function

import type { Expense } from "../type/types";
import { Request, Response, Router } from "express";

export class ExpenseController {
  //get all expense
  public async getAllExpense(req: Request, res: Response) {
    // console.log(req);
    try {
      const result = await db.any("SELECT * FROM expenses_data");
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching expenses" });
    }
  }
  //weekly expense by type
  public async getExpenseByType(req: Request, res: Response) {
    const { expense_type } = req.body;
    try {
      const result = await db.query(
        "SELECT * FROM expenses_data WHERE expense_type = $1 ORDER BY date DESC",
        [expense_type]
      );
      if (result.length > 0) {
        res.json(result);
      } else {
        res
          .status(404)
          .json({ message: "No expeneses found for the given user ID" });
      }
      console.log(result);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      res.status(500).json({ message: "Failed to fetch expenses" });
    }
  }

  //get weekly-average expesne by type
  public async getAVGbyType(req: Request, res: Response) {
    const userId: string = req.params.userId;
    const expense_type: string = req.params.expense_type;
    const currentDate = new Date();
    const curFormattedDate = formattedDate(currentDate);
    const startDate = getStartDate(currentDate);

    try {
      const result = await db.query(
        `SELECT AVG(amount) as weekly_amount
            FROM expenses_data
            WHERE user_id = $1
            AND expense_type = $2
            AND date >= $3
            AND date < $4;`,
        [userId, expense_type, startDate, curFormattedDate]
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching weekly summary:", error);
      res.status(500).json({ message: "Failed to fetch weekly summary" });
    }
  }
  //check expense today
  public async getExpense(req: Request, res: Response) {
    // const userId: string = req.params.userId;
    // const expense_type: string = req.params.expense_type;
    const { user_id, expense_type, amount, eid } = req.body;
    const currentDate = new Date();
    const curFormattedDate = formattedDate(currentDate);
    console.log(user_id, curFormattedDate, expense_type);
    const existingExpense = await db.oneOrNone(
      `SELECT * FROM expenses_data WHERE user_id=$1 AND date=$2 AND expense_type=$3`,
      [user_id, curFormattedDate, expense_type]
    );
    res.status(200).json(existingExpense);
  }

  //edit and update expenses
  public async updateExpense(req: Request, res: Response) {
    // const userId: string = req.params.user_id;
    const { user_id, expense_type, amount, eid } = req.body;
    const currentDate = new Date();
    const curFormattedDate = formattedDate(currentDate);
    console.log(req.body);
    try {
      //Check if an expense of this type for the user already exists for today

      const result = await db.oneOrNone(
        `UPDATE expenses_data SET
            user_id=$1,
            date=$2,
            expense_type=$3,
            amount=$4
        WHERE eid=$5 RETURNING *`,
        [user_id, curFormattedDate, expense_type, amount, eid]
      );
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: `Error editing expense`, error });
    }
  }
  //add expense
  public async createExpense(req: Request, res: Response) {
    const userId: string = req.params.userId;
    const { expense_type, amount }: Expense = req.body;
    const currentDate = new Date();
    const curFormattedDate = formattedDate(currentDate);
    try {
      //Check if an expense of this type for the user already exists for today

      const result = await db.one(
        `INSERT INTO expenses_data (user_id, date, expense_type, amount) VALUE ($1, $2, $3, $4) RETURNING *`
      );
      res.status(200).json(result);
    } catch (eorr) {
      res.status(500).json({ message: `Error updating expense`, eorr });
    }
  }
}
