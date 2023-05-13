import { Schema, model } from "mongoose";

const robotSchema = new Schema({
  name: String,
  characteristics: {
    speed: Number,
    resistance: Number,
    creationDate: String,
  },
  imageUrl: String,
});

const Robot = model("Robot", robotSchema, "robots");

export default Robot;
