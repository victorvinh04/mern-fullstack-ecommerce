import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

import morgan from "morgan";
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

// db connecting

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.error("DB CONNECTION ERROR =>", err));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
