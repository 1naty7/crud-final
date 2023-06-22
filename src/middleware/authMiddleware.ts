import jwt from "jsonwebtoken"
import express from "express"
import { handleError } from "../utils/handleError";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
const SECRET_KEY = process.env.SECRET_KEY

export const authRequired = async (req: express.Request, res: express.Response, next: any) => {
    console.log("hola")
    if (req.headers.authorization) {
        console.log(req.headers.authorization)
        const tokenJWT = req.headers.authorization.split(" ").pop()
        if (tokenJWT) {
            console.log(tokenJWT)
            try {
                if (SECRET_KEY) {
                    console.log(SECRET_KEY)
                    var decoded = jwt.verify(tokenJWT, SECRET_KEY);
                    console.log(decoded)
                    next()
                }
            } catch (e) {
                handleError(res, "ERROR TOKEN NOT VALID", 400)
            }
        }
    } else {
        handleError(res, "NEED LOGIN", 400)
    }
} 