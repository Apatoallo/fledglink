import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

import promise from "./Promise";
import Analytics from "./Analytics";

const middlewares = [thunk, promise, Analytics];

if (process.env["NODE_ENV"] === "development") {
  const Logger = require("./Logger.js");
  middlewares.push(Logger);
}

const middleware = applyMiddleware(...middlewares);

export default middleware;
