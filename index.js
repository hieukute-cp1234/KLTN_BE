import express from "express";
import cors from "cors";
import { routes } from "./routers/index.js";
import { PORT } from "./constants/index.js";
import { connectMongooDB } from "./configs/index.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

//connect mongoo db
connectMongooDB();

app.use(cors(corsOptions));
app.use(express.json());

//use route
routes(app);

//listen server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
