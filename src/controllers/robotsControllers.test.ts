import { type NextFunction, type Request, type Response } from "express";
import { getRobots } from "./robotsControllers.js";
import robotsMock from "../mocks/robotsMock.js";
import Robot from "../database/models/Robots.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loadRobots function controller", () => {
  const next = jest.fn();
  const request = {};
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a response", () => {
    test("Then it should call the response method status with 200", async () => {
      const expectedStatusCode = 200;
      Robot.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(robotsMock) });

      await getRobots(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response method json with a list of robots", async () => {
      const expectedBody = { robots: robotsMock };

      await getRobots(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.json).toHaveBeenCalledWith(expectedBody);
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Error' error", () => {
    test("Then it should call next function with error 'Error'", async () => {
      const error = new Error("Error");

      Robot.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getRobots(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
