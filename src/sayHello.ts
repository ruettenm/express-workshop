import { RequestHandler } from "express";
import { ApiError, NotFoundError } from "./errorHandler";

export const handleHelloGet: RequestHandler = (req, res) => {
  const name = req.query.name || "World";

  const imageNumber = Math.floor(Math.random() * 3) + 1;
  res.render("index", {
    context: {
      catImage: `cat${imageNumber}.jpeg`,
      name,
    },
  });
};

export const handleHelloPost: RequestHandler = (req, res) => {
  const name = req.body.name || 'World'

  res.json({hello: name})
}
