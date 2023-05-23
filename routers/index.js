import { DEFAULT_SOURCE } from "../constants/index.js";
import authRoute from "./auth.js";
import processRoute from "./process.js";

export const routes = (app) => {
  app.use(DEFAULT_SOURCE, authRoute);
  app.use(DEFAULT_SOURCE, processRoute);
};
