
import fs from 'fs'
import { utilService } from '../../services/util.service.js'
const expenses = utilService.readJsonFile('data/expense.json')

export const expenseService = {
    query,
    getById,
    add,
    update,
    remove
}

function query(filterBy) {
    return Promise.resolve(expenses)
}

function getById(expenseId) {
    const expense = expenses.find(expense => expense._id === expenseId)
    return Promise.resolve(expense)
}

function add(expense) {
    expense._id = utilService.makeId()
    expenses.unshift(expense)
    _saveToysToFile()
    return Promise.resolve(expense)
}

function update(expense) {
    const idx = expenses.findIndex(currExpense => currExpense._id === expense._id)
    expenses[idx] = { ...expenses[idx], ...expense }
    _saveToysToFile()
    return Promise.resolve(expense)
}

function remove(expenseId) {
    const idx = expenses.findIndex(expense => expense._id === expenseId)
    expenses.splice(idx, 1)
    _saveToysToFile()
    return Promise.resolve(expenseId)
}

function _saveToysToFile() {
    fs.writeFileSync('data/expense.json', JSON.stringify(expenses, null, 2));
}
