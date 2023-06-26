import mongoose, { AnyExpression, AnyObject } from "mongoose";
const Schema = mongoose.Schema;

const Transaction = new Schema(
    {
        type: String,
        value: Number,
        description:String,
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
);

export const TransactionModel = mongoose.model('TransactionModel', Transaction);