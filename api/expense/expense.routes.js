import express from 'express'
import { addExpense, getExpenseById, getExpenses, removeExpense, updateExpense } from './expense.controller.js'


export const expenseRoutes = express.Router()


expenseRoutes.get('/', getExpenses)
expenseRoutes.get('/:id', getExpenseById)
expenseRoutes.post('/', addExpense)
expenseRoutes.put('/', updateExpense)
expenseRoutes.delete('/:id', removeExpense)
// expenseRoutes.delete('/:id', requireAdmin, removeExpenses)
