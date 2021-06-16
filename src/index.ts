import express from "express";
import morgan from "morgan";

import { handleHelloGet, handleHelloPost } from "./sayHello";
import { defaultErrorHandler, handleEveryOtherError } from "./errorHandler";
import { adminRouter } from "./adminRouter";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/static", express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(`Somebody is calling: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  const imageNumber = Math.floor(Math.random() * 3) + 1;
  res.render("index", {
    context: {
      catImage: `cat${imageNumber}.jpeg`,
    },
  });
});

app.get("/hello", handleHelloGet);
app.post("/hello", handleHelloPost);

app.use("/admin", adminRouter);

app.use(defaultErrorHandler);
app.use(handleEveryOtherError);

app.listen(port, () => {
  console.log(`node-js-workshop app listening at http://localhost:${port}`);
});
