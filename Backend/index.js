import express from "express";
import "./config.js";
import cors from "cors";
import { connectdb } from "./config/db.js";
import { authroute } from "./routes/authrouter.js";
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authroute);

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running ");
  });
});
