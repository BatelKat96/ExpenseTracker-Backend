import express from 'express'
import { addExpense, getExpenseById, getExpenses, removeExpense, updateExpense } from './expense.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'


export const expenseRoutes = express.Router()


expenseRoutes.get('/', getExpenses)
expenseRoutes.get('/:id', getExpenseById)
expenseRoutes.post('/', addExpense)
expenseRoutes.put('/', updateExpense)
expenseRoutes.delete('/:id', requireAuth, removeExpense)
