import express from "express";
import pinoHttp from "pino-http";

import { handleHelloGet, handleHelloPost } from "./sayHello";
import { defaultErrorHandler, handleEveryOtherError } from "./errorHandler";
import { adminRouter } from "./adminRouter";
import { logger } from "./logger";
import path from "path";

const app = express();
const port = 3000;

app.use(express.json());
// Structured access log: one record per request with method, status and duration.
app.use(pinoHttp({ logger }));

app.use("/static", express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  req.log.debug({ "url.path": req.path }, "request.received");
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
  logger.info(
    { "server.port": port, "url.full": `http://localhost:${port}` },
    "server.started"
  );
});
