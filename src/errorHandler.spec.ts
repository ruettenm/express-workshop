import { NextFunction, Request, Response } from "express";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { mocked } from "ts-jest/utils";

import { handleEveryOtherError } from "./errorHandler";
import { isProduction } from "./environment";
jest.mock("./environment");

const mockedIsProduction = mocked(isProduction, true);

describe("error handler", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = getMockReq();
    const { res, next, clearMockRes } = getMockRes();
    mockResponse = res;
    nextFunction = next;

    clearMockRes();
  });

  describe("default error handler", () => {});

  describe("handle every other error", () => {
    beforeEach(() => {
      mockedIsProduction.mockReset();
    });

    test("it should return details if node is NOT in prod mode", () => {
      mockedIsProduction.mockReturnValue(false);
      handleEveryOtherError(
        new Error("Oops"),
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith("Oops");
    });
  });
});
