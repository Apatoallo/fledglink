import { createLogger } from "redux-logger";

const blacklist = [];

const Logger = createLogger({
  predicate: (getState, action) => !blacklist.includes(action.type)
});

module.exports = Logger;
