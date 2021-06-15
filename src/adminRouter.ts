import express from "express";
import { ForbiddenError } from "./errorHandler";

export const adminRouter = express.Router();

adminRouter.param("key", (req, ress, next, value) => {
  if (value === "1337") {
    next();
  }
  throw new ForbiddenError("The given Key is invalid");
});

adminRouter.get("/:key", (req, res) => {
  res.send("Welcome to the secured admin area.");
});

adminRouter.get("/:key/hello", (req, res) => {
  const name = req.query.name || "World";

  res.json({ hello: name });
});
