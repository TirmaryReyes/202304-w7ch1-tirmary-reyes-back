import { Schema } from "mongoose";

const robotSchema = new Schema({
  name: String,
  characteristics: {
    speed: Number,
    resistance: Number,
    creationDate: String,
  },
  imageUrl: String,
});

export default robotSchema;
