import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  senderemail: {
    type: String,
    required: true,
  },
  recieveremail: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
