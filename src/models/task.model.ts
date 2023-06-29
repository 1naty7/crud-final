import mongoose, { AnyExpression, AnyObject } from "mongoose";
const Schema = mongoose.Schema;

const Task = new Schema(
    {
        name: String,
        state: {type:String, default:'No Iniciado'},
        type: { type: String},
        startdate: {type:String},
        enddate: {type:String},
        inCharge: {type: String},
        author: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
);

export const TaskModel = mongoose.model('TaskModel', Task);