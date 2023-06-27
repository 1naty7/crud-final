import mongoose, { Schema, version } from "mongoose"

const event = new Schema({
    id: { type: String },
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    description: { type: String, required: true},
    active: { type: Boolean, default: true },
    classNames: [],
    category: { type: String, required: true },
    tareas: [
      {
        list: { type: String },
        editable: { type: Boolean, default: true }
      }
    ]
  }, {
    timestamps: true,
    versionKey: false
  });

export default mongoose.model("event", event)