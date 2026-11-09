import { NextFunction, Request, Response } from 'express';

import { handleHelloGet } from "./sayHello";

describe('say hello', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      render: jest.fn()
    };
  });

  describe('get', () => {
    beforeEach(() => {
      mockRequest.query = {}
    })

    test('should render the index template with the name query param', () => {
      mockRequest.query!.name = 'Matthias'
      handleHelloGet(mockRequest as Request, mockResponse as Response, nextFunction)

      expect(mockResponse.render).toHaveBeenCalledWith('index', {
        context: {
          catImage: expect.stringMatching(/^cat[1-3]\.jpeg$/),
          name: 'Matthias'
        }
      });
      expect(mockResponse.json).not.toHaveBeenCalled();
    })

    test('should render the index template with a default name when none is given', () => {
      handleHelloGet(mockRequest as Request, mockResponse as Response, nextFunction)

      expect(mockResponse.render).toHaveBeenCalledWith('index', {
        context: {
          catImage: expect.stringMatching(/^cat[1-3]\.jpeg$/),
          name: 'World'
        }
      });
      expect(mockResponse.json).not.toHaveBeenCalled();
    })
  })

  describe('post', () => {
    // BONUS: Implement the unit tests for the POST endpoint
  })
});
