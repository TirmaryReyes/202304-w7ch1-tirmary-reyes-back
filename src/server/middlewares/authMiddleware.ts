import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import CustomError from "../../CustomError/CustomError.js";

const debug = createDebug("robots-api:root:server:middlewares:authMiddleware");

const secretKey = process.env.JWT_SECRET!;

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!secretKey) {
    debug("Missing key environment variable");

    process.exit(1);
  }

  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing token");
      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    jwt.verify(token, secretKey);

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(401, "Invalid token")
        : error;

    next(customError);
  }
};

export default auth;
