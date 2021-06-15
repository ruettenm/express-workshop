import express, { Application } from "express";
import request from "supertest";

import { adminRouter } from "./adminRouter";
import { defaultErrorHandler } from "./errorHandler";

describe("admin router", () => {
  let app: Application;

  beforeAll(() => {
    app = express();

    app.use("/admin", adminRouter);
    app.use(defaultErrorHandler);
  });

  it("should fail with wrong key", async () => {
    await request(app).get("/admin/wrong/hello").expect(403);
  });

  it("should accept a valid key", async () => {
    await request(app).get("/admin/1337/").expect(200);
  });

  it("should accept a valid key and say hello", async () => {
    await request(app)
      .get("/admin/1337/hello")
      .expect("Content-Type", /json/)
      .expect(200, { hello: "World" });
  });

  it("should accept a valid key and say hello to query param", async () => {
    await request(app)
      .get("/admin/1337/hello?name=Marco")
      .expect("Content-Type", /json/)
      .expect(200, { hello: "Marco" });
  });
});
