import { DEFAULT_SOURCE } from "../constants/index.js";
import authRoute from "./auth.js";
import processRoute from "./process.js";
import supportRoute from "./support.js";
import roleRoute from "./role.js";
import userRoute from './user.js';

export const routes = (app) => {
  app.use(DEFAULT_SOURCE, authRoute);
  app.use(DEFAULT_SOURCE, processRoute);
  app.use(DEFAULT_SOURCE, supportRoute);
  app.use(DEFAULT_SOURCE, roleRoute);
  app.use(DEFAULT_SOURCE, userRoute);
};
