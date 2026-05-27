import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";

const app = express();
const PORT = 5000;
dotenv.config();
connectDB();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HI");
});
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`✅ Server running on port http://localhost:${PORT}`);
});
