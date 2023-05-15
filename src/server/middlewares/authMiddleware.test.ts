import "../../loadEnvironment.js";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  describe("When it receives an authorization header with a valid token", () => {
    test("Then it should call the received next function", () => {
      const token = "hawejl2j3";
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      const res = {};
      const next = jest.fn();

      jwt.verify = jest.fn();

      auth(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
