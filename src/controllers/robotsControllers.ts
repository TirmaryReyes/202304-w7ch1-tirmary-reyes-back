import Robot from "../database/models/Robots.js";
import { type Request, type Response } from "express";

export const getRobots = async (req: Request, res: Response) => {
  const robots = await Robot.find().exec();
  res.status(200).json({ robots });
};
