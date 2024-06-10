
import fs from 'fs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { utilService } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
const expenses = utilService.readJsonFile('data/expense.json')

const DB_NAME = 'expense'

export const expenseService = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const expenses = await collection.find().toArray()
        return expenses
    } catch (err) {
        logger.error('cannot find expenses', err)
        throw err
    }
}

async function getById(expenseId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const expense = await collection.findOne({ _id: new ObjectId(expenseId) })
        return expense
    } catch (err) {
        logger.error('cannot find expense', err)
        throw err
    }
}

async function add(expense) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        await collection.insertOne(expense)
        return expense
    } catch (err) {
        logger.error('cannot insert expense', err)
        throw err
    }
}

async function update(expense) {
    try {
        const expenseToSave = {
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            notes: expense.notes
        }
        const collection = await dbService.getCollection(DB_NAME)
        await collection.updateOne(
            { _id: new ObjectId(expense._id) },
            { $set: expenseToSave })
        return expense
    } catch (err) {
        logger.error('cannot update expense', err)
        throw err
    }
}

async function remove(expenseId) {
    try {
        const collection = await dbService.getCollection(DB_NAME)
        const expense = await collection.deleteOne({ _id: new ObjectId(expenseId) })
        return expense
    } catch (err) {
        logger.error('cannot find expense', err)
        throw err
    }
}

function _saveToysToFile() {
    fs.writeFileSync('data/expense.json', JSON.stringify(expenses, null, 2));
}
