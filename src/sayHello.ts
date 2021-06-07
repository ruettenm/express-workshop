import { RequestHandler } from "express";

export const handleHelloGet: RequestHandler = (req, res) => {
  const name = req.query.name || 'World'

  res.json({hello: name})
}

export const handleHelloPost: RequestHandler = (req, res) => {
  const name = req.body.name || 'World'

  res.json({hello: name})
}
