import express from "express";
import morgan from "morgan";

import { handleHelloGet, handleHelloPost } from "./sayHello";
import { defaultErrorHandler, handleEveryOtherError } from "./errorHandler";
import { adminRouter } from "./adminRouter";

const app = express();
const port = 3000;

app.use(express.json())
app.use(morgan('tiny'))

app.use((req, res, next) => {
  console.log(`Somebody is calling: ${req.url}`);
  next()
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/hello', handleHelloGet)
app.post('/hello', handleHelloPost)

app.use("/admin", adminRouter);

app.use(defaultErrorHandler);
app.use(handleEveryOtherError);

app.listen(port, () => {
  console.log(`node-js-workshop app listening at http://localhost:${port}`);
});
