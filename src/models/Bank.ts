import mongoose, { AnyExpression, AnyObject } from "mongoose";
const Schema = mongoose.Schema;

const Bank = new Schema(
    {
        name: String,
        expense: {type:Number, default:0},
        image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
        income: {type:Number, default:0},
        author:  { type: Schema.Types.ObjectId, ref: 'UserModel' },
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
);

export const BankModel = mongoose.model('BankModel', Bank);