import { NextFunction, Request, Response } from 'express';

import { handleHelloGet } from "./sayHello";

describe('say hello', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn()
    };
  });

  describe('get', () => {
    beforeEach(() => {
      mockRequest.query = {}
    })

    test('should handle the name query param', () => {
      const expectedResponse = {
        "hello": "Matthias"
      };

      mockRequest.query!.name = 'Matthias'
      handleHelloGet(mockRequest as Request, mockResponse as Response, nextFunction)

      expect(mockResponse.json).toBeCalledWith(expectedResponse);
    })

    test('should use a default value when no name is given', () => {
      const expectedResponse = {
        "hello": "World"
      };

      handleHelloGet(mockRequest as Request, mockResponse as Response, nextFunction)

      expect(mockResponse.json).toBeCalledWith(expectedResponse);
    })
  })

  describe('post', () => {
    // BONUS: Implement the unit tests for the POST endpoint
  })
});
