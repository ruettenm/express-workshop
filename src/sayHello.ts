import { RequestHandler } from "express";
import { ApiError, NotFoundError } from "./errorHandler";

export const handleHelloGet: RequestHandler = (req, res) => {
  const name = req.query.name || 'World'

  if (name === 'Marco') {
    throw new NotFoundError('Marco is not available')
  }
  if (name === 'Vincent') {
    throw new Error('💣')
  }
  if (name === 'API') {
    throw new ApiError(401, 'unauthorized', 'You are not authorized!')
  }

  res.json({hello: name})
}

export const handleHelloPost: RequestHandler = (req, res) => {
  const name = req.body.name || 'World'

  res.json({hello: name})
}
