import bcrypt from "bcryptjs";
import { type NextFunction, type Request, type Response } from "express";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const userLogin = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    { username: string; password: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "Wrong credentials");

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    jwt.verify(token, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export default userLogin;
