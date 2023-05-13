import { type Types } from "mongoose";

export interface RobotStructure {
  name: string;
  imageUrl: string;
  characteristics: {
    speed: number;
    resistance: number;
    creationDate: string;
  };
}

export interface RobotApiStructure extends RobotStructure {
  id: string;
}

export interface RobotsDataStructure {
  robots: RobotStructure[];
}

export interface RobotMockStructure extends RobotStructure {
  _id: Types.ObjectId;
}
