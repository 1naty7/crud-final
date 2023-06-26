import express from "express"
import { TransactionModel } from "../models/Transaction"
import { handleError } from "../utils/handleError"
import { BankModel } from "../models/Bank";

export const createTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const body: any = req.body
        const bankId = body.bank
        const transaction = await TransactionModel.create(body)
        const bank:any = await BankModel.findById(bankId)
        console.log(bank)
        bank.transaction.push(transaction._id)
        delete bank._id
        console.log(bank)
        const data = await BankModel.findByIdAndUpdate(
            bankId, bank
        )
        res.send(data)
    } catch (e){
        console.log(e)
        handleError(res, "CREATE QUIZ WRONG", 400)
    }
}

export const deleteTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const transaction = await TransactionModel.deleteOne({ _id: id })
        res.send(transaction)
    } catch {
        handleError(res, "DELETE QUIZ WRONG", 400)
    }
}

export const updateTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.body._id
        const body = req.body
        const transaction = await TransactionModel.updateOne({ _id: id }, body)
        res.send(transaction)
    } catch {
        handleError(res, "DELETE QUIZ WRONG", 400)
    }
}




