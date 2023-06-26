import express from "express"
import { TaskModel } from "../models/task.model";
import { handleError } from "../utils/handleError"
import { body } from "express-validator"
var jwt = require('jwt-simple');
import { decode } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
const SECRET_KEY = process.env.SECRET_KEY

export const getTasks = async (req: express.Request, res: express.Response) => {
    try {
        let tokenJWT
        if (req.headers.authorization){
            tokenJWT = req.headers.authorization.split(" ").pop()
        }
        var decoded = jwt.decode(tokenJWT, SECRET_KEY);
        console.log(decoded)
        if (decoded.user._id){
            // const tasks = await TaskModel.find({author:decoded.user._id}).populate("image")
            const tasks = await TaskModel.find({author:decoded.user._id})
            res.send(tasks)
        }
    } catch (e) {
        console.log(e)
        handleError(res, "TASKS NOT FOUND", 400)
    }
}

// export const getBank = async (req: express.Request, res: express.Response) => {
//     try {
//         const id = req.params.id
//         const bank = await BankModel.findById(id).populate("image").select("-_id")
//         res.send(bank)
//     } catch (e) {
//         console.log(e)
//         handleError(res, "GET QUIZES WRONG", 400)
//     }
// }

export const createTask = async (req: express.Request, res: express.Response) => {
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
            const task = await TaskModel.create(body)
            res.send(task)
        }
    } catch {
        handleError(res, "FAILED TO CREATE THE TASK", 400)
    }
}

export const deleteTask = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        console.log(id)
        const task = await TaskModel.deleteOne({_id:id})
        console.log("hola")
        res.send(task)
    } catch {
        handleError(res, "FAILED TO DELETE TASK", 400)
    }
} 

export const updateTask = async (req: express.Request, res: express.Response) => {
    try {
        const body:any = req.body
        const id = req.params.id
        if(id){
            const data = await TaskModel.findByIdAndUpdate(
                id, body
            )
        }
        // let updatedTask = await TaskModel.findById(body.id).populate("image")
        let updatedTask = await TaskModel.findById(id)
        res.send(updatedTask)
    } catch (e) {
        handleError(res, "FAILED TO UPDATE TASK", 400)
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



