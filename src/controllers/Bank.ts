import express from "express"
import { BankModel } from "../models/Bank"
import { handleError } from "../utils/handleError"
import { body } from "express-validator"
var jwt = require('jwt-simple');
import { decode } from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
const SECRET_KEY = process.env.SECRET_KEY

export const getBanks = async (req: express.Request, res: express.Response) => {
    try {
        let tokenJWT
        if (req.headers.authorization){
            tokenJWT = req.headers.authorization.split(" ").pop()
        }
        var decoded = jwt.decode(tokenJWT, SECRET_KEY);
        console.log(decoded)
        let bankes:any = []
        if (decoded.user._id){
            bankes = await BankModel.find({author:decoded.user._id}).populate("image").populate("transaction")
        }
        for (let bank of bankes){
            let total = bank.initial
            for (let transaction of bank.transaction){
                if (transaction.type == 'income'){
                    total += transaction.value
                }
                if (transaction.type == 'expense'){
                    total -= transaction.value
                }
            }
            bank.initial = total
            console.log(bank)
        }
        res.send(bankes)
    } catch (e) {
        console.log(e)
        handleError(res, "GET QUIZES WRONG", 400)
    }
}

export const getBank = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const bank = await BankModel.findById(id).populate("transaction").select("-_id")
        res.send(bank)
    } catch (e) {
        console.log(e)
        handleError(res, "GET QUIZES WRONG", 400)
    }
}

export const createBank = async (req: express.Request, res: express.Response) => {
    try {
        const body:any = req.body
        let tokenJWT
        if (req.headers.authorization){
            tokenJWT = req.headers.authorization.split(" ").pop()
        }
        var decoded = jwt.decode(tokenJWT, SECRET_KEY);
        console.log(decoded)
        if (decoded.user._id){
            body.author = decoded.user._id
            const bank = await BankModel.create(body)
            res.send(bank)
        }
    } catch {
        handleError(res, "CREATE QUIZ WRONG", 400)
    }
}

export const deleteBank = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        console.log(id)
        const bank = await BankModel.findByIdAndDelete(id)
        console.log("hola")
        res.send(bank)
    } catch {
        handleError(res, "DELETE QUIZ WRONG", 400)
    }
} 

export const updateBank = async (req: express.Request, res: express.Response) => {
    try {
        const body:any = req.body
        if(body._id){
            const data = await BankModel.findByIdAndUpdate(
                body._id, body
            )
        }
        let actuQuiz = await BankModel.findById(body._id).populate("image").populate("transaction")
        res.send(actuQuiz)
    } catch (e) {
        handleError(res, "UPDATE QUIZ WRONG", 400)
    }
}

// export const changeMoney = async (req: express.Request, res: express.Response) => {
//     try {
//         const body:any = req.body
//         let data
//         if (body.id){
//             data = await BankModel.findById(
//                 body.id
//             )
//         }
//         if (body.type == 'expense'){
//             if (data?.expense){
//                 data.expense += body.value
//             }
//         }
//         if (body.type == 'income'){
//             if (data?.income){
//                 data.income += body.value
//             }
//         }
//         const update = await BankModel.findByIdAndUpdate(
//             body.id, body
//         )
//         res.send(update)
//     } catch (e) {
//         handleError(res, "ERROR", 400)
//     }
// }



