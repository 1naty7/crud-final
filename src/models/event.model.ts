import mongoose, { Schema } from "mongoose"


const event = new Schema({
  id: { type: String },
  title: { type: String, required: true },
  type: { type : String},
  active: { type: Boolean, default: true },
  createdAt: { type : Date},
  updatedAt: { type : Date},
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isEditMode: { type : Boolean},
  author:  { type: Schema.Types.ObjectId, ref: 'UserModel' },
  tareas: [
    {
      list: { type: String },
      editable: { type: Boolean, default: true }
    }
  ],
  classNames: [String],
}, {
  timestamps: true,
  versionKey: false
});
export default mongoose.model("event", event)