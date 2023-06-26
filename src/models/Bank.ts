import mongoose, { AnyExpression, AnyObject } from "mongoose";
const Schema = mongoose.Schema;

const Bank = new Schema(
    {
        name: String,
        description:{type:String, default:''},
        transaction: [{ type: Schema.Types.ObjectId, ref: 'TransactionModel' }],
        image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
        author:  { type: Schema.Types.ObjectId, ref: 'UserModel' },
        initial:{type:Number, default:0}
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
);

export const BankModel = mongoose.model('BankModel', Bank);